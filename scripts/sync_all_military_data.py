import json
import re

# Read complete_military_data.json
with open('complete_military_data.json', 'r', encoding='utf-8') as f:
    complete_data = json.load(f)

# Read mockData.ts
with open('../src/lib/mockData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Robust mapping matching Logic from audit_coverage.py
def normalize_key(k):
    return k.lower().strip()

complete_keys_normalized = {normalize_key(k): k for k in complete_data.keys()}

# Expanded Custom Map to ensure 100% coverage
id_map = {
    "sko": "SKO", "ukd": "UKD", "tky": "TKY", "ino": "INO", "ger": "GER", 
    "spn": "SPN", "vet": "VET", "sar": "SAR", "thl": "THL", "alg": "ALG",
    "sng": "SNG", "gre": "GRE", "phi": "PHL", "swi": "SWZ",
    "ban": "BNG", "ned": "NTH", "cze": "CZC", "nze": "NWZ", "uae": "UAE",
    "aze": "AZR", "mal": "MLY", "can": "CAN", "saf": "SAF",
    "mac": "MAC", "bos": "BOS", "dr": "DOM" # Add any others if needed
}

print("Syncing ALL military data (Army, Navy, Air Force) to mockData.ts...")

# Define fields to sync for each category
categories = {
    "army": {
        "activePersonnel": 0, "reservePersonnel": 0, "tanks": 0, "afv": 0,
        "selfPropelledArtillery": 0, "towedArtillery": 0, "rocketProjectors": 0
    },
    "navy": {
        "totalShips": 0, "aircraftCarriers": 0, "submarines": 0, "destroyers": 0,
        "frigates": 0, "corvettes": 0, "patrolVessels": 0, "merchantMarine": 0, "majorPorts": 0
    },
    "airforce": {
        "totalAircraft": 0, "fighters": 0, "attackAircraft": 0, "transports": 0,
        "trainers": 0, "specialMission": 0, "tankerFleet": 0, "helicopters": 0,
        "attackHelicopters": 0, "bombers": 0
    }
}

updated_count = 0

# Find all country IDs
matches = re.finditer(r'id:\s*"([^"]+)"', content)
match_list = list(matches) # Convert to list to iterate safely

for match in match_list:
    mock_id = match.group(1)
    
    # Robust Matching Logic
    complete_key = None
    
    # 1. Custom Map
    if mock_id in id_map:
        complete_key = id_map[mock_id]
        
    # 2. Exact Upper
    if not complete_key and mock_id.upper() in complete_data:
        complete_key = mock_id.upper()
        
    # 3. Normalized Match
    if not complete_key and normalize_key(mock_id) in complete_keys_normalized:
        complete_key = complete_keys_normalized[normalize_key(mock_id)]
        
    if not complete_key:
        print(f"Skipping {mock_id} (No match found)")
        continue
        
    if complete_key not in complete_data:
        continue # Should not happen given logic above
        
    source_country = complete_data[complete_key]
    country_updated = False
    
    # Process each category (army, navy, airforce)
    for cat_name, fields in categories.items():
        if cat_name not in source_country: continue
        
        source_values = source_country[cat_name]
        
        for field in fields.keys():
            value = source_values.get(field, 0)
            
            # Robust Regex:
            # Look for: id: "mock_id" ... category: { ... field: 0,
            # We use a pattern that isolates the specific field under the category block for this ID
            
            # Step 1: Locate the specific ID block start
            # Step 2: Look ahead for category start
            # Step 3: Look ahead for field
            
            # Since content is huge, we replace carefully using specific constraints
            # Pattern: 
            # (id: "mock_id".*?cat_name: \{.*?field:\s*)(\d+)(,?)
            
            pattern = rf'(id:\s*"{mock_id}".*?{cat_name}:\s*\{{.*?{field}:\s*)(\d+)(,?)'
            
            # Check current
            m = re.search(pattern, content, flags=re.DOTALL)
            if m:
                current_val = int(m.group(2))
                if current_val != value:
                    # Replace
                    replacement = rf'\g<1>{value}\g<3>'
                    # Only replace the FIRST occurrence after the ID match to avoid bleeding into next country
                    # Re.sub with DOTALL and count=1 starting from ID match is tricky with just regex string
                    # But since we include `id: "mock_id"` in the pattern, it anchors it.
                    # The `.*?` are non-greedy, so it should find the closest property.
                    
                    new_content = re.sub(pattern, replacement, content, count=1, flags=re.DOTALL)
                    if new_content != content:
                        content = new_content
                        country_updated = True
                        # print(f"  Updated {mock_id} {cat_name}.{field}: {current_val} -> {value}")

    if country_updated:
        updated_count += 1
        print(f"Updated {mock_id} ({complete_key})")

# Write back
with open('../src/lib/mockData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Total countries updated: {updated_count}")
