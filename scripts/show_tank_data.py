import json

# Read complete_military_data.json
with open('complete_military_data.json', 'r', encoding='utf-8') as f:
    complete_data = json.load(f)

# Country ID mapping from complete_military_data to mockData
# complete_military_data uses uppercase codes, mockData uses lowercase
country_mapping = {
    "USA": "usa",
    "RUS": "rus",
    "CHN": "chn",
    "IND": "ind",
    "KOR": "sko",  # South Korea
    "GBR": "ukd",  # United Kingdom
    "FRA": "fra",
    "JPN": "jpn",
    "TUR": "tky",  # Turkey
    "ITA": "ita",
    "BRA": "bra",
    "PAK": "pak",
    "INO": "ino",  # Indonesia
    "GER": "ger",
    "ISR": "isr",
    "IRN": "irn",
    "ESP": "spn",  # Spain
    "AUS": "aus",
    "EGY": "egy",
    "UKR": "ukr",
    "POL": "pol",
    "TWN": "twn",
    "VNM": "vet",  # Vietnam
    "SAU": "sar",  # Saudi Arabia
    "THA": "thl",  # Thailand
    "ALG": "alg",
    "SWE": "swe",
    "CAN": "can",
    "SGP": "sng",  # Singapore
    "GRC": "gre",  # Greece
}

# Print tank data for top 30 countries
print("Tank data from complete_military_data.json:\n")
for complete_id, mock_id in country_mapping.items():
    if complete_id in complete_data:
        tanks = complete_data[complete_id].get('army', {}).get('tanks', 0)
        print(f"{complete_id} ({mock_id}): {tanks} tanks")
    else:
        print(f"{complete_id} ({mock_id}): NOT FOUND in complete_military_data.json")

print("\n\nTo update mockData.ts, you need to manually copy these tank values to the corresponding country entries.")
print("The mockData.ts file uses lowercase IDs as shown in parentheses above.")
