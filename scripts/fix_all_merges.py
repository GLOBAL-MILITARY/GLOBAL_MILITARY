
import re

file_path = 'c:/shin_working/war/military-platform/scripts/complete_military_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern: bombers": 0 followed by "specialMission" without a comma
# This indicates merged airforce data
pattern = r'("bombers":\s*0)\s*\n\s*("specialMission":\s*\d+,\s*\n\s*"tankerFleet":\s*\d+,\s*\n\s*"helicopters":\s*\d+,\s*\n\s*"attackHelicopters":\s*\d+,\s*\n\s*"bombers":\s*0)'

# Find all matches
matches = list(re.finditer(pattern, content))
print(f"Found {len(matches)} merge errors")

# Fix by adding comma after first bombers and removing duplicate block
def fix_match(match):
    # Add comma after first bombers, remove the duplicate block
    return match.group(1) + ','

fixed_content = re.sub(pattern, fix_match, content)

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(fixed_content)

print(f"Fixed {len(matches)} merge errors")
