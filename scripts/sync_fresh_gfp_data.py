import json
import re
import os

mock_path = '../src/lib/mockData.ts'
fresh_data_path = 'gfp_complete_fresh.json'

def normalize(s):
    return s.lower().strip().replace('-', '')

def main():
    if not os.path.exists(fresh_data_path):
        print(f"Error: {fresh_data_path} not found.")
        return

    with open(fresh_data_path, 'r', encoding='utf-8') as f:
        fresh_data = json.load(f)
        
    with open(mock_path, 'r', encoding='utf-8') as f:
        content = f.read()

    print(f"Loaded fresh data for {len(fresh_data)} countries.")

    # Mapping Logic
    # 1. ID Map (mock -> fresh_key)
    # We'll build a reverse map from Fresh Keys to standardized
    
    # Fresh keys might be "USA" or "united-states-of-america"
    # We want to map mock ID (e.g. 'usa') to the fresh entry
    
    # Build lookup tables for fresh data
    fresh_by_id_upper = {} 
    fresh_by_slug = {}
    
    for k, v in fresh_data.items():
        # k could be "USA" or "united-states-of-america"
        # The value v has "slug" and "id" potentially
        slug = v.get("slug", "").lower()
        id_code = v.get("id", "").upper()
        
        if id_code:
            fresh_by_id_upper[id_code] = v
        if slug:
            fresh_by_slug[slug] = v
        
        # Also map the key itself if it looks like a slug or ID
        if len(k) == 3:
            fresh_by_id_upper[k.upper()] = v
        else:
            fresh_by_slug[k.lower()] = v

    # Mock Data Parsing
    matches = re.finditer(r'id:\s*"([^"]+)"', content)
    updated_count = 0
    
    # Custom Map (from audit)
    custom_map = {
        "sko": "SKO", "ukd": "UKD", "tky": "TKY", "ino": "INO", "ger": "GER", 
        "spn": "SPN", "vet": "VET", "sar": "SAR", "thl": "THL", "alg": "ALG",
        "sng": "SNG", "gre": "GRE", "phi": "PHL", "swi": "SWZ",
        "ban": "BNG", "ned": "NTH", "cze": "CZC", "nze": "NWZ", "uae": "UAE",
        "aze": "AZR", "mal": "MLY", "can": "CAN", "saf": "SAF",
        "mac": "MAC", "bos": "BOS", "dr": "DOM"
    }

    # Categories to sync
    categories = ["army", "navy", "airforce"]

    for match in matches:
        mock_id = match.group(1)
        target_data = None
        
        # Strategy 1: Custom Map -> ID Lookup
        if mock_id in custom_map:
            target_id = custom_map[mock_id]
            target_data = fresh_by_id_upper.get(target_id)
            
        # Strategy 2: Direct ID Match (upper)
        if not target_data:
            target_data = fresh_by_id_upper.get(mock_id.upper())
            
        # Strategy 3: Slug Match (approximate)
        if not target_data:
            # Try to guess slug? Hard without name.
            # But we can try normalized ID match against known slugs? Unlikely.
            pass
            
        if not target_data:
            # print(f"Skipping {mock_id} (No match in fresh data)")
            continue
            
        if not target_data: continue
            
        # Perform Update
        country_changed = False
        
        for cat in categories:
            if cat not in target_data: continue
            
            fresh_cat = target_data[cat]
            if not fresh_cat: continue
            
            for field, fresh_val in fresh_cat.items():
                if fresh_val is None: continue # Skip if scrape failed for this field
                
                # Regex Update
                # Only update if value matches reasonable pattern? 
                # fresh_val is int
                
                pattern = rf'(id:\s*"{mock_id}".*?{cat}:\s*\{{.*?{field}:\s*)(\d+)(,?)'
                
                m = re.search(pattern, content, flags=re.DOTALL)
                if m:
                    current_val = int(m.group(2))
                    if current_val != fresh_val:
                        # Diff
                        if abs(current_val - fresh_val) > 0:
                             print(f"  [{mock_id}] {cat}.{field}: {current_val} -> {fresh_val}")
                             
                        replacement = rf'\g<1>{fresh_val}\g<3>'
                        new_content = re.sub(pattern, replacement, content, count=1, flags=re.DOTALL)
                        if new_content != content:
                            content = new_content
                            country_changed = True
        
        if country_changed:
            updated_count += 1
            # print(f"Updated {mock_id}")

    # Write Back
    if updated_count > 0:
        with open(mock_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully synced data for {updated_count} countries.")
    else:
        print("No changes needed. All data is up to date.")

if __name__ == "__main__":
    main()
