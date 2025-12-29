
file_path = 'c:/shin_working/war/military-platform/scripts/complete_military_data.json'

nor_data = [
    '    "NOR": {\n',
    '        "army": {\n',
    '            "activePersonnel": 27000,\n',
    '            "reservePersonnel": 40000,\n',
    '            "tanks": 36,\n',
    '            "afv": 1000,\n',
    '            "selfPropelledArtillery": 48,\n',
    '            "towedArtillery": 0,\n',
    '            "rocketProjectors": 12\n',
    '        },\n',
    '        "navy": {\n',
    '            "totalShips": 48,\n',
    '            "aircraftCarriers": 0,\n',
    '            "submarines": 6,\n',
    '            "destroyers": 0,\n',
    '            "frigates": 4,\n',
    '            "corvettes": 6,\n',
    '            "patrolVessels": 15,\n',
    '            "merchantMarine": 1600,\n',
    '            "majorPorts": 10\n',
    '        },\n',
    '        "airforce": {\n',
    '            "totalAircraft": 85,\n',
    '            "fighters": 40,\n',
    '            "attackAircraft": 0,\n',
    '            "transports": 22,\n',
    '            "trainers": 0,\n',
    '            "specialMission": 5,\n',
    '            "tankerFleet": 0,\n',
    '            "helicopters": 18,\n',
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

# Find NOR start
for i, line in enumerate(lines):
    if '"NOR": {' in line:
        start_idx = i
        break

if start_idx != -1:
    # Find NOR end (start of CHE)
    # CHE is rank 34. NOR is 33.
    # In Step 3373, CHE is at 1304.
    for i in range(start_idx + 1, len(lines)):
        if '"CHE": {' in lines[i]:
            end_idx = i
            break
            
    if end_idx == -1:
        # Try to find matching brace
        # But NOR is corrupted.
        # Just search for CHE.
        pass

if start_idx != -1 and end_idx != -1:
    print(f"Replacing NOR at {start_idx} to {end_idx}")
    new_lines = lines[:start_idx] + nor_data + lines[end_idx:]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Successfully fixed NOR.")
else:
    print(f"Error: Could not find NOR block. Start: {start_idx}, End: {end_idx}")
