
file_path = 'c:/shin_working/war/military-platform/scripts/complete_military_data.json'

vnm_data = [
    '    "VNM": {\n',
    '        "army": {\n',
    '            "activePersonnel": 470000,\n',
    '            "reservePersonnel": 5000000,\n',
    '            "tanks": 1383,\n',
    '            "afv": 4500,\n',
    '            "selfPropelledArtillery": 100,\n',
    '            "towedArtillery": 1000,\n',
    '            "rocketProjectors": 700\n',
    '        },\n',
    '        "navy": {\n',
    '            "totalShips": 65,\n',
    '            "aircraftCarriers": 0,\n',
    '            "submarines": 6,\n',
    '            "destroyers": 0,\n',
    '            "frigates": 9,\n',
    '            "corvettes": 14,\n',
    '            "patrolVessels": 26,\n',
    '            "merchantMarine": 1800,\n',
    '            "majorPorts": 15\n',
    '        },\n',
    '        "airforce": {\n',
    '            "totalAircraft": 220,\n',
    '            "fighters": 75,\n',
    '            "attackAircraft": 0,\n',
    '            "transports": 88,\n',
    '            "trainers": 30,\n',
    '            "specialMission": 4,\n',
    '            "tankerFleet": 0,\n',
    '            "helicopters": 90,\n',
    '            "attackHelicopters": 25,\n',
    '            "bombers": 0\n',
    '        },\n',
    '        "nuclear": {\n',
    '            "hasNuclear": false,\n',
    '            "stockpile": 0\n',
    '        }\n',
    '    },\n'
]

sau_data = [
    '    "SAU": {\n',
    '        "army": {\n',
    '            "activePersonnel": 257000,\n',
    '            "reservePersonnel": 25000,\n',
    '            "tanks": 1062,\n',
    '            "afv": 11000,\n',
    '            "selfPropelledArtillery": 700,\n',
    '            "towedArtillery": 300,\n',
    '            "rocketProjectors": 300\n',
    '        },\n',
    '        "navy": {\n',
    '            "totalShips": 55,\n',
    '            "aircraftCarriers": 0,\n',
    '            "submarines": 0,\n',
    '            "destroyers": 0,\n',
    '            "frigates": 7,\n',
    '            "corvettes": 4,\n',
    '            "patrolVessels": 9,\n',
    '            "merchantMarine": 400,\n',
    '            "majorPorts": 8\n',
    '        },\n',
    '        "airforce": {\n',
    '            "totalAircraft": 917,\n',
    '            "fighters": 283,\n',
    '            "attackAircraft": 80,\n',
    '            "transports": 49,\n',
    '            "trainers": 200,\n',
    '            "specialMission": 15,\n',
    '            "tankerFleet": 22,\n',
    '            "helicopters": 250,\n',
    '            "attackHelicopters": 34,\n',
    '            "bombers": 0\n',
    '        },\n',
    '        "nuclear": {\n',
    '            "hasNuclear": false,\n',
    '            "stockpile": 0\n',
    '        }\n',
    '    },\n'
]

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Target range: 800 to 994 (0-indexed 799 to 993)
# Line 800 is "    "TWN": {"
# Line 995 is "    "TWN": {"
# Verify
if '"TWN": {' in lines[799] and '"TWN": {' in lines[994]:
    print("Found duplicate TWN blocks.")
    
    # Replace lines 799 to 994 (exclusive) with VNM and SAU
    # Wait, lines[799:994] means 799 to 993.
    # Line 994 is index 994.
    # So lines[799:994] replaces up to index 993.
    # Index 994 is line 995.
    # So we keep line 995.
    
    new_lines = lines[:799] + vnm_data + sau_data + lines[994:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Successfully fixed duplicates.")
else:
    print(f"Mismatch: Line 800: {lines[799].strip()}, Line 995: {lines[994].strip()}")
