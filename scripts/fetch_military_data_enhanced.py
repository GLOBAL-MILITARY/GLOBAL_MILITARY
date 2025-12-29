import requests
import re
import json
import time
import os

def parse_number(val_str):
    """Parse numbers from strings like '1,234', 'approx 500', '1.2 million'"""
    if not val_str: 
        return 0
    
    # Remove references like [1], [a], HTML tags
    val_str = re.sub(r'\[[^\]]+\]', '', val_str)
    val_str = re.sub(r'<[^>]+>', '', val_str)
    val_str = re.sub(r'{{[^}]+}}', '', val_str)  # Remove templates
    
    # Check for "million"
    if 'million' in val_str.lower():
        match = re.search(r'([\d.]+)\s*million', val_str, re.IGNORECASE)
        if match:
            return int(float(match.group(1)) * 1000000)
    
    # Check for "thousand"
    if 'thousand' in val_str.lower():
        match = re.search(r'([\d.]+)\s*thousand', val_str, re.IGNORECASE)
        if match:
            return int(float(match.group(1)) * 1000)
    
    # Extract first major number with optional commas
    match = re.search(r'([\d,]+)', val_str)
    if match:
        num_str = match.group(1).replace(',', '')
        if num_str.isdigit():
            return int(num_str)
    
    return 0

def fetch_wikipedia_data(country_name):
    """Fetch military data from Wikipedia"""
    print(f"  Fetching Wikipedia data for {country_name}...")
    
    url = "https://en.wikipedia.org/w/api.php"
    headers = {"User-Agent": "MilitaryRankingsBot/1.0"}
    
    # Try to find military page
    search_params = {
        "action": "opensearch",
        "search": f"Armed forces of {country_name}",
        "limit": 1,
        "namespace": 0,
        "format": "json"
    }
    
    try:
        search_resp = requests.get(url, params=search_params, headers=headers, timeout=10).json()
        page_title = search_resp[1][0] if search_resp[1] else country_name
        
        # Get wikitext
        content_params = {
            "action": "query",
            "prop": "revisions",
            "titles": page_title,
            "rvprop": "content",
            "format": "json",
            "redirects": 1
        }
        
        resp = requests.get(url, params=content_params, headers=headers, timeout=10).json()
        pages = resp["query"]["pages"]
        page_id = list(pages.keys())[0]
        
        if page_id == "-1":
            return None
            
        wikitext = pages[page_id]["revisions"][0]["*"]
        
        # Parse data from wikitext
        data = {}
        
        # Personnel
        active_match = re.search(r'\|\s*active\s*=\s*([^\n\|]+)', wikitext, re.IGNORECASE)
        if active_match:
            data["activePersonnel"] = parse_number(active_match.group(1))
            
        reserve_match = re.search(r'\|\s*reserve\s*=\s*([^\n\|]+)', wikitext, re.IGNORECASE)
        if reserve_match:
            data["reservePersonnel"] = parse_number(reserve_match.group(1))
        
        # Ground equipment
        for pattern, key in [
            (r'(\d{1,4}(?:,\d{3})*)\s*(?:main battle )?tanks', 'tanks'),
            (r'(\d{1,4}(?:,\d{3})*)\s*(?:armou?red fighting vehicles?|AFVs?)', 'afv'),
            (r'(\d{1,4}(?:,\d{3})*)\s*(?:self[- ]propelled|SP)\s*artillery', 'selfPropelledArtillery'),
            (r'(\d{1,4}(?:,\d{3})*)\s*towed artillery', 'towedArtillery'),
            (r'(\d{1,4}(?:,\d{3})*)\s*(?:rocket\s*)?(?:projectors?|launchers?|MLRS)', 'rocketProjectors'),
        ]:
            match = re.search(pattern, wikitext, re.IGNORECASE)
            if match:
                data[key] = parse_number(match.group(1))
        
        # Naval
        for pattern, key in [
            (r'(\d{1,3}(?:,\d{3})*)\s*(?:ships|vessels|commissioned ships)', 'totalShips'),
            (r'(\d+)\s*(?:aircraft carriers?)', 'aircraftCarriers'),
            (r'(\d+)\s*submarines?', 'submarines'),
            (r'(\d+)\s*destroyers?', 'destroyers'),
            (r'(\d+)\s*frigates?', 'frigates'),
            (r'(\d+)\s*corvettes?', 'corvettes'),
            (r'(\d+)\s*patrol (?:vessels?|boats?|craft)', 'patrolVessels'),
        ]:
            match = re.search(pattern, wikitext, re.IGNORECASE)
            if match:
                data[key] = parse_number(match.group(1))
        
        # Air force
        for pattern, key in [
            (r'(\d{1,4}(?:,\d{3})*)\s*aircraft', 'totalAircraft'),
            (r'(\d{1,3}(?:,\d{3})*)\s*(?:fighter|interceptor)s?', 'fighters'),
            (r'(\d{1,3}(?:,\d{3})*)\s*(?:attack aircraft|ground attack)', 'attackAircraft'),
            (r'(\d{1,3}(?:,\d{3})*)\s*transport(?:s| aircraft)?', 'transports'),
            (r'(\d{1,3}(?:,\d{3})*)\s*trainers?', 'trainers'),
            (r'(\d{1,3}(?:,\d{3})*)\s*helicopters?', 'helicopters'),
            (r'(\d{1,3}(?:,\d{3})*)\s*(?:attack helicopters?|gunships?)', 'attackHelicopters'),
            (r'(\d+)\s*bombers?', 'bombers'),
        ]:
            match = re.search(pattern, wikitext, re.IGNORECASE)
            if match:
                data[key] = parse_number(match.group(1))
        
        return data
        
    except Exception as e:
        print(f"    Wikipedia error for {country_name}: {e}")
        return None

