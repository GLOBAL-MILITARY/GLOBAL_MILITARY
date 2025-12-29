
file_path = 'c:/shin_working/war/military-platform/scripts/complete_military_data.json'

irq_data = [
    '    "IRQ": {\n',
    '        "army": {\n',
    '            "activePersonnel": 193000,\n',
    '            "reservePersonnel": 50000,\n',
    '            "tanks": 350,\n',
    '            "afv": 1500,\n',
    '            "selfPropelledArtillery": 100,\n',
    '            "towedArtillery": 200,\n',
    '            "rocketProjectors": 50\n',
    '        },\n',
    '        "navy": {\n',
    '            "totalShips": 62,\n',
    '            "aircraftCarriers": 0,\n',
    '            "submarines": 0,\n',
    '            "destroyers": 0,\n',
    '            "frigates": 0,\n',
    '            "corvettes": 0,\n',
    '            "patrolVessels": 26,\n',
    '            "merchantMarine": 50,\n',
    '            "majorPorts": 2\n',
    '        },\n',
    '        "airforce": {\n',
    '            "totalAircraft": 391,\n',
    '            "fighters": 34,\n',
    '            "attackAircraft": 20,\n',
    '            "transports": 40,\n',
    '            "trainers": 80,\n',
    '            "specialMission": 10,\n',
    '            "tankerFleet": 0,\n',
    '            "helicopters": 150,\n',
    '            "attackHelicopters": 30,\n',
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

# Find IRQ start
for i, line in enumerate(lines):
    if '"IRQ": {' in line:
        start_idx = i
        break

if start_idx != -1:
    # Find IRQ end (start of CZE)
    for i in range(start_idx + 1, len(lines)):
        if '"CZE": {' in lines[i]:
            end_idx = i
            break

if start_idx != -1 and end_idx != -1:
    print(f"Replacing IRQ at {start_idx} to {end_idx}")
    new_lines = lines[:start_idx] + irq_data + lines[end_idx:]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Successfully fixed IRQ.")
else:
    print(f"Error: Could not find IRQ block. Start: {start_idx}, End: {end_idx}")
