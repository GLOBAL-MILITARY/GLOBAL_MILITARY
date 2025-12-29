
import json
import sys

file_path = 'c:/shin_working/war/military-platform/scripts/complete_military_data.json'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    print(f"Success! Keys: {len(data.keys())}")
except json.JSONDecodeError as e:
    print(f"JSON Error: {e}")
    print(f"Line: {e.lineno}, Column: {e.colno}")
    # Print context
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        start = max(0, e.lineno - 5)
        end = min(len(lines), e.lineno + 5)
        for i in range(start, end):
            prefix = ">> " if i + 1 == e.lineno else "   "
            print(f"{prefix}{i+1}: {lines[i].rstrip()}")
except Exception as e:
    print(f"Error: {e}")