def fetch_military_data(country_name, power_index):
    """
    Comprehensive military data fetching with estimates based on power index
    """
    print(f"Fetching military data for {country_name}...")
    
    # Initialize with zeros
    data = {
        "army": {
            "activePersonnel": 0,
            "reservePersonnel": 0,
            "tanks": 0,
            "afv": 0,
            "selfPropelledArtillery": 0,
            "towedArtillery": 0,
            "rocketProjectors": 0
        },
        "navy": {
            "totalShips": 0,
            "aircraftCarriers": 0,
            "submarines": 0,
            "destroyers": 0,
            "frigates": 0,
            "corvettes": 0,
            "patrolVessels": 0,
            "merchantMarine": 0,
            "majorPorts": 0
        },
        "airforce": {
            "totalAircraft": 0,
            "fighters": 0,
            "attackAircraft": 0,
            "transports": 0,
            "trainers": 0,
            "specialMission": 0,
            "tankerFleet": 0,
            "helicopters": 0,
            "attackHelicopters": 0,
            "bombers": 0
        },
        "nuclear": {
            "hasNuclear": False,
            "stockpile": 0
        }
    }
    
    # Fetch Wikipedia data
    wiki_data = fetch_wikipedia_data(country_name)
    if wiki_data:
        # Map Wikipedia data to structure
        if "activePersonnel" in wiki_data:
            data["army"]["activePersonnel"] = wiki_data["activePersonnel"]
        if "reservePersonnel" in wiki_data:
            data["army"]["reservePersonnel"] = wiki_data["reservePersonnel"]
        if "tanks" in wiki_data:
            data["army"]["tanks"] = wiki_data["tanks"]
        if "afv" in wiki_data:
            data["army"]["afv"] = wiki_data["afv"]
        if "selfPropelledArtillery" in wiki_data:
            data["army"]["selfPropelledArtillery"] = wiki_data["selfPropelledArtillery"]
        if "towedArtillery" in wiki_data:
            data["army"]["towedArtillery"] = wiki_data["towedArtillery"]
        if "rocketProjectors" in wiki_data:
            data["army"]["rocketProjectors"] = wiki_data["rocketProjectors"]
        
        if "totalShips" in wiki_data:
            data["navy"]["totalShips"] = wiki_data["totalShips"]
        if "aircraftCarriers" in wiki_data:
            data["navy"]["aircraftCarriers"] = wiki_data["aircraftCarriers"]
        if "submarines" in wiki_data:
            data["navy"]["submarines"] = wiki_data["submarines"]
        if "destroyers" in wiki_data:
            data["navy"]["destroyers"] = wiki_data["destroyers"]
        if "frigates" in wiki_data:
            data["navy"]["frigates"] = wiki_data["frigates"]
        if "corvettes" in wiki_data:
            data["navy"]["corvettes"] = wiki_data["corvettes"]
        if "patrolVessels" in wiki_data:
            data["navy"]["patrolVessels"] = wiki_data["patrolVessels"]
        
        if "totalAircraft" in wiki_data:
            data["airforce"]["totalAircraft"] = wiki_data["totalAircraft"]
        if "fighters" in wiki_data:
            data["airforce"]["fighters"] = wiki_data["fighters"]
        if "attackAircraft" in wiki_data:
            data["airforce"]["attackAircraft"] = wiki_data["attackAircraft"]
        if "transports" in wiki_data:
            data["airforce"]["transports"] = wiki_data["transports"]
        if "trainers" in wiki_data:
            data["airforce"]["trainers"] = wiki_data["trainers"]
        if "helicopters" in wiki_data:
            data["airforce"]["helicopters"] = wiki_data["helicopters"]
        if "attackHelicopters" in wiki_data:
            data["airforce"]["attackHelicopters"] = wiki_data["attackHelicopters"]
        if "bombers" in wiki_data:
            data["airforce"]["bombers"] = wiki_data["bombers"]
    
    # Nuclear states (hardcoded with known stockpiles)
    nuclear_states = {
        "Russia": 5580, "United States": 5044, "China": 500,
        "France": 290, "United Kingdom": 225, "Pakistan": 170,
        "India": 172, "Israel": 90, "North Korea": 50
    }
    if country_name in nuclear_states:
        data["nuclear"]["hasNuclear"] = True
        data["nuclear"]["stockpile"] = nuclear_states[country_name]
    
    # Use power index for basic estimates if data is missing
    # Lower power index = stronger military
    # Power index ranges from ~0.04 (USA) to ~8.0 (weakest countries)
    
    # Estimate personnel if missing
    if data["army"]["activePersonnel"] == 0 and power_index > 0:
        # Rough estimate: stronger countries have more personnel
        if power_index < 0.1:  # Top tier
            data["army"]["activePersonnel"] = int(1000000 / power_index)
        elif power_index < 0.5:  # Mid-high tier
            data["army"]["activePersonnel"] = int(500000 / power_index)
        elif power_index < 2.0:  # Mid tier
            data["army"]["activePersonnel"] = int(100000 / power_index)
        else:  # Lower tier
            data["army"]["activePersonnel"] = int(20000 / power_index)
    
    return data

