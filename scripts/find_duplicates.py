import re
from collections import Counter

file_path = r'c:\shin_working\war\military-platform\src\lib\countryDetails.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Regex to find keys like "ABC": {
keys = re.findall(r'"([A-Z]{3})":\s*{', content)

counts = Counter(keys)

duplicates = {k: v for k, v in counts.items() if v > 1}

if duplicates:
    print("Found duplicates:")
    for k, v in duplicates.items():
        print(f"{k}: {v}")
else:
    print("No duplicates found.")
