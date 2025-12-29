import json
import re

# Read complete_military_data.json
with open('complete_military_data.json', 'r', encoding='utf-8') as f:
    complete_data = json.load(f)

# Read mockData.ts
with open('../src/lib/mockData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Explicit mapping for known deviations (Review and add more if needed)
# Explicit mapping for known deviations
# Based on debug_keys.py output
id_map = {
    "sko": "SKO", "ukd": "UKD", "tky": "TKY", "ino": "INO", "ger": "GER", 
    "spn": "SPN", "vet": "VET", "sar": "SAR", "thl": "THL", "alg": "ALG",
    "sng": "SNG", "gre": "GRE", "nko": "NKO", "phi": "PHL", "swi": "SWZ",
    "ban": "BNG", "ned": "NTH", "cze": "CZC", "nze": "NWZ", "uae": "UAE",
    "aze": "AZR", "mal": "MLY", "bng": "BNG", "nth": "NTH"
    # Note: complete_data uses custom codes like SKO, UKD.
    # We map mock_id (lowercase) to these Keys.
    # If mock_id.upper() exists in complete_data, we use it.
    # So 'usa' -> 'USA' (works automatically).
    # 'sko' -> 'SKO' (works automatically if we remove the BAD map 'sko': 'KOR')
}

# Values for 1-30 are verified. Others are best effort.
# 'ino' -> 'IDN' (Indonesia)
# 'ger' -> 'DEU' (Germany)
# 'spn' -> 'ESP' (Spain)
# 'alg' -> 'DZA' (Algeria)
# 'vet' -> 'VNM' (Vietnam)
# 'sar' -> 'SAU' (Saudi Arabia)
# 'thl' -> 'THA' (Thailand)
# 'irq' -> 'IRQ' (Iraq)

print("Updating Army data in mockData.ts...")
print("=" * 80)

updated_count = 0
not_found_ids = []

# Find all country IDs in mockData.ts
# Pattern: id: "xyz",
matches = re.findall(r'id:\s*"([^"]+)"', content)

for mock_id in matches:
    # Determine Complete Data Key
    complete_key = None
    
    if mock_id in id_map:
        complete_key = id_map[mock_id]
    elif mock_id.upper() in complete_data:
        complete_key = mock_id.upper()
    
    if not complete_key or complete_key not in complete_data:
        # Try simple lookups
        if mock_id == "irq": complete_key = "IRQ"
        # Add more ad-hoc logic if needed
    
    if not complete_key or complete_key not in complete_data:
        not_found_ids.append(mock_id)
        continue

    country_data = complete_data[complete_key]
    army_data = country_data.get('army', {})

    # Fields to update
    fields = {
        'activePersonnel': army_data.get('activePersonnel', 0),
        'reservePersonnel': army_data.get('reservePersonnel', 0),
        'tanks': army_data.get('tanks', 0),
        'afv': army_data.get('afv', 0),
        'selfPropelledArtillery': army_data.get('selfPropelledArtillery', 0),
        'towedArtillery': army_data.get('towedArtillery', 0),
        'rocketProjectors': army_data.get('rocketProjectors', 0),
    }

    # Perform Replacements
    country_updated = False
    for field, value in fields.items():
        pattern = rf'(id:\s*"{mock_id}".*?army:\s*\{{.*?{field}:\s*)(\d+)(,?)'
        
        # Check current value before replacing
        match = re.search(pattern, content, flags=re.DOTALL)
        if match:
            current_val = int(match.group(2))
            if current_val != value:
                # print(f"  {mock_id} {field}: {current_val} -> {value}")
                replacement = rf'\g<1>{value}\g<3>'
                new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
                if new_content != content:
                    content = new_content
                    country_updated = True
        else:
            # print(f"  Warning: Field {field} not found for {mock_id}")
            pass
            
    if country_updated:
        updated_count += 1
        print(f"Updated {mock_id} -> {complete_key}")

# Write back
with open('../src/lib/mockData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Updated Army data for {updated_count} countries.")
if not_found_ids:
    print(f"Counties not matched in complete_data: {len(not_found_ids)}")
    print(not_found_ids[:10]) # Sample
