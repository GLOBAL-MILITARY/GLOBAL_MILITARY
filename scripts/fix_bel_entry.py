
file_path = 'c:/shin_working/war/military-platform/scripts/complete_military_data.json'

bel_data = [
    '    "BEL": {\n',
    '        "army": {\n',
    '            "activePersonnel": 26105,\n',
    '            "reservePersonnel": 10000,\n',
    '            "tanks": 0,\n',
    '            "afv": 500,\n',
    '            "selfPropelledArtillery": 0,\n',
    '            "towedArtillery": 14,\n',
    '            "rocketProjectors": 0\n',
    '        },\n',
    '        "navy": {\n',
    '            "totalShips": 10,\n',
    '            "aircraftCarriers": 0,\n',
    '            "submarines": 0,\n',
    '            "destroyers": 0,\n',
    '            "frigates": 2,\n',
    '            "corvettes": 0,\n',
    '            "patrolVessels": 2,\n',
    '            "merchantMarine": 100,\n',
    '            "majorPorts": 2\n',
    '        },\n',
    '        "airforce": {\n',
    '            "totalAircraft": 113,\n',
    '            "fighters": 50,\n',
    '            "attackAircraft": 0,\n',
    '            "transports": 10,\n',
    '            "trainers": 30,\n',
    '            "specialMission": 0,\n',
    '            "tankerFleet": 0,\n',
    '            "helicopters": 30,\n',
    '            "attackHelicopters": 0,\n',
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

start_idx = -1
end_idx = -1

# Find BEL start
for i, line in enumerate(lines):
    if '"BEL": {' in line:
        start_idx = i
        break

if start_idx != -1:
    # Find BEL end (start of PHL)
    # PHL is rank 40. BEL is 39.
    # In Step 3373, PHL is at 1499.
    for i in range(start_idx + 1, len(lines)):
        if '"PHL": {' in lines[i]:
            end_idx = i
            break
            
    if end_idx == -1:
        # Try to find matching brace
        pass

if start_idx != -1 and end_idx != -1:
    print(f"Replacing BEL at {start_idx} to {end_idx}")
    new_lines = lines[:start_idx] + bel_data + lines[end_idx:]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Successfully fixed BEL.")
else:
    print(f"Error: Could not find BEL block. Start: {start_idx}, End: {end_idx}")
