
import re

file_path = 'c:/shin_working/war/military-platform/scripts/complete_military_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern: "bombers": 0, followed by closing brace and newline
# This is an illegal trailing comma
pattern = r'("bombers":\s*0),(\s*\n\s*\})'

# Find all matches
matches = list(re.finditer(pattern, content))
print(f"Found {len(matches)} trailing comma errors")

# Fix by removing the comma
fixed_content = re.sub(pattern, r'\1\2', content)

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(fixed_content)

print(f"Fixed {len(matches)} trailing comma errors")
