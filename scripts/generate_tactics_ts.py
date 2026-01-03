import json

def generate_ts(json_path, ts_path):
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    ts_content = """export type PersonalityType = "OFFENSIVE" | "DEFENSIVE" | "NEUTRAL";
export type ScenarioType = "TOTAL_WAR" | "NAVAL_BLOCKADE" | "AIR_SUPERIORITY" | "BORDER_SKIRMISH";

export interface Tactic {
    id: string;
    name: string;
    description: string;
    personality: PersonalityType;
    scenario: ScenarioType;
}

export const ALL_TACTICS: Tactic[] = [
"""

    for item in data:
        # Create a TS object string
        # Ensure strings are quoted
        ts_content += "    {\n"
        ts_content += f'        id: "{item["id"]}",\n'
        ts_content += f'        name: "{item["name"]}",\n'
        ts_content += f'        description: "{item["description"]}",\n'
        ts_content += f'        personality: "{item["personality"]}",\n'
        ts_content += f'        scenario: "{item["scenario"]}"\n'
        ts_content += "    },\n"

    ts_content += "];\n"

    with open(ts_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)

if __name__ == "__main__":
    generate_ts(
        "c:/shin_working/war/military-platform/scripts/tactics.json",
        "c:/shin_working/war/military-platform/src/lib/tacticsData.ts"
    )
