import json
import random

def generate_tactics():
    # Load military data (source of truth for tech levels and assets)
    # We will try to parse mockData.ts or just rely on complete_military_data.json and the modernization levels we know
    
    # For simplicity, we will reuse the tech map logic from the other script or just re-define the tech map here to ensure consistency
    tech_map = {
        "usa": 10, "chn": 9, "gbr": 9, "fra": 9, "jpn": 9, "isr": 9, "sko": 9, "deu": 9, "ita": 9, "aus": 9, "swe": 9, "nor": 9, "nld": 9, "sgp": 9,
        "rus": 8, "tur": 8, "pol": 8, "can": 8, "esp": 8, "fin": 8, "uae": 8, "sau": 8, "twn": 8, "qat": 8, "dnk": 8, "che": 8, "bel": 8,
        "ind": 7, "bra": 7, "idn": 7, "tha": 7, "egy": 7, "pak": 7, "grc": 7, "cze": 7, "prt": 7, "rou": 7, "mys": 7, "chl": 7, "vnm": 7,
        "ukr": 6, "irn": 6, "dza": 6, "mar": 6, "kaz": 6, "azr": 6, "bgd": 6, "phl": 6, "col": 6, "mex": 6, "arg": 6, "zaf": 6, "per": 6, "kwt": 6, "oma": 6, "hun": 6, "svk": 6, "hrv": 6, "bgr": 6, "srb": 6, "aut": 6,
        "nko": 5, "syr": 5, "irq": 5, "cub": 5, "ven": 5, "blr": 5, "mmr": 5, "lby": 5, "yem": 5, "jor": 5, "uzb": 5, "tkm": 5, "ang": 5, "nga": 5, "eth": 5, "ecu": 5,
        "sdn": 4, "cod": 4, "som": 4, "afg": 4, "mli": 4, "hti": 4, "khm": 4, "lao": 4, "lbn": 4, "nic": 4, "bol": 4, "pry": 4, "uru": 4, "dom": 4, "gtm": 4, "hnd": 4, "tjk": 4, "kgz": 4, "geo": 4, "arm": 4,
        "zmb": 3, "zwe": 3, "tza": 3, "cmr": 3, "uga": 3, "nam": 3, "moz": 3, "ken": 3, "sen": 3, "civ": 3, "bfa": 3, "mrt": 3, "mad": 3, "gab": 3, "cog": 3, "ssd": 3, "eri": 3, "bdi": 3, "ben": 3, "bwa": 3, "mne": 3, "mkd": 3, "alb": 3, "bih": 3, "lva": 3, "est": 3, "ltu": 3, "lux": 3, "nzl": 3, "lka": 3, "npl": 3,
        "caf": 2, "lbr": 2, "sle": 2, "car": 2, "isl": 2, "pan": 2, "blz": 2, "sur": 2, "btn": 2, "kos": 2, "slv": 2, "gin": 2, "gmb": 2, "gwn": 2, "eqg": 2, "dji": 2, "tgo": 2, "swz": 2, "lso": 2,
        
        # Mapping variations
        "ukd": 9, "kor": 9, "sk": 9, "tky": 8, "sar": 8, "thl": 7, "alg": 6, "saf": 6, "vet": 7, "por": 7, "rom": 7, "gre": 7, "nth": 9, "mya": 5, "swz": 8, "den": 8, "chi": 7, "czc": 7, "uae": 8, "hun": 6, "ang": 5, "kaz": 6, "uzb": 5, "mor": 6, "azr": 6, "bel": 8, "bul": 6, "srb": 6, "syr": 5, "ecu": 5, "drc": 4, "cub": 5, "ast": 6, "srl": 3, "blr": 5, "slk": 6, "qtr": 8, "sdn": 4, "cro": 6, "jor": 5, "lby": 5, "tkm": 5, "alb": 3, "kuw": 6, "bol": 4, "bah": 6, "oma": 6, "ken": 3, "chd": 3, "yem": 5, "nwz": 3, "par": 4, "lit": 3, "moz": 3, "tun": 5, "arm": 4, "tnz": 3, "cam": 3, "geo": 4, "cmb": 4, "sln": 6, "ire": 6, "mgl": 4, "lat": 3, "uru": 4, "hon": 4, "ivc": 3, "gua": 4, "mal": 4, "kyr": 4, "lao": 4, "est": 3, "tjk": 4, "zam": 3, "gha": 3, "zim": 3, "mac": 3, "ssd": 3, "uga": 3, "leb": 4, "nam": 3, "lux": 3, "afg": 4, "ngr": 4, "eri": 3, "roc": 3, "bot": 3, "mau": 3, "dom": 4, "sen": 3, "nep": 3, "mtn": 3, "esl": 2, "bkf": 3, "mad": 3, "nic": 4, "bos": 3, "gab": 3, "mol": 3, "ice": 2, "pan": 2, "blz": 2, "lib": 2, "srn": 2, "sle": 2, "kos": 2, "som": 4, "car": 2, "ben": 3, "but": 2
    }

    # Tactic Templates
    
    # -- HIGH TECH (Lv 8-10) --
    high_tech_offense = [
        ("Precision Global Strike", "Satellites guide cruise missiles to decapitate enemy C2."),
        ("Stealth Air Dominance", "5th Gen fighters clear skies before conflict begins."),
        ("Drone Swarm Assault", "AI-coordinated drone swarms overwhelm air defenses."),
        ("Network Centric Warfare", "Real-time data fusion optimizes all unit actions."),
        ("Hypersonic Missile Strike", "Mach 5+ missiles bypass all interceptors."),
        ("Space-Based Intel", "Real-time satellite feeds reveal all enemy movements.")
    ]
    high_tech_defense = [
        ("Integrated Air Defense", "Multi-layered missile shield (Patriot/S-400/Iron Dome)."),
        ("Electronic Countermeasures", "Jamming renders enemy smart weapons useless."),
        ("Active Protection Systems", "Tanks auto-intercept incoming projectiles."),
        ("Cyber Firewall", "Military networks are hardened against digital intrusion.")
    ]

    # -- MID TECH (Lv 5-7) --
    mid_tech_offense = [
        ("Combined Arms Push", "Tanks, infantry, and artillery advance in unison."),
        ("Deep Battle Doctrine", "Strike rear logistics to starve the front line."),
        ("Artillery Saturation", "Massive shelling levels the grid square."),
        ("Air-Land Battle", "Close air support coordinates with ground maneuvers."),
        ("Spearhead Breakthrough", "Elite armored units punch through weak points.")
    ]
    mid_tech_defense = [
        ("Defense in Depth", "Multiple defensive lines exhaust the attacker."),
        ("Mobile Reserve", "Quick reaction forces plug gaps in the line."),
        ("Scorched Earth", "Destroy infrastructure to deny enemy use."),
        ("Urban Fortress", "Cities are fortified into defensive strongholds.")
    ]

    # -- LOW TECH (Lv 1-4) --
    low_tech_offense = [
        ("Human Wave Attack", "Overwhelm defenders with sheer numbers."),
        ("Technical Raid", "Pickup trucks with heavy MGs hit and run."),
        ("Infiltration Tactics", "Small units bypass front lines to cause chaos."),
        ("Tunnel Warfare", "Underground networks allowing surprise attacks.")
    ]
    low_tech_defense = [
        ("Asymmetric Warfare", "IEDs and ambushes bleed the superior enemy."),
        ("Guerilla Resistance", "Militias blend into the civilian population."),
        ("Terrain Utilization", "Use mountains/jungles to negate tech advantage."),
        ("Attritional Defense", "Trade space for time, inflicting maximum casualties.")
    ]

    # -- SPECIAL CATEGORIES --
    naval_tactics = [
        ("Carrier Strike Group", "Project air power anywhere from the sea."),
        ("Submarine Wolfpack", "Deny enemy shipping lanes."),
        ("Amphibious Assault", "Marine landing force seizes coastal objectives."),
        ("Coastal Blockade", "Starve the enemy economy via naval siege.")
    ]
    nuclear_tactics = [
        ("Strategic Deterrence", "Threat of annihilation prevents total war."),
        ("Tactical Nuke Strike", "Low-yield warhead destroys enemy concentration."),
        ("Dead Hand System", "Automated retaliation ensures mutual destruction.")
    ]

    # Generate 145 countries list (full ID set)
    all_ids = set(tech_map.keys())
    
    output_ts = 'export interface Tactic { id: string; name: string; description: string; mode: "OFFENSE" | "DEFENSE" | "SPECIAL"; techReq: number; }\n\n'
    output_ts += 'export const tacticsData: Record<string, Tactic[]> = {\n'

    for cid in sorted(all_ids):
        level = tech_map.get(cid, 3) 
        
        tactics = []
        
        # 1. Tech Based Allocation
        if level >= 8:
            # High Tech Nation
            pool_off = high_tech_offense + mid_tech_offense
            pool_def = high_tech_defense + mid_tech_defense
        elif level >= 5:
            # Mid Tech Nation
            pool_off = mid_tech_offense + low_tech_offense[:2]
            pool_def = mid_tech_defense + low_tech_defense[:2]
        else:
            # Low Tech Nation
            pool_off = low_tech_offense
            pool_def = low_tech_defense
            
        # 2. Assign Base Tactics (Random selection for variety, but ensure core ones present)
        # We want 10-50 per country. Let's aim for ~15 unique ones for now to keep file size managed but meets requirement "10-50".
        
        count = 0
        
        # Offense
        for name, desc in pool_off:
            tactics.append(f'{{ id: "off_{count}", name: "{name}", description: "{desc}", mode: "OFFENSE", techReq: {level} }}')
            count += 1
            
        # Defense
        for name, desc in pool_def:
            tactics.append(f'{{ id: "def_{count}", name: "{name}", description: "{desc}", mode: "DEFENSE", techReq: {level} }}')
            count += 1
            
        # 3. Special Tactics
        # Naval (Simple heuristic: if level >= 6 assume some navy, or specific naval powers)
        naval_powers = ["usa", "chn", "rus", "gbr", "fra", "jpn", "ind", "ita", "esp", "aus", "bra", "kor"] # Simplified list
        if cid in naval_powers or level >= 8:
            for name, desc in naval_tactics:
                tactics.append(f'{{ id: "spec_{count}", name: "{name}", description: "{desc}", mode: "SPECIAL", techReq: {level} }}')
                count += 1
                
        # Nuclear
        nuke_powers = ["usa", "rus", "chn", "fra", "gbr", "ind", "pak", "nko", "isr"]
        if cid in nuke_powers:
            for name, desc in nuclear_tactics:
                tactics.append(f'{{ id: "nuke_{count}", name: "{name}", description: "{desc}", mode: "SPECIAL", techReq: {level} }}')
                count += 1

        # Format into JS array
        tactics_str = ",\n        ".join(tactics)
        output_ts += f'    "{cid}": [\n        {tactics_str}\n    ],\n'

    output_ts += '};\n'
    
    with open("src/lib/tacticsData.ts", "w", encoding="utf-8") as f:
        f.write(output_ts)
        
    print(f"Generated tactics for {len(all_ids)} countries.")

if __name__ == "__main__":
    generate_tactics()
