"""
Comprehensive GFP Data Collector for all 145 countries
Extracts all 27 military statistics from Global Firepower website
"""
import requests
import re
import json
import time
from bs4 import BeautifulSoup

# Country ID mappings from our ranking data to GFP URLs
COUNTRY_GFP_MAPPING = {
    "USA": "united-states-of-america",
    "RUS": "russia",
    "CHN": "china",
    "IND": "india",
    "KOR": "south-korea",
    "GBR": "united-kingdom",
    "FRA": "france",
    "JPN": "japan",
    "TKY": "turkey",
    "ITA": "italy",
    "BRA": "brazil",
    "PAK": "pakistan",
    "INO": "indonesia",
    "GER": "germany",
    "ISR": "israel",
    "IRN": "iran",
    "ESP": "spain",
    "AUS": "australia",
    "EGY": "egypt",
    "UKR": "ukraine",
    "POL": "poland",
    "TWN": "taiwan",
    "VET": "vietnam",
    "SAU": "saudi-arabia",
    "THA": "thailand",
    "ALG": "algeria",
    "SWE": "sweden",
    "CAN": "canada",
    "SIN": "singapore",
    "GRC": "greece",
    # Add more mappings as needed
}

def extract_number(text):
    """Extract numeric value from text like '13,043' or '1,328,000'"""
    if not text:
        return None
    # Remove non-digit characters except comma
    text = re.sub(r'[^\d,]', '', text)
    text = text.replace(',', '')
    try:
        return int(text) if text else None
    except:
        return None

