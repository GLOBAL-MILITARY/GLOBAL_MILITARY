import re
import json

# Read the countryDetails.ts file
with open('src/lib/countryDetails.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all country IDs
country_pattern = r'"([A-Z]{3})":\s*\{'
countries = re.findall(country_pattern, content)

print(f"Total countries found: {len(countries)}")
print(f"Countries: {', '.join(countries[:20])}...")

# Check for missing fields
missing_data = []
for country_id in countries:
    # Find the country block
    pattern = rf'"{country_id}":\s*\{{[^}}]*?(?:capital|population|gdp)[^}}]*?\}}'
    match = re.search(pattern, content, re.DOTALL)
    
    if match:
        block = match.group()
        has_capital = 'capital:' in block
        has_population = 'population:' in block
        has_gdp = 'gdp:' in block
        
        if not (has_capital and has_population and has_gdp):
            missing_fields = []
            if not has_capital:
                missing_fields.append('capital')
            if not has_population:
                missing_fields.append('population')
            if not has_gdp:
                missing_fields.append('gdp')
            
            missing_data.append({
                'id': country_id,
                'missing': missing_fields
            })

if missing_data:
    print(f"\n❌ Found {len(missing_data)} countries with missing data:")
    for item in missing_data:
        print(f"  - {item['id']}: missing {', '.join(item['missing'])}")
else:
    print("\n✅ All countries have complete data (capital, population, gdp)")

# Save results
with open('scripts/missing_country_data.json', 'w', encoding='utf-8') as f:
    json.dump(missing_data, f, indent=2)

print(f"\nResults saved to scripts/missing_country_data.json")
