
file_path = 'c:/shin_working/war/military-platform/scripts/complete_military_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Remove line 685 (index 684)
# Verify content first
if '},' in lines[684]:
    print(f"Removing line 685: {lines[684].rstrip()}")
    lines.pop(684)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Successfully removed line.")
else:
    print(f"Line 685 mismatch: {lines[684].rstrip()}")