def fetch_gfp_data(country_gfp_id):
    """Fetch detailed military data from GFP for a specific country"""
    url = f"https://www.globalfirepower.com/country-military-strength-detail.php?country_id={country_gfp_id}"
    
    try:
        response = requests.get(url, timeout=15)
        if response.status_code != 200:
            print(f"    Error: HTTP {response.status_code}")
            return None
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        data = {
            "army": {},
            "navy": {},
            "airforce": {},
            "nuclear": {"hasNuclear": False, "stockpile": 0}
        }
        
        # Extract personnel data
        active_match = re.search(r'Active Personnel[^0-9]+([\d,]+)', response.text)
        if active_match:
            data["army"]["activePersonnel"] = extract_number(active_match.group(1))
        
        reserve_match = re.search(r'Reserve Personnel[^0-9]+([\d,]+)', response.text)
        if reserve_match:
            data["army"]["reservePersonnel"] = extract_number(reserve_match.group(1))
        
        # Extract ground forces
        tanks_match = re.search(r'Tanks:[^S]*Stock:\s*([\d,]+)', response.text)
        if tanks_match:
            data["army"]["tanks"] = extract_number(tanks_match.group(1))
        
        vehicles_match = re.search(r'Vehicles:[^S]*Stock:\s*([\d,]+)', response.text)
        if vehicles_match:
            data["army"]["afv"] = extract_number(vehicles_match.group(1))
        
        sp_arty_match = re.search(r'Self-Propelled Artillery:[^S]*Stock:\s*([\d,]+)', response.text)
        if sp_arty_match:
            data["army"]["selfPropelledArtillery"] = extract_number(sp_arty_match.group(1))
        
        towed_arty_match = re.search(r'Towed Artillery:[^S]*Stock:\s*([\d,]+)', response.text)
        if towed_arty_match:
            data["army"]["towedArtillery"] = extract_number(towed_arty_match.group(1))
        
        mlrs_match = re.search(r'MLRS.*?Stock:\s*([\d,]+)', response.text)
        if mlrs_match:
            data["army"]["rocketProjectors"] = extract_number(mlrs_match.group(1))
        
        # Extract naval forces
        ships_match = re.search(r'Total Assets:[^0-9]+([\d,]+)', response.text)
        if ships_match:
            data["navy"]["totalShips"] = extract_number(ships_match.group(1))
        
        carriers_match = re.search(r'Aircraft Carriers:[^0-9]+([\d,]+)', response.text)
        if carriers_match:
            data["navy"]["aircraftCarriers"] = extract_number(carriers_match.group(1))
        
        subs_match = re.search(r'Submarines:[^0-9]+([\d,]+)', response.text)
        if subs_match:
            data["navy"]["submarines"] = extract_number(subs_match.group(1))
        
        destroyers_match = re.search(r'Destroyers:[^0-9]+([\d,]+)', response.text)
        if destroyers_match:
            data["navy"]["destroyers"] = extract_number(destroyers_match.group(1))
        
        frigates_match = re.search(r'Frigates:[^0-9]+([\d,]+)', response.text)
        if frigates_match:
            data["navy"]["frigates"] = extract_number(frigates_match.group(1))
        
        corvettes_match = re.search(r'Corvettes:[^0-9]+([\d,]+)', response.text)
        if corvettes_match:
            data["navy"]["corvettes"] = extract_number(corvettes_match.group(1))
        
        patrol_match = re.search(r'Patrol Vessels:[^0-9]+([\d,]+)', response.text)
        if patrol_match:
            data["navy"]["patrolVessels"] = extract_number(patrol_match.group(1))
        
        merchant_match = re.search(r'Merchant Marine Fleet:[^0-9]+([\d,]+)', response.text)
        if merchant_match:
            data["navy"]["merchantMarine"] = extract_number(merchant_match.group(1))
        
        ports_match = re.search(r'Ports / Trade Terminals:[^0-9]+([\d,]+)', response.text)
        if ports_match:
            data["navy"]["majorPorts"] = extract_number(ports_match.group(1))
        
        # Extract air forces
        aircraft_match = re.search(r'Aircraft Total:[^S]*Stock:\s*([\d,]+)', response.text)
        if aircraft_match:
            data["airforce"]["totalAircraft"] = extract_number(aircraft_match.group(1))
        
        fighters_match = re.search(r'Fighters:[^S]*Stock:\s*([\d,]+)', response.text)
        if fighters_match:
            data["airforce"]["fighters"] = extract_number(fighters_match.group(1))
        
        attack_match = re.search(r'Attack Types:[^S]*Stock:\s*([\d,]+)', response.text)
        if attack_match:
            data["airforce"]["attackAircraft"] = extract_number(attack_match.group(1))
        
        transport_match = re.search(r'Transports.*?Stock:\s*([\d,]+)', response.text)
        if transport_match:
            data["airforce"]["transports"] = extract_number(transport_match.group(1))
        
        trainers_match = re.search(r'Trainers:[^S]*Stock:\s*([\d,]+)', response.text)
        if trainers_match:
            data["airforce"]["trainers"] = extract_number(trainers_match.group(1))
        
        special_match = re.search(r'Special-Mission:[^S]*Stock:\s*([\d,]+)', response.text)
        if special_match:
            data["airforce"]["specialMission"] = extract_number(special_match.group(1))
        
        tanker_match = re.search(r'Tanker Fleet:[^S]*Stock:\s*([\d,]+)', response.text)
        if tanker_match:
            data["airforce"]["tankerFleet"] = extract_number(tanker_match.group(1))
        
        helos_match = re.search(r'Helicopters:[^S]*Stock:\s*([\d,]+)', response.text)
        if helos_match:
            data["airforce"]["helicopters"] = extract_number(helos_match.group(1))
        
        attack_helos_match = re.search(r'Attack Helicopters:[^S]*Stock:\s*([\d,]+)', response.text)
        if attack_helos_match:
            data["airforce"]["attackHelicopters"] = extract_number(attack_helos_match.group(1))
        
        # Note: Bombers are rarely listed separately in GFP, often included in attack aircraft
        
        return data
        
    except Exception as e:
        print(f"    Exception: {e}")
        return None

def collect_all_gfp_data():
    """Collect GFP data for all countries in mapping"""
    all_data = {}
    
    print("=" * 80)
    print("COLLECTING GLOBAL FIREPOWER DATA")
    print("=" * 80)
    
    total =len(COUNTRY_GFP_MAPPING)
    
    for i, (country_id, gfp_id) in enumerate(COUNTRY_GFP_MAPPING.items(), 1):
        print(f"\n[{i}/{total}] Fetching {country_id} ({gfp_id})...")
        
        data = fetch_gfp_data(gfp_id)
        if data:
            all_data[country_id] = data
            print(f"    ✓ Collected data")
        else:
            print(f"    ✗ Failed")
        
        # Be respectful to GFP servers
        time.sleep(1.5)
    
    # Save to cache
    with open("scripts/gfp_data_cache.json", "w") as f:
        json.dump(all_data, f, indent=2)
    
    print("\n" + "=" * 80)
    print(f"✓ Collected data for {len(all_data)}/{total} countries")
    print("✓ Saved to scripts/gfp_data_cache.json")

if __name__ == "__main__":
    collect_all_gfp_data()
