
import re

file_path = 'c:/shin_working/war/military-platform/scripts/complete_military_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

countries = []
for i, line in enumerate(lines):
    match = re.search(r'^\s*"([A-Z]{3})": \{', line)
    if match:
        countries.append((match.group(1), i + 1))

print(f"Found {len(countries)} countries:")
for c, line_num in countries:
    print(f"{c} at line {line_num}")
