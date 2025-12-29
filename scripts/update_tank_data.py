import re

# Tank data for countries 1-30
tank_data = {
    "usa": 4640,
    "rus": 3517,
    "chn": 5250,
    "ind": 4614,
    "sko": 2600,
    "ukd": 213,
    "fra": 222,
    "jpn": 500,
    "tky": 2229,
    "ita": 200,
    "bra": 290,
    "pak": 2500,
    "ino": 313,
    "ger": 310,
    "isr": 1300,
    "irn": 2000,
    "spn": 327,
    "aus": 59,
    "egy": 4500,
    "ukr": 1100,
    "pol": 631,
    "twn": 1000,
    "vet": 1383,
    "sar": 1062,
    "thl": 635,
    "alg": 1485,
    "swe": 110,
    "can": 103,
    "sng": 170,
    "gre": 1365,
}

# Read the mockData.ts file
with open('../src/lib/mockData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Update tank values for each country
for country_id, tanks in tank_data.items():
    # Pattern to find the country's army section and update tanks value
    # This regex finds the country block and its army.tanks field
    pattern = rf'(id: "{country_id}".*?army: \{{.*?tanks: )\d+,'
    replacement = rf'\g<1>{tanks},'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    print(f"Updated {country_id}: {tanks} tanks")

# Write back to file
with open('../src/lib/mockData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ Successfully updated tank data for top 30 countries in mockData.ts!")
