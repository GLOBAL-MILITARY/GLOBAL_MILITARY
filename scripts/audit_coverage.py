import json
import re

# Read complete_military_data.json
try:
    with open('complete_military_data.json', 'r', encoding='utf-8') as f:
        complete_data = json.load(f)
    print(f"Loaded {len(complete_data)} entries from complete_military_data.json")
except FileNotFoundError:
    print("Error: complete_military_data.json not found.")
    complete_data = {}

# Read mockData.ts
try:
    with open('../src/lib/mockData.ts', 'r', encoding='utf-8') as f:
        mock_content = f.read()
except FileNotFoundError:
    print("Error: ../src/lib/mockData.ts not found.")
    mock_content = ""

# Extract IDs from mockData.ts
# Pattern: id: "xyz",
matches = re.findall(r'id:\s*"([^"]+)"', mock_content)
mock_ids = matches
print(f"Found {len(mock_ids)} countries in mockData.ts")

# Check coverage
covered_count = 0
missing_data_count = 0
unmatched_ids = []
zero_data_ids = []

# Known map from previous attempts (reused to see if it helps, but we want to identify gaps)
# We will use a normalization function to try and match
def normalize_key(k):
    return k.lower().strip()

complete_keys_normalized = {normalize_key(k): k for k in complete_data.keys()}

# Explicit map for difficult ones (We will expand this based on findings)
# Common GFP discrepancies:
# mock: 'usa' -> complete: 'USA'
# mock: 'sko' -> complete: 'SKO' (South Korea)
# mock: 'nko' -> complete: 'NKO' (North Korea)
custom_map = {
    "sko": "SKO", "ukd": "UKD", "tky": "TKY", "ino": "INO", "ger": "GER", 
    "spn": "SPN", "vet": "VET", "sar": "SAR", "thl": "THL", "alg": "ALG",
    "sng": "SNG", "gre": "GRE", "phi": "PHL", "swi": "SWZ",
    "ban": "BNG", "ned": "NTH", "cze": "CZC", "nze": "NWZ", "uae": "UAE",
    "aze": "AZR", "mal": "MLY", "can": "CAN", "saf": "SAF"
}

for mid in mock_ids:
    # 1. Try Custom Map
    target_key = custom_map.get(mid)
    
    # 2. Try Exact Upper Match (usa -> USA)
    if not target_key and mid.upper() in complete_data:
        target_key = mid.upper()
        
    # 3. Try Normalized Match
    if not target_key and normalize_key(mid) in complete_keys_normalized:
        target_key = complete_keys_normalized[normalize_key(mid)]
        
    if target_key and target_key in complete_data:
        # Check if data is actually populated (using Tanks as a proxy for "Army Data")
        country_obj = complete_data[target_key]
        army = country_obj.get("army", {})
        tanks = army.get("tanks", 0)
        
        # Checking if ZERO
        if tanks == 0 and army.get("activePersonnel", 0) == 0:
            zero_data_ids.append(f"{mid} ({target_key}) - No Army Data")
            missing_data_count += 1
        else:
            covered_count += 1
    else:
        unmatched_ids.append(mid)

print("=" * 60)
print(f"Coverage Report:")
print(f"  Matched & Populated: {covered_count}")
print(f"  Matched but Zero Data: {len(zero_data_ids)}")
print(f"  Unmatched IDs: {len(unmatched_ids)}")
print("=" * 60)

if unmatched_ids:
    print("Unmatched IDs (Need mapping logic):")
    # Print in 5 cols
    for i in range(0, len(unmatched_ids), 5):
        print(", ".join(unmatched_ids[i:i+5]))

if zero_data_ids:
    print("\nMatched IDs with Zero Data (Check source):")
    print(zero_data_ids[:10]) # Show first 10
