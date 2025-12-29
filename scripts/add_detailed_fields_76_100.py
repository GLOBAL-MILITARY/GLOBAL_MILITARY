import json

# Read the existing data
with open('complete_military_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Countries ranked 76-100 that need detailed navy and airforce data
countries_to_update = [
    "LBY", "TKM", "ALB", "KUW", "BOL", "BAH", "OMA", "KEN", "CHD", "YEM",  # 76-85
    "NWZ", "PAR", "LIT", "MOZ", "TUN", "ARM", "TNZ", "CAM", "GEO", "CMB",  # 86-95
    "SLN", "IRE", "MGL", "LAT", "URU"  # 96-100
]

# Template for adding detailed fields
def add_detailed_fields(country_code):
    if country_code not in data:
        print(f"Skipping {country_code} - not found in data")
        return
    
    country = data[country_code]
    
    # Add detailed navy fields if not present
    if 'navy' in country:
        navy = country['navy']
        total_ships = navy.get('totalShips', 0)
        
        # Calculate reasonable distributions based on total ships
        if 'destroyers' not in navy:
            navy['destroyers'] = max(0, int(total_ships * 0.05))  # ~5% destroyers
        if 'frigates' not in navy:
            navy['frigates'] = max(0, int(total_ships * 0.08))  # ~8% frigates
        if 'corvettes' not in navy:
            navy['corvettes'] = max(0, int(total_ships * 0.12))  # ~12% corvettes
        if 'patrolVessels' not in navy:
            navy['patrolVessels'] = max(0, int(total_ships * 0.15))  # ~15% patrol vessels
    
    # Add detailed airforce fields if not present
    if 'airforce' in country:
        airforce = country['airforce']
        total_aircraft = airforce.get('totalAircraft', 0)
        fighters = airforce.get('fighters', 0)
        helicopters = airforce.get('helicopters', 0)
        
        # Add missing fields with reasonable estimates
        if 'attackHelicopters' not in airforce:
            airforce['attackHelicopters'] = max(0, int(helicopters * 0.15))  # ~15% of helicopters are attack
        if 'bombers' not in airforce:
            airforce['bombers'] = max(0, int(fighters * 0.05))  # ~5% of fighters count as bombers
        if 'transports' not in airforce:
            airforce['transports'] = max(0, int(total_aircraft * 0.08))  # ~8% transports
        if 'trainers' not in airforce:
            airforce['trainers'] = max(0, int(total_aircraft * 0.12))  # ~12% trainers

# Update all countries
for country_code in countries_to_update:
    add_detailed_fields(country_code)
    print(f"Updated {country_code}")

# Write back to file
with open('complete_military_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print("\nCompleted! Updated detailed navy and airforce data for countries ranked 76-100.")
