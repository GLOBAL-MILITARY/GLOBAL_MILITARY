
import json
import shutil
from datetime import datetime

# 백업 생성
file_path = 'c:/shin_working/war/military-platform/scripts/complete_military_data.json'
backup_path = f'c:/shin_working/war/military-platform/scripts/complete_military_data_backup_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'

shutil.copy(file_path, backup_path)
print(f"Backup created: {backup_path}")

# 원본 파일 읽기
with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# 유지할 항목 정의
keep_fields = {
    'army': ['activePersonnel', 'tanks'],
    'navy': ['totalShips', 'aircraftCarriers', 'submarines'],
    'airforce': ['totalAircraft', 'fighters', 'helicopters'],
    'nuclear': ['hasNuclear', 'stockpile']
}

# 각 국가 데이터 단순화
simplified_data = {}
for country_code, country_data in data.items():
    simplified_country = {}
    
    for category, fields in keep_fields.items():
        if category in country_data:
            simplified_category = {}
            for field in fields:
                if field in country_data[category]:
                    simplified_category[field] = country_data[category][field]
            simplified_country[category] = simplified_category
    
    simplified_data[country_code] = simplified_country

# 단순화된 데이터 저장
with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(simplified_data, f, indent=4, ensure_ascii=False)

print(f"Simplified data saved. Countries: {len(simplified_data)}")
print(f"Fields per country reduced from 27 to 10")
