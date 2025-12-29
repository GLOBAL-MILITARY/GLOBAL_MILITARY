import json

with open('complete_military_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    print("Keys in complete_military_data.json:")
    print(list(data.keys()))
