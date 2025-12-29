import requests
from bs4 import BeautifulSoup
import json
import re
import time
import os

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

def clean_number(text):
    if not text:
        return 0
    # Remove things like [1], commas, etc.
    text = re.sub(r'\[.*?\]', '', text)
    text = re.sub(r'[^\d]', '', text)
    if not text:
        return 0
    return int(text)

def fetch_rankings_list():
    """Fetch the list of all countries and estimates their detail URL slug."""
    url = "https://www.globalfirepower.com/countries-listing.php"
    print(f"Fetching rankings from {url}...")
    try:
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Method: Find all country containers.
        # They usually link to the detail page.
        # <a href="country-military-strength-detail.php?country_id=united-states-of-america" ...>
        
        anchors = soup.find_all('a', href=re.compile(r'country-military-strength-detail\.php\?country_id='))
        
        countries = []
        seen_ids = set()
        
        for a in anchors:
            href = a['href']
            # Extract id
            match = re.search(r'country_id=([^&]+)', href)
            if match:
                slug = match.group(1)
                
                if slug in seen_ids:
                    continue
                seen_ids.add(slug)
                
                # Get Name if possible (often inside the anchor or near it)
                # But slug is enough to fetch details.
                # slug example: united-states-of-america
                
                # Try to find the 3-letter code too if possible, but the detail page will likely have it.
                countries.append(slug)
        
        print(f"Found {len(countries)} unique country slugs.")
        return countries

    except Exception as e:
        print(f"Error fetching rankings: {e}")
        return []

def extract_number_loose(text):
    """Extract numeric value from text like '13,043' or '1,328,000'"""
    if not text:
        return 0
    # Find the FIRST number sequence that looks like a count
    # Remove non-digit characters except comma
    m = re.search(r'([\d,]+)', text)
    if m:
        t = m.group(1).replace(',', '')
        if t.isdigit():
             return int(t)
    return 0

def fetch_details(slug):
    url = f"https://www.globalfirepower.com/country-military-strength-detail.php?country_id={slug}"
    # print(f"  Fetching details for {slug}...")
    try:
        response = requests.get(url, headers=HEADERS, timeout=10)
        if response.status_code != 200:
            print(f"  Failed to fetch {slug}: {response.status_code}")
            return None
            
        soup = BeautifulSoup(response.text, 'html.parser')
        text_content = response.text # Use raw HTML for regex often safer for loose matching
        
        data = {
            "slug": slug,
            "name": "", 
            "id": "", 
            "army": {},
            "navy": {},
            "airforce": {}
        }
        
        # Name
        name_tag = soup.find("span", class_="countryName") 
        if name_tag:
             data["name"] = name_tag.get_text(strip=True)
        else:
             data["name"] = slug.replace("-", " ").title()

        # ID from Flag
        # /imgs/flags/large/usa.jpg
        m_id = re.search(r'/imgs/flags/large/([a-z]{3})\.jpg', response.text)
        if m_id:
            data["id"] = m_id.group(1).upper()
        
        # Regex Helpers
        def get_val(pattern):
            match = re.search(pattern, response.text, re.IGNORECASE)
            if match:
                return extract_number_loose(match.group(1))
            return 0

        # --- Scrape Logic from fetch_gfp_data.py (Looser) ---
        
        # Personnel
        data["army"]["activePersonnel"] = get_val(r'Active Personnel[^0-9]+([\d,]+)')
        data["army"]["reservePersonnel"] = get_val(r'Reserve Personnel[^0-9]+([\d,]+)')
        
        # Airpower
        data["airforce"]["totalAircraft"] = get_val(r'Aircraft Total[^0-9]+([\d,]+)')
        data["airforce"]["fighters"] = get_val(r'Fighters[^0-9]+([\d,]+)')
        data["airforce"]["attackAircraft"] = get_val(r'Attack Types[^0-9]+([\d,]+)')
        data["airforce"]["transports"] = get_val(r'Transports[^0-9]+([\d,]+)')
        data["airforce"]["trainers"] = get_val(r'Trainers[^0-9]+([\d,]+)')
        data["airforce"]["specialMission"] = get_val(r'Special-Mission[^0-9]+([\d,]+)')
        data["airforce"]["tankerFleet"] = get_val(r'Aerial Tankers[^0-9]+([\d,]+)')
        data["airforce"]["helicopters"] = get_val(r'Helicopters[^0-9]+([\d,]+)')
        data["airforce"]["attackHelicopters"] = get_val(r'Attack Helicopters[^0-9]+([\d,]+)')
        data["airforce"]["bombers"] = get_val(r'Bombers[^0-9]+([\d,]+)')

        # Land
        data["army"]["tanks"] = get_val(r'Tanks:[^S]*Stock:\s*([\d,]+)')
        data["army"]["afv"] = get_val(r'Vehicles:[^S]*Stock:\s*([\d,]+)')
        data["army"]["selfPropelledArtillery"] = get_val(r'Self-Propelled Artillery:[^S]*Stock:\s*([\d,]+)')
        data["army"]["towedArtillery"] = get_val(r'Towed Artillery:[^S]*Stock:\s*([\d,]+)')
        data["army"]["rocketProjectors"] = get_val(r'Mobile Rocket Projectors:[^S]*Stock:\s*([\d,]+)')
        
        # Fallback for land if layout differs (some pages use "Stock: X" directly under header)
        if data["army"]["tanks"] == 0: data["army"]["tanks"] = get_val(r'Tanks.*?\n.*?([\d,]+)')

        # Naval
        data["navy"]["totalShips"] = get_val(r'Fleet Total[^0-9]+([\d,]+)')
        data["navy"]["aircraftCarriers"] = get_val(r'Aircraft Carriers[^0-9]+([\d,]+)')
        data["navy"]["submarines"] = get_val(r'Submarines[^0-9]+([\d,]+)')
        data["navy"]["destroyers"] = get_val(r'Destroyers[^0-9]+([\d,]+)')
        data["navy"]["frigates"] = get_val(r'Frigates[^0-9]+([\d,]+)')
        data["navy"]["corvettes"] = get_val(r'Corvettes[^0-9]+([\d,]+)')
        data["navy"]["patrolVessels"] = get_val(r'Patrol Vessels[^0-9]+([\d,]+)')
        data["navy"]["merchantMarine"] = get_val(r'Merchant Marine[^0-9]+([\d,]+)')
        data["navy"]["majorPorts"] = get_val(r'Ports / Terminals[^0-9]+([\d,]+)')

        return data

    except Exception as e:
        print(f"  Error parsing {slug}: {e}")
        return None

    except Exception as e:
        print(f"  Error parsing {slug}: {e}")
        return None

def main():
    slugs = fetch_rankings_list()
    # slugs = slugs[:5] # Debug
    
    results = {}
    
    total = len(slugs)
    print(f"Starting fetch for {total} countries...")
    
    for i, slug in enumerate(slugs):
        print(f"[{i+1}/{total}] {slug}...", end="", flush=True)
        data = fetch_details(slug)
        if data:
            # Use ID if found, else Slug (normalized)
            key = data.get("id")
            if not key:
                 # Fallback logic for ID
                 # United-States-of-America -> USA? No, unreliable.
                 # Just use the slug as key if ID missing
                 key = slug
            
            results[key] = data
            print(" Done.")
        else:
            print(" Failed.")
            
        time.sleep(1) # Be nice
        
    # Save
    with open('gfp_complete_fresh.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=4)
    print("Saved to gfp_complete_fresh.json")

if __name__ == "__main__":
    main()