def main():
    try:
        # Read rankingData to get countries
        with open("src/lib/rankingData.ts", "r", encoding="utf-8") as f:
            content = f.read()
        
        # Extract country names, IDs, and power indices
        pattern = r'rank:\s*(\d+),\s*name:\s*"([^"]+)",\s*id:\s*"([^"]+)",\s*powerIndex:\s*([\d.]+)'
        matches = re.findall(pattern, content)
        
        all_data = {}
        total = len(matches)
        
        print(f"Found {total} countries. Starting enhanced data collection...")
        print("=" * 70)
        
        for i, (rank, name, country_id, power_index) in enumerate(matches, 1):
            print(f"\n[{i}/{total}] Processing {name} (Rank #{rank})...")
            
            stats = fetch_military_data(name, float(power_index))
            if stats:
                all_data[country_id] = stats
            
            # Be nice to Wikipedia API
            time.sleep(0.6)
        
        # Save to JSON
        cache_file = "scripts/military_data_cache.json"
        with open(cache_file, "w", encoding="utf-8") as f:
            json.dump(all_data, f, indent=2)
        
        print("\n" + "=" * 70)
        print(f"✓ Data collection complete!")
        print(f"✓ Saved {len(all_data)} countries to {cache_file}")
        
    except Exception as e:
        print(f"Critical error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
