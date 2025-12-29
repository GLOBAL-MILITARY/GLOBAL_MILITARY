
import json
import re

file_path = 'c:/shin_working/war/military-platform/scripts/complete_military_data.json'

def extract_country_data(lines, key, start_search_line=0):
    """Extracts lines for a country key."""
    start_idx = -1
    end_idx = -1
    brace_count = 0
    
    for i in range(start_search_line, len(lines)):
        if f'"{key}": {{' in lines[i]:
            start_idx = i
            brace_count = 1
            break
            
    if start_idx == -1:
        return None
        
    for i in range(start_idx + 1, len(lines)):
        if '{' in lines[i]:
            brace_count += lines[i].count('{')
        if '}' in lines[i]:
            brace_count -= lines[i].count('}')
            
        if brace_count == 0:
            end_idx = i
            break
            
    if end_idx != -1:
        # Return lines including key and closing brace, with trailing comma if present
        # We will strip trailing comma later when assembling
        return lines[start_idx:end_idx+1]
    return None

def extract_ukr_data(lines, start_line, end_line):
    """Extracts UKR data which is missing the key."""
    # Exclude the last line (closing brace of the unnamed object)
    # start_line is 919 ("army": {), end_line is 955 (},)
    # We want 919 to 954 (inclusive)
    data_lines = lines[start_line:end_line] 
    # Indent data lines
    indented_lines = ['    ' + line for line in data_lines]
    return ['    "UKR": {\n'] + indented_lines + ['    },\n']

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Extract data (search from 0)
ino_data = extract_country_data(lines, "INO", 0)
irn_data = extract_country_data(lines, "IRN", 0)
ger_data = extract_country_data(lines, "GER", 0)
isr_data = extract_country_data(lines, "ISR", 0)
esp_data = extract_country_data(lines, "ESP", 0)

# Hardcode EGY, AUS, UKR
egy_data = [
    '    "EGY": {\n',
    '        "army": {\n',
    '            "activePersonnel": 440000,\n',
    '            "reservePersonnel": 480000,\n',
    '            "tanks": 4500,\n',
    '            "afv": 10000,\n',
    '            "selfPropelledArtillery": 1200,\n',
    '            "towedArtillery": 2000,\n',
    '            "rocketProjectors": 1100\n',
    '        },\n',
    '        "navy": {\n',
    '            "totalShips": 320,\n',
    '            "aircraftCarriers": 2,\n',
    '            "submarines": 8,\n',
    '            "destroyers": 0,\n',
    '            "frigates": 13,\n',
    '            "corvettes": 7,\n',
    '            "patrolVessels": 50,\n',
    '            "merchantMarine": 400,\n',
    '            "majorPorts": 10\n',
    '        },\n',
    '        "airforce": {\n',
    '            "totalAircraft": 1065,\n',
    '            "fighters": 250,\n',
    '            "attackAircraft": 88,\n',
    '            "transports": 59,\n',
    '            "trainers": 341,\n',
    '            "specialMission": 11,\n',
    '            "tankerFleet": 0,\n',
    '            "helicopters": 304,\n',
    '            "attackHelicopters": 91,\n',
    '            "bombers": 0\n',
    '        },\n',
    '        "nuclear": {\n',
    '            "hasNuclear": false,\n',
    '            "stockpile": 0\n',
    '        }\n',
    '    },\n'
]

aus_data = [
    '    "AUS": {\n',
    '        "army": {\n',
    '            "activePersonnel": 60000,\n',
    '            "reservePersonnel": 30000,\n',
    '            "tanks": 59,\n',
    '            "afv": 1500,\n',
    '            "selfPropelledArtillery": 0,\n',
    '            "towedArtillery": 54,\n',
    '            "rocketProjectors": 0\n',
    '        },\n',
    '        "navy": {\n',
    '            "totalShips": 43,\n',
    '            "aircraftCarriers": 2,\n',
    '            "submarines": 6,\n',
    '            "destroyers": 3,\n',
    '            "frigates": 8,\n',
    '            "corvettes": 0,\n',
    '            "patrolVessels": 14,\n',
    '            "merchantMarine": 500,\n',
    '            "majorPorts": 10\n',
    '        },\n',
    '        "airforce": {\n',
    '            "totalAircraft": 279,\n',
    '            "fighters": 96,\n',
    '            "attackAircraft": 12,\n',
    '            "transports": 40,\n',
    '            "trainers": 80,\n',
    '            "specialMission": 25,\n',
    '            "tankerFleet": 7,\n',
    '            "helicopters": 100,\n',
    '            "attackHelicopters": 22,\n',
    '            "bombers": 0\n',
    '        },\n',
    '        "nuclear": {\n',
    '            "hasNuclear": false,\n',
    '            "stockpile": 0\n',
    '        }\n',
    '    },\n'
]

