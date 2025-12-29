
file_path = 'c:/shin_working/war/military-platform/scripts/complete_military_data.json'

can_data = [
    '    "CAN": {\n',
    '        "army": {\n',
    '            "activePersonnel": 63500,\n',
    '            "reservePersonnel": 27000,\n',
    '            "tanks": 103,\n',
    '            "afv": 1500,\n',
    '            "selfPropelledArtillery": 0,\n',
    '            "towedArtillery": 160,\n',
    '            "rocketProjectors": 0\n',
    '        },\n',
    '        "navy": {\n',
    '            "totalShips": 33,\n',
    '            "aircraftCarriers": 0,\n',
    '            "submarines": 4,\n',
    '            "destroyers": 0,\n',
    '            "frigates": 12,\n',
    '            "corvettes": 0,\n',
    '            "patrolVessels": 12,\n',
    '            "merchantMarine": 200,\n',
    '            "majorPorts": 10\n',
    '        },\n',
    '        "airforce": {\n',
    '            "totalAircraft": 390,\n',
    '            "fighters": 79,\n',
    '            "attackAircraft": 0,\n',
    '            "transports": 30,\n',
    '            "trainers": 100,\n',
    '            "specialMission": 29,\n',
    '            "tankerFleet": 8,\n',
    '            "helicopters": 137,\n',
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

# Find CAN start
for i, line in enumerate(lines):
    if '"CAN": {' in line:
        start_idx = i
        break

if start_idx != -1:
    # Find CAN end (start of ARG)
    for i in range(start_idx + 1, len(lines)):
        if '"ARG": {' in line: # No, ARG might not be next if file is disordered
             pass
        # Just find the matching brace for CAN
        # But CAN is corrupted (might have extra braces or missing ones)
        # We know ARG follows CAN in rank order (27 -> 28).
        # And in Step 3373, ARG is at 1033.
        # So we can search for ARG.
        if '"ARG": {' in lines[i]:
            end_idx = i
            break
            
    if end_idx == -1:
        # Try to find matching brace
        brace_count = 1
        for i in range(start_idx + 1, len(lines)):
            if '{' in lines[i]: brace_count += lines[i].count('{')
            if '}' in lines[i]: brace_count -= lines[i].count('}')
            if brace_count == 0:
                end_idx = i + 1
                break

if start_idx != -1 and end_idx != -1:
    print(f"Replacing CAN at {start_idx} to {end_idx}")
    new_lines = lines[:start_idx] + can_data + lines[end_idx:]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Successfully fixed CAN.")
else:
    print(f"Error: Could not find CAN block. Start: {start_idx}, End: {end_idx}")
