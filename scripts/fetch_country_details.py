import requests
import json
import re

# Load the existing ranking data to get names
# We'll just read the file directly or use a hardcoded list if easier, 
# but reading the file ensures we match the IDs.

def get_countries_from_ts():
    countries = []
    try:
        with open("src/lib/rankingData.ts", "r", encoding="utf-8") as f:
            content = f.read()
            # Extract objects
            # Regex to find: name: "...", id: "..."
            # This is a bit hacky but sufficient for this task
            matches = re.finditer(r'name:\s*"([^"]+)",\s*id:\s*"([^"]+)"', content)
            for m in matches:
                countries.append({"name": m.group(1), "id": m.group(2)})
    except Exception as e:
        print(f"Error reading TS file: {e}")
    return countries

def fetch_wikipedia_data(country_name):
    # Wikipedia API endpoint
    url = "https://en.wikipedia.org/w/api.php"
    
    headers = {
        "User-Agent": "MilitaryRankingsBot/1.0 (contact@example.com)"
    }
    
    # 1. Get summary/description and wikitext for infobox parsing
    params = {
        "action": "query",
        "format": "json",
        "prop": "extracts|pageimages|revisions",
        "exintro": True,
        "explaintext": True,
        "titles": country_name,
        "pithumbsize": 500,
        "rvprop": "content",
        "rvsection": 0,
    }
    
    try:
        response = requests.get(url, params=params, headers=headers)
        data = response.json()
        pages = data["query"]["pages"]
        page_id = list(pages.keys())[0]
        
        if page_id == "-1":
            # Try adding "The" or other variations if not found?
            # Or try searching
            return None
            
        page = pages[page_id]
        description = page.get("extract", "")
        thumbnail = page.get("thumbnail", {}).get("source", "")
        
        # Get wikitext for infobox parsing
        wikitext = ""
        revisions = page.get("revisions", [])
        if revisions:
            wikitext = revisions[0].get("*", "")
        
        # Helper to extract field from infobox
        def extract_field(pattern):
            match = re.search(pattern, wikitext, re.IGNORECASE)
            if match:
                value = match.group(1).strip()
                # Clean up wiki markup
                value = re.sub(r'\[\[([^\]|]+\|)?([^\]]+)\]\]', r'\2', value)  # Remove wiki links
                value = re.sub(r'{{[^}]+}}', '', value)  # Remove templates
                value = re.sub(r'<[^>]+>', '', value)  # Remove HTML tags
                value = value.strip()
                return value if value else "Unknown"
            return "Unknown"
        
        capital = extract_field(r'\|\s*capital\s*=\s*([^\n]+)')
        population = extract_field(r'\|\s*population_total\s*=\s*([^\n]+)')
        if population == "Unknown":
            population = extract_field(r'\|\s*population_estimate\s*=\s*([^\n]+)')
        gdp = extract_field(r'\|\s*GDP_nominal\s*=\s*([^\n]+)')
        if gdp == "Unknown":
            gdp = extract_field(r'\|\s*gdp\s*=\s*([^\n]+)')
        
        return {
            "description": description,
            "imageUrl": thumbnail,
            "capital": capital,
            "population": population,
            "gdp": gdp,
        }
        
    except Exception as e:
        print(f"Error fetching {country_name}: {e}")
        return None

def generate_details_file(countries_data):
    ts_content = """export interface CountryDetail {
    id: string;
    description: string;
    imageUrl: string;
    capital: string;
    population: string;
    gdp: string;
}

export const countryDetails: Record<string, CountryDetail> = {
"""
    
    for country in countries_data:
        # Fetch data
        print(f"Fetching data for {country['name']}...")
        wiki_data = fetch_wikipedia_data(country['name'])
        
        if not wiki_data:
            # Try alternative names
            alt_name = country['name']
            if "United States" in alt_name: alt_name = "United States"
            elif "United Kingdom" in alt_name: alt_name = "United Kingdom"
            elif "Turkiye" in alt_name: alt_name = "Turkey"
            elif "Czechia" in alt_name: alt_name = "Czech Republic"
            
            if alt_name != country['name']:
                wiki_data = fetch_wikipedia_data(alt_name)
        
        description = wiki_data['description'] if wiki_data else "No description available."
        image_url = wiki_data['imageUrl'] if wiki_data else ""
        capital = wiki_data.get('capital', 'Unknown') if wiki_data else "Unknown"
        population = wiki_data.get('population', 'Unknown') if wiki_data else "Unknown"
        gdp = wiki_data.get('gdp', 'Unknown') if wiki_data else "Unknown"
        
        # Escape quotes in all fields
        description = description.replace('"', '\\"').replace('\n', ' ')
        capital = capital.replace('"', '\\"').replace('\n', ' ')
        population = population.replace('"', '\\"').replace('\n', ' ')
        gdp = gdp.replace('"', '\\"').replace('\n', ' ')
        
        ts_content += f"""    "{country['id']}": {{
        id: "{country['id']}",
        description: "{description}",
        imageUrl: "{image_url}",
        capital: "{capital}",
        population: "{population}",
        gdp: "{gdp}"
    }},
"""
    
    ts_content += "};\n"
    
    with open("src/lib/countryDetails.ts", "w", encoding="utf-8") as f:
        f.write(ts_content)
    
    print("Generated src/lib/countryDetails.ts")

if __name__ == "__main__":
    countries = get_countries_from_ts()
    if countries:
        generate_details_file(countries)
    else:
        print("No countries found.")