ukr_data = [
    '    "UKR": {\n',
    '        "army": {\n',
    '            "activePersonnel": 900000,\n',
    '            "reservePersonnel": 1000000,\n',
    '            "tanks": 1100,\n',
    '            "afv": 10000,\n',
    '            "selfPropelledArtillery": 1000,\n',
    '            "towedArtillery": 1000,\n',
    '            "rocketProjectors": 500\n',
    '        },\n',
    '        "navy": {\n',
    '            "totalShips": 20,\n',
    '            "aircraftCarriers": 0,\n',
    '            "submarines": 0,\n',
    '            "destroyers": 0,\n',
    '            "frigates": 0,\n',
    '            "corvettes": 2,\n',
    '            "patrolVessels": 20,\n',
    '            "merchantMarine": 100,\n',
    '            "majorPorts": 5\n',
    '        },\n',
    '        "airforce": {\n',
    '            "totalAircraft": 192,\n',
    '            "fighters": 80,\n',
    '            "attackAircraft": 30,\n',
    '            "transports": 20,\n',
    '            "trainers": 40,\n',
    '            "specialMission": 5,\n',
    '            "tankerFleet": 0,\n',
    '            "helicopters": 100,\n',
    '            "attackHelicopters": 30,\n',
    '            "bombers": 0\n',
    '        },\n',
    '        "nuclear": {\n',
    '            "hasNuclear": false,\n',
    '            "stockpile": 0\n',
    '        }\n',
    '    },\n'
]

# Verify all data found
missing = []
if not ino_data: missing.append("INO")
if not irn_data: missing.append("IRN")
if not ger_data: missing.append("GER")
if not isr_data: missing.append("ISR")
if not esp_data: missing.append("ESP")

if missing:
    print(f"Error: Missing data for {missing}")
    exit(1)

# Clean up trailing commas
def clean_block(block_lines):
    # Ensure the last line is "    }," or "    }"
    last_line = block_lines[-1].rstrip()
    if last_line.endswith(','):
        block_lines[-1] = last_line[:-1] + '\n'
    # Add comma for all except last in sequence
    return block_lines

# Sequence: INO, IRN, EGY, AUS, ISR, UKR, GER, ESP
sequence = [
    ("INO", clean_block(ino_data)),
    ("IRN", clean_block(irn_data)),
    ("EGY", clean_block(egy_data)),
    ("AUS", clean_block(aus_data)),
    ("ISR", clean_block(isr_data)),
    ("UKR", clean_block(ukr_data)),
    ("GER", clean_block(ger_data)),
    ("ESP", clean_block(esp_data))
]

# Add commas to all except ESP
new_block = []
for i, (name, data) in enumerate(sequence):
    # Ensure last line has comma if not last country
    if i < len(sequence) - 1:
        if not data[-1].strip().endswith(','):
            data[-1] = data[-1].rstrip() + ',\n'
    else:
        # Last country (ESP), ensure NO comma
        if data[-1].strip().endswith(','):
            data[-1] = data[-1].rstrip()[:-1] + '\n'
            
    new_block.extend(data)

# Add comma to ESP because POL follows
new_block[-1] = new_block[-1].rstrip() + ',\n'

# Target replacement range
# Start: After PAK (line 457 -> index 457)
# End: Before POL (line 957 -> index 956)
# But line numbers might have shifted if I ran script before.
# I should find PAK end and POL start dynamically.

start_replace_idx = -1
end_replace_idx = -1

# Find PAK end
for i in range(len(lines)):
    if '"PAK": {' in lines[i]:
        # Find closing brace of PAK
        brace_count = 0
        for j in range(i, len(lines)):
            if '{' in lines[j]: brace_count += lines[j].count('{')
            if '}' in lines[j]: brace_count -= lines[j].count('}')
            if brace_count == 0:
                start_replace_idx = j + 1
                break
        break

# Find POL start
for i in range(len(lines)):
    if '"POL": {' in lines[i]:
        end_replace_idx = i
        break

if start_replace_idx == -1 or end_replace_idx == -1:
    print(f"Error: Could not find replacement range. PAK end: {start_replace_idx}, POL start: {end_replace_idx}")
    exit(1)

print(f"Replacing lines {start_replace_idx} to {end_replace_idx}")

# Construct new lines
final_lines = lines[:start_replace_idx] + new_block + lines[end_replace_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(final_lines)

print("Successfully reconstructed block.")

