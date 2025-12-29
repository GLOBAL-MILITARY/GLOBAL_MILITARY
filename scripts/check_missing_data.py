import json
import re

# Read complete_military_data.json
with open('complete_military_data.json', 'r', encoding='utf-8') as f:
    complete_data = json.load(f)

# Read mockData.ts
with open('../src/lib/mockData.ts', 'r', encoding='utf-8') as f:
    mock_content = f.read()

# Country ID mapping
country_mapping = {
    "USA": "usa",
    "RUS": "rus",
    "CHN": "chn",
    "IND": "ind",
    "KOR": "sko",
    "GBR": "ukd",
    "FRA": "fra",
    "JPN": "jpn",
    "TUR": "tky",
    "ITA": "ita",
    "BRA": "bra",
    "PAK": "pak",
    "INO": "ino",
    "GER": "ger",
    "ISR": "isr",
    "IRN": "irn",
    "ESP": "spn",
    "AUS": "aus",
    "EGY": "egy",
    "UKR": "ukr",
    "POL": "pol",
    "TWN": "twn",
    "VNM": "vet",
    "SAU": "sar",
    "THA": "thl",
    "ALG": "alg",
    "SWE": "swe",
    "CAN": "can",
    "SGP": "sng",
    "GRC": "gre",
}

print("=" * 80)
print("COMPARING DATA BETWEEN complete_military_data.json AND mockData.ts")
print("=" * 80)
print()

missing_data_summary = {
    "navy": [],
    "army": [],
    "airforce": []
}

for complete_id, mock_id in country_mapping.items():
    if complete_id not in complete_data:
        continue
    
    country_data = complete_data[complete_id]
    
    # Extract data from complete_military_data.json
    navy_complete = country_data.get('navy', {})
    army_complete = country_data.get('army', {})
    airforce_complete = country_data.get('airforce', {})
    
    # Find the country in mockData.ts
    country_pattern = rf'id: "{mock_id}".*?relations:'
    country_match = re.search(country_pattern, mock_content, re.DOTALL)
    
    if not country_match:
        print(f"⚠️  {complete_id} ({mock_id}): NOT FOUND in mockData.ts")
        continue
    
    country_block = country_match.group(0)
    
    # Check Navy data
    navy_fields = {
        'totalShips': navy_complete.get('totalShips', 0),
        'aircraftCarriers': navy_complete.get('aircraftCarriers', 0),
        'submarines': navy_complete.get('submarines', 0),
        'destroyers': navy_complete.get('destroyers', 0),
        'frigates': navy_complete.get('frigates', 0),
        'corvettes': navy_complete.get('corvettes', 0),
        'patrolVessels': navy_complete.get('patrolVessels', 0),
    }
    
    # Check Army data
    army_fields = {
        'tanks': army_complete.get('tanks', 0),
        'activePersonnel': army_complete.get('activePersonnel', 0),
    }
    
    # Check Air Force data
    airforce_fields = {
        'totalAircraft': airforce_complete.get('totalAircraft', 0),
        'fighters': airforce_complete.get('fighters', 0),
        'helicopters': airforce_complete.get('helicopters', 0),
        'attackHelicopters': airforce_complete.get('attackHelicopters', 0),
        'bombers': airforce_complete.get('bombers', 0),
        'transports': airforce_complete.get('transports', 0),
        'trainers': airforce_complete.get('trainers', 0),
    }
    
    # Check for missing data
    has_missing = False
    
    for field, value in navy_fields.items():
        if value > 0:
            field_pattern = rf'{field}: (\d+)'
            field_match = re.search(field_pattern, country_block)
            if field_match:
                mock_value = int(field_match.group(1))
                if mock_value == 0 and value > 0:
                    if not has_missing:
                        print(f"\n[CHECK] {complete_id} ({mock_id}):")
                        has_missing = True
                    print(f"   Navy.{field}: complete={value}, mock={mock_value} [MISSING]")
                    missing_data_summary["navy"].append(f"{complete_id}.{field}")
    
    for field, value in army_fields.items():
        if value > 0:
            field_pattern = rf'{field}: (\d+)'
            field_match = re.search(field_pattern, country_block)
            if field_match:
                mock_value = int(field_match.group(1))
                if mock_value == 0 and value > 0:
                    if not has_missing:
                        print(f"\n🔍 {complete_id} ({mock_id}):")
                        has_missing = True
                    print(f"   Army.{field}: complete={value}, mock={mock_value} [MISSING]")
                    missing_data_summary["army"].append(f"{complete_id}.{field}")
    
    for field, value in airforce_fields.items():
        if value > 0:
            field_pattern = rf'{field}: (\d+)'
            field_match = re.search(field_pattern, country_block)
            if field_match:
                mock_value = int(field_match.group(1))
                if mock_value == 0 and value > 0:
                    if not has_missing:
                        print(f"\n🔍 {complete_id} ({mock_id}):")
                        has_missing = True
                    print(f"   AirForce.{field}: complete={value}, mock={mock_value} [MISSING]")
                    missing_data_summary["airforce"].append(f"{complete_id}.{field}")

print("\n" + "=" * 80)
print("SUMMARY")
print("=" * 80)
print(f"Missing Navy data: {len(missing_data_summary['navy'])} fields")
print(f"Missing Army data: {len(missing_data_summary['army'])} fields")
print(f"Missing Air Force data: {len(missing_data_summary['airforce'])} fields")
print(f"Total missing fields: {sum(len(v) for v in missing_data_summary.values())}")
print()
