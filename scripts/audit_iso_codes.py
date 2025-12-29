import re

# Standard ISO 3166-1 Alpha-3 codes (Partial list for checking, mostly focusing on common divergences in military datasets)
STANDARD_ISO = {
    "USA", "RUS", "CHN", "IND", "KOR", "GBR", "FRA", "JPN", "TUR", "ITA", "BRA", "PAK", "IDN", "IRN", "EGY",
    "AUS", "ISR", "UKR", "DEU", "ESP", "SAU", "CAN", "TWN", "POL", "VNM", "THA", "DZA", "ZAF", "IRQ", "SWE",
    "GRC", "PRT", "MEX", "COL", "MMR", "NGA", "PAK", "PHL", "ARG", "CHE", "NOR", "PRK", "MYS", "BGD", "SYR",
    "ROU", "CHL", "NLD", "QAT", "AUT", "DNK", "FIN", "UAE", "CUB", "HUN", "OMN", "KWT", "SGP", "ETH", "AGO",
    "VEN", "CZE", "PER", "AZE", "BLR", "KAZ", "MAR", "SRB", "BGR", "NZL", "LKA", "KHM", "TUN", "JOR", "YEM",
    "ZMB", "UZB", "TJK", "TKM", "KGZ", "GEO", "HRV", "SVK", "DOM", "ECU", "BOL", "URY", "PRY", "GTM", "HND",
    "SLV", "NIC", "CRI", "PAN", "LBY", "SDN", "SSD", "COD", "COG", "CMR", "GHA", "CIV", "MLI", "BFA", "NER",
    "TCD", "CAF", "SEN", "GMB", "GIN", "SLE", "LBR", "SOM", "ERI", "DJI", "KEN", "TZA", "UGA", "RWA", "BDI",
    "MOZ", "MWI", "ZWE", "NAM", "BWA", "LSO", "SWZ", "MDG", "MUS", "LBN", "ARM", "ALB", "MKD", "BIH", "SVN",
    "EST", "LVA", "LTU", "MDA", "BEL", "IRL", "ISL", "LUX", "CHE"
}

# Known mappings to check against
MAPPED = {
    "KOR": "SKO",
    "GBR": "UKD",
    "TUR": "TKY",
    "IDN": "INO",
}

def check_mismatches():
    with open("src/lib/mockData.ts", "r", encoding="utf-8") as f:
        content = f.read()

    # Find all ids
    matches = re.findall(r'id:\s*"([a-z]{3})"', content)
    unique_ids = sorted(list(set(matches)))

    print(f"Found {len(unique_ids)} unique IDs in mockData.")

    print("\n--- Potential Mismatches (Internal ID not in Standard List) ---")
    
    mismatches = []
    
    for uid in unique_ids:
        upper_id = uid.upper()
        
        # Check if it's a known mapping target
        is_mapped_target = False
        for std, internal in MAPPED.items():
            if internal == upper_id:
                is_mapped_target = True
                break
        
        if upper_id not in STANDARD_ISO and not is_mapped_target:
             mismatches.append(upper_id)
        elif is_mapped_target:
             print(f"[OK] {upper_id} is mapped from standard.")

    for m in mismatches:
        print(f"Mismatch: {m}")

if __name__ == "__main__":
    check_mismatches()
