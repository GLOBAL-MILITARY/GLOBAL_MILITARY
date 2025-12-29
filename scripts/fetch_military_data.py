import requests
import re
import json
import time
import os

def fetch_military_data(country_name):
    """
    Fetches military data for a given country from Wikipedia.
    Returns a dictionary with the stats.
    """
    print(f"Fetching military data for {country_name}...")
    
    # 1. Try to find the "Armed forces of [Country]" page or similar
    url = "https://en.wikipedia.org/w/api.php"
    headers = {
        "User-Agent": "MilitaryRankingsBot/1.0 (contact@example.com)"
    }
    
    search_params = {
        "action": "opensearch",
        "search": f"Armed forces of {country_name}",
        "limit": 1,
        "namespace": 0,
        "format": "json"
    }
    
    try:
        # Search for the military page
        search_resp = requests.get(url, params=search_params, headers=headers).json()
        if search_resp[1]:
            page_title = search_resp[1][0]
        else:
            # Fallback to main country page if military page not found
            page_title = country_name

        # 2. Get the wikitext content
        content_params = {
            "action": "query",
            "prop": "revisions",
            "titles": page_title,
            "rvprop": "content",
            "format": "json",
            "redirects": 1
        }
        
        resp = requests.get(url, params=content_params, headers=headers).json()
        pages = resp["query"]["pages"]
        page_id = list(pages.keys())[0]
        
        if page_id == "-1":
            print(f"  No page found for {page_title}")
            return None
            
        wikitext = pages[page_id]["revisions"][0]["*"]
        
        # 3. Extract data using Regex
        data = {
            "army": {
                "activePersonnel": 0,
                "reservePersonnel": 0,
                "tanks": 0,
                "afv": 0,
                "artillery": 0,
                "rocketProjectors": 0
            },
            "navy": {
                "totalShips": 0,
                "aircraftCarriers": 0,
                "submarines": 0,
                "destroyers": 0,
                "frigates": 0,
                "corvettes": 0,
                "patrolVessels": 0
            },
            "airforce": {
                "totalAircraft": 0,
                "fighters": 0,
                "helicopters": 0,
                "bombers": 0
            },
            "nuclear": {
                "hasNuclear": False,
                "stockpile": 0
            }
        }

        # Helper to parse numbers from string (e.g., "1,234", "approx 500", "1.2 million")
        def parse_number(val_str):
            if not val_str: return 0
            # Remove references like [1], [a]
            val_str = re.sub(r'\[[^\]]+\]', '', val_str)
            val_str = re.sub(r'<[^>]+>', '', val_str) # Remove HTML
            
            # Check for "million"
            if 'million' in val_str.lower():
                match = re.search(r'([\d\.]+)\s*million', val_str, re.IGNORECASE)
                if match:
                    return int(float(match.group(1)) * 1000000)
            
            # Extract first major number
            # Look for digits with optional commas
            match = re.search(r'([\d,]+)', val_str)
            if match:
                num_str = match.group(1).replace(',', '')
                if num_str.isdigit():
                    return int(num_str)
            return 0

        # --- Personnel ---
        # Look for 'active' or 'active_personnel' in infobox
        active_match = re.search(r'\|\s*active\s*=\s*([^\n\|]+)', wikitext, re.IGNORECASE)
        if active_match:
            data["army"]["activePersonnel"] = parse_number(active_match.group(1))
            
        reserve_match = re.search(r'\|\s*reserve\s*=\s*([^\n\|]+)', wikitext, re.IGNORECASE)
        if reserve_match:
            data["army"]["reservePersonnel"] = parse_number(reserve_match.group(1))

        # --- Equipment (Harder, often not in main infobox) ---
        # We'll look for keywords in the text if not in infobox, or specific patterns
        # This is a heuristic approach.
        
        # Tanks (often listed as "Main battle tanks" or "Tanks")
        # Try to find a number near the word "tanks"
        tanks_match = re.search(r'(\d{1,3}(?:,\d{3})*)\s+(?:main battle )?tanks', wikitext, re.IGNORECASE)
        if tanks_match:
            data["army"]["tanks"] = parse_number(tanks_match.group(1))
            
        # Aircraft
        aircraft_match = re.search(r'(\d{1,3}(?:,\d{3})*)\s+aircraft', wikitext, re.IGNORECASE)
        if aircraft_match:
            data["airforce"]["totalAircraft"] = parse_number(aircraft_match.group(1))
            
        # Ships
        ships_match = re.search(r'(\d{1,3}(?:,\d{3})*)\s+(?:ships|vessels|commissioned ships)', wikitext, re.IGNORECASE)
        if ships_match:
            data["navy"]["totalShips"] = parse_number(ships_match.group(1))

        # --- Nuclear ---
        # Check for known nuclear states
        nuclear_states = ["United States", "Russia", "China", "France", "United Kingdom", "Pakistan", "India", "Israel", "North Korea"]
        if country_name in nuclear_states:
            data["nuclear"]["hasNuclear"] = True
            # Hardcode approximate stockpiles as they are rarely in standard infoboxes
            stockpiles = {
                "Russia": 5580, "United States": 5044, "China": 500, 
                "France": 290, "United Kingdom": 225, "Pakistan": 170, 
                "India": 172, "Israel": 90, "North Korea": 50
            }
            data["nuclear"]["stockpile"] = stockpiles.get(country_name, 0)

        return data

    except Exception as e:
        print(f"  Error fetching {country_name}: {e}")
        return None

def main():
    # Read rankingData to get list of countries
    try:
        with open("src/lib/rankingData.ts", "r", encoding="utf-8") as f:
            content = f.read()
            
        # Extract country names and IDs
        # Pattern: name: "Country Name", id: "ID"
        matches = re.findall(r'name:\s*"([^"]+)",\s*id:\s*"([^"]+)"', content)
        
        all_data = {}
        
        print(f"Found {len(matches)} countries. Starting data collection...")
        
        for name, country_id in matches:
            # Skip if we already have data (optional, for resuming)
            
            stats = fetch_military_data(name)
            if stats:
                all_data[country_id] = stats
            
            # Be nice to Wikipedia API
            time.sleep(0.5)
            
        # Save to a JSON file
        with open("scripts/military_data_cache.json", "w", encoding="utf-8") as f:
            json.dump(all_data, f, indent=2)
            
        print(f"Data collection complete. Saved to scripts/military_data_cache.json")
        
    except Exception as e:
        print(f"Critical error: {e}")

if __name__ == "__main__":
    main()
