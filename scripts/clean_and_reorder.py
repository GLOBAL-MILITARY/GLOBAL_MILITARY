
import json
import re

file_path = 'c:/shin_working/war/military-platform/scripts/complete_military_data.json'

# Rank order 1-30
rank_order = [
    "USA", "RUS", "CHN", "IND", "KOR", "GBR", "JPN", "TUR", "PAK", "ITA",
    "FRA", "BRA", "INO", "IRN", "EGY", "AUS", "ISR", "UKR", "GER", "ESP",
    "POL", "VNM", "SAU", "TWN", "THA", "ALG", "CAN", "ARG", "SWE", "SGP"
]

# Map VIE to VNM if needed, but we prefer VNM
alias_map = {
    "VIE": "VNM"
}

def extract_all_countries(lines):
    countries = {}
    current_key = None
    current_lines = []
    brace_count = 0
    
    for i, line in enumerate(lines):
        # Check for start of country block
        match = re.search(r'^\s*"([A-Z]{3})": \{', line)
        if match:
            # If we were processing a country, save it (unless it was nested/broken)
            if current_key:
                # This shouldn't happen in valid JSON if we track braces correctly
                # But file is broken.
                # If we find a new key while brace_count > 0, it means nesting or missing closing brace.
                # We will assume the previous block ended or is garbage.
                # But we want to save what we have if it looks complete?
                # No, let's trust brace counting.
                pass
            
            current_key = match.group(1)
            current_lines = [line]
            brace_count = 1
            continue
            
        if current_key:
            current_lines.append(line)
            if '{' in line:
                brace_count += line.count('{')
            if '}' in line:
                brace_count -= line.count('}')
            
            if brace_count == 0:
                # End of block
                # Check if we already have this country
                # We prefer the FIRST occurrence, UNLESS it's one of the ones we just inserted/fixed?
                # Actually, the file has duplicates.
                # My inserted VNM/SAU are at 800.
                # Original duplicates are later.
                # So first occurrence is good.
                
                # Handle alias
                key = alias_map.get(current_key, current_key)
                
                if key not in countries:
                    # Clean trailing comma from last line
                    last_line = current_lines[-1].rstrip()
                    if last_line.endswith(','):
                        current_lines[-1] = last_line[:-1] + '\n'
                    countries[key] = current_lines
                
                current_key = None
                current_lines = []

    return countries

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

countries = extract_all_countries(lines)

# Construct new file content
new_lines = ['{\n']

# Add ranked countries first
processed_keys = set()

for key in rank_order:
    if key in countries:
        # Add comma to previous block if needed
        if len(new_lines) > 1:
             # Check last line of previous block
             last_line = new_lines[-1].rstrip()
             if not last_line.endswith(','):
                 new_lines[-1] = last_line + ',\n'
        
        new_lines.extend(countries[key])
        processed_keys.add(key)
    else:
        print(f"Warning: Rank {key} not found in file.")

# Add remaining countries in order of appearance (from extract_all_countries? No, dict is unordered in older python, but ordered in 3.7+)
# We iterate through the keys found in file order (we need to preserve extraction order)
# Let's re-extract keys in order
ordered_keys = []
for line in lines:
    match = re.search(r'^\s*"([A-Z]{3})": \{', line)
    if match:
        key = match.group(1)
        key = alias_map.get(key, key)
        if key not in ordered_keys:
            ordered_keys.append(key)

for key in ordered_keys:
    if key not in processed_keys and key in countries:
        # Add comma to previous block
        if len(new_lines) > 1:
             last_line = new_lines[-1].rstrip()
             if not last_line.endswith(','):
                 new_lines[-1] = last_line + ',\n'
                 
        new_lines.extend(countries[key])
        processed_keys.add(key)

# Remove comma from very last line
if len(new_lines) > 1:
    last_line = new_lines[-1].rstrip()
    if last_line.endswith(','):
        new_lines[-1] = last_line[:-1] + '\n'

new_lines.append('}\n')

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Successfully cleaned and reordered {len(processed_keys)} countries.")
