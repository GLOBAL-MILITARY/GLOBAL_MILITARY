import re
import json

def parse_tactics(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    tactics_data = []
    
    current_personality = None
    current_scenario = None
    
    # Mappings
    personality_map = {
        "Offensive": "OFFENSIVE",
        "Defensive": "DEFENSIVE",
        "Neutral": "NEUTRAL"
    }
    
    # Map from Korean keyword to Scenario Enum
    scenario_map_korean = {
        "총력전": "TOTAL_WAR",
        "해상봉쇄": "NAVAL_BLOCKADE",
        "국경전": "BORDER_SKIRMISH",
        "하늘위주": "AIR_SUPERIORITY"
    }

    # Regex patterns
    # Personality: [1] 공격적 성향 (Offensive)
    personality_pattern = re.compile(r'\[(\d+)\] .*? \((.*?)\)')
    
    # Scenario: 1-1. 총력전 (Total War) OR 2-3. 국경전 (Defensive) etc.
    # We trust the Korean part more.
    scenario_pattern = re.compile(r'\d+-\d+\.\s*(.*?)\s*\(')
    
    # Tactic: Name: Description
    tactic_pattern = re.compile(r'(.*?):\s*(.*)')

    for line in lines:
        line = line.strip()
        if not line:
            continue

        # Check for Personality Header
        p_match = personality_pattern.match(line)
        if p_match:
            raw_p = p_match.group(2)
            current_personality = personality_map.get(raw_p)
            continue

        # Check for Scenario Header
        s_match = scenario_pattern.match(line)
        if s_match:
            raw_s_korean = s_match.group(1).strip()
            # Find which key is in the raw korean string
            for k, v in scenario_map_korean.items():
                if k in raw_s_korean:
                    current_scenario = v
                    break
            continue

        # Check for Tactic
        t_match = tactic_pattern.match(line)
        if t_match:
            name = t_match.group(1).strip()
            desc = t_match.group(2).strip()
            
            # Simple heuristic to avoid headers being parsed as tactics if they have a colon (unlikely based on format)
            if re.match(r'\d', name): 
                # Avoid accidentally parsing something starting with numbers if it's not a tactic? 
                # Actually headers start with numbers like 1-1. 
                # But headers don't strictly have ": " structure usually? 
                # Let's trust the structure.
                pass

            if current_personality and current_scenario:
                # IMPORTANT: Skip if it looks like a header (e.g. "1-1. ...")
                if re.match(r'\d+-\d+\.', name):
                    continue
                    
                tactics_data.append({
                    "personality": current_personality,
                    "scenario": current_scenario,
                    "name": name,
                    "description": desc,
                    "id": f"{current_personality}_{current_scenario}_{len(tactics_data)}".lower()
                })

    return tactics_data

if __name__ == "__main__":
    data = parse_tactics("c:/shin_working/war/military-platform/scripts/tactics_raw.txt")
    with open("c:/shin_working/war/military-platform/scripts/tactics.json", "w", encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Parsed {len(data)} tactics.")
