import requests
from bs4 import BeautifulSoup
import json
import re

def fetch_rankings():
    url = "https://www.globalfirepower.com/countries-listing.php"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        countries = []
        
        # The structure seems to be divs with specific classes or IDs
        # Based on typical GFP structure, we look for containers
        # We'll look for the main listing container
        
        # Find all country containers. They usually have a class like 'contentBox' or similar in the listing
        # Let's try to find by the text "PwrIndx:" which is distinctive
        
        # Alternative: The chunks showed text like "[1 United States USA PwrIndx: 0.0744]"
        # This suggests a structure like: Rank Name ID PwrIndx
        
        # Let's iterate through all div elements that might contain this info
        # We can look for the 'div' with class 'clearfix' inside the main list
        
        # Let's try a more robust approach: Find all elements with "PwrIndx:" text
        pwr_indx_elements = soup.find_all(string=re.compile("PwrIndx:"))
        
        for el in pwr_indx_elements:
            # The structure is likely:
            # <div ...>
            #   <span ...>Rank</span>
            #   <span ...>Name</span>
            #   <span ...>ID</span>
            #   <span ...>PwrIndx: 0.1234</span>
            # </div>
            
            # We need to traverse up to the container
            container = el.find_parent('div')
            if not container:
                continue
                
            # Try to extract data from the container text
            text = container.get_text(separator=" ", strip=True)
            
            # Regex to extract: Rank Name ID PwrIndx: Value
            # Example: "1 United States USA PwrIndx: 0.0744"
            # Note: The name might contain spaces (e.g., "South Korea")
            
            # Pattern: Start, Rank (digits), Name (words), ID (3 caps), "PwrIndx:", Value (float)
            # But sometimes the layout is different.
            
            # Let's try to find specific elements if possible.
            # Usually GFP uses specific classes.
            # Let's assume the text format from the chunks is reliable enough for regex on the container text.
            
            # Clean up the text
            clean_text = re.sub(r'\s+', ' ', text).strip()
            
            # Try to find the pattern
            # We look for "PwrIndx: \d+\.\d+"
            pwr_match = re.search(r'PwrIndx:\s*(\d+\.\d+)', clean_text)
            if not pwr_match:
                continue
                
            power_index = float(pwr_match.group(1))
            
            # The ID is usually 3 uppercase letters before "PwrIndx:"
            # e.g. "... USA PwrIndx: ..."
            id_match = re.search(r'\b([A-Z]{3})\s+PwrIndx:', clean_text)
            if not id_match:
                continue
            country_id = id_match.group(1)
            
            # The Rank is usually at the beginning
            rank_match = re.search(r'^(\d+)', clean_text)
            if not rank_match:
                # Sometimes rank is not at the very start if there's whitespace
                continue
            rank = int(rank_match.group(1))
            
            # The Name is between Rank and ID
            # "1 United States USA"
            name_match = re.search(r'^\d+\s+(.+?)\s+[A-Z]{3}\s+PwrIndx:', clean_text)
            if not name_match:
                continue
            name = name_match.group(1).strip()
            
            # Flag URL: We can try to construct it or find it
            # GFP uses flags like /imgs/flags/us.gif
            # We can use flagcdn based on country code if we map it, but for now let's use a placeholder or try to find the img tag
            flag_url = ""
            img = container.find('img')
            if img and 'src' in img.attrs:
                flag_src = img['src']
                if 'flags' in flag_src:
                    flag_url = f"https://www.globalfirepower.com/{flag_src}"
            
            if not flag_url:
                # Fallback to flagcdn if we can map ID, but let's just use a generic one for now
                flag_url = f"https://flagcdn.com/w320/{country_id.lower()[:2]}.png" # Approximate

            countries.append({
                "rank": rank,
                "name": name,
                "id": country_id,
                "powerIndex": power_index,
                "flagUrl": flag_url
            })
            
        # Sort by rank
        countries.sort(key=lambda x: x['rank'])
        
        # Deduplicate by rank (in case we found multiple elements per country)
        unique_countries = []
        seen_ranks = set()
        for c in countries:
            if c['rank'] not in seen_ranks:
                unique_countries.append(c)
                seen_ranks.add(c['rank'])
        
        return unique_countries

    except Exception as e:
        print(f"Error: {e}")
        return []

def generate_ts_file(countries):
    ts_content = """export interface RankingData {
    rank: number;
    name: string;
    id: string;
    powerIndex: number;
    flagUrl: string;
}

export const allCountriesRanking: RankingData[] = [
"""
    
    for c in countries:
        ts_content += f"""    {{
        rank: {c['rank']},
        name: "{c['name']}",
        id: "{c['id']}",
        powerIndex: {c['powerIndex']},
        flagUrl: "{c['flagUrl']}"
    }},
"""
    
    ts_content += "];\n"
    
    with open("src/lib/rankingData.ts", "w", encoding="utf-8") as f:
        f.write(ts_content)
    
    print(f"Successfully generated src/lib/rankingData.ts with {len(countries)} countries.")

if __name__ == "__main__":
    data = fetch_rankings()
    if data:
        generate_ts_file(data)
    else:
        print("Failed to fetch data.")
