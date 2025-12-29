import json
import re
import os

def generate_mock_data():
    # Read rankingData.ts
    try:
        with open("src/lib/rankingData.ts", "r", encoding="utf-8") as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading rankingData.ts: {e}")
        return

    # Load cached military data
    military_data = {}
    if os.path.exists("scripts/complete_military_data.json"):
        try:
            with open("scripts/complete_military_data.json", "r", encoding="utf-8") as f:
                military_data = json.load(f)
            print(f"Loaded military data for {len(military_data)} countries from complete dataset")
        except Exception as e:
            print(f"Error reading military cache: {e}")
    else:
        print("Warning: complete_military_data.json not found")
    
    # Load relations data
    relations_data = {}
    if os.path.exists("scripts/relations_data.json"):
        try:
            with open("scripts/relations_data.json", "r", encoding="utf-8") as f:
                relations_data = json.load(f)
            print(f"Loaded relations for {len(relations_data)} countries")
        except Exception as e:
            print(f"Error reading relations: {e}")
    else:
        print("Warning: relations_data.json not found")

    # Extract country data
    pattern = r'{\s*rank:\s*(\d+),\s*name:\s*"([^"]+)",\s*id:\s*"([^"]+)",\s*powerIndex:\s*([\d.]+),\s*flagUrl:\s*"([^"]+)"\s*}'
    matches = re.finditer(pattern, content)
    
    countries = []
    for match in matches:
        countries.append({
            "rank": int(match.group(1)),
            "name": match.group(2),
            "id": match.group(3),
            "powerIndex": float(match.group(4)),
            "flagUrl": match.group(5)
        })
    
    print(f"Found {len(countries)} countries in rankingData.ts")

    ts_content = """import { CountryData } from "./types";

export interface CountryData {
    id: string;
    name: string;
    rank: number;
    powerIndex: number;
    flagUrl: string;
    mapUrl: string;
    mapUrl: string;
    coordinates: [number, number];
    modernizationLevel?: number; // 1-10 scale (1=0.5x, 10=2.0x)
    
    nuclear: {
        hasNuclear: boolean;
        stockpile: number;
        deployed: number;
    };
    
    navy: {
        totalShips: number;
        aircraftCarriers: number;
        submarines: number;
        destroyers: number;
        frigates: number;
        corvettes: number;
        patrolVessels: number;
        merchantMarine: number;
        majorPorts: number;
    };
    
    army: {
        activePersonnel: number;
        reservePersonnel: number;
        tanks: number;
        afv: number;
        selfPropelledArtillery: number;
        towedArtillery: number;
        rocketProjectors: number;
    };
    
    airforce: {
        totalAircraft: number;
        fighters: number;
        attackAircraft: number;
        transports: number;
        trainers: number;
        specialMission: number;
        tankerFleet: number;
        helicopters: number;
        attackHelicopters: number;
        bombers: number;
    };
    
    relations: {
        allies: Array<{name: string; strength: number}>;
        potentialThreats: Array<{name: string; strength: number}>;
    };
}

export const mockCountries: CountryData[] = [
"""

    # Generate entries for all countries
    for i, country in enumerate(countries):
        country_id = country["id"]
        country_name = country["name"]
        
        # Get military data
        stats = military_data.get(country_id, {})
        if not stats:
            stats = military_data.get(country_id.upper(), {})
        
        # Helper to safely get nested values
        def get_val(category, field, default=0):
            return stats.get(category, {}).get(field, default)
        
        # Get relations
        country_relations = relations_data.get(country_name, {"allies": [], "threats": []})
        allies_str = ", ".join([f'{{name: "{a["name"]}", strength: {a["strength"]}}}' for a in country_relations.get("allies", [])])
        threats_str = ", ".join([f'{{name: "{t["name"]}", strength: {t["strength"]}}}' for t in country_relations.get("threats", [])])
        
        # Army
        active_personnel = get_val("army", "activePersonnel", 0)
        reserve_personnel = get_val("army", "reservePersonnel", 0)
        tanks = get_val("army", "tanks", 0)
        afv = get_val("army", "afv", 0)
        self_propelled_artillery = get_val("army", "selfPropelledArtillery", 0)
        towed_artillery = get_val("army", "towedArtillery", 0)
        rocket_projectors = get_val("army", "rocketProjectors", 0)
        
        # Navy
        total_ships = get_val("navy", "totalShips", 0)
        aircraft_carriers = get_val("navy", "aircraftCarriers", 0)
        submarines = get_val("navy", "submarines", 0)
        destroyers = get_val("navy", "destroyers", 0)
        frigates = get_val("navy", "frigates", 0)
        corvettes = get_val("navy", "corvettes", 0)
        patrol_vessels = get_val("navy", "patrolVessels", 0)
        merchant_marine = get_val("navy", "merchantMarine", 0)
        major_ports = get_val("navy", "majorPorts", 0)
        
        # Air Force
        total_aircraft = get_val("airforce", "totalAircraft", 0)
        fighters = get_val("airforce", "fighters", 0)
        attack_aircraft = get_val("airforce", "attackAircraft", 0)
        transports = get_val("airforce", "transports", 0)
        trainers = get_val("airforce", "trainers", 0)
        special_mission = get_val("airforce", "specialMission", 0)
        tanker_fleet = get_val("airforce", "tankerFleet", 0)
        helicopters = get_val("airforce", "helicopters", 0)
        attack_helicopters = get_val("airforce", "attackHelicopters", 0)
        bombers = get_val("airforce", "bombers", 0)
        
        # Nuclear
        has_nuclear = str(get_val("nuclear", "hasNuclear", False)).lower()
        stockpile = get_val("nuclear", "stockpile", 0)

        # FACT-BASED Modernization Levels (Comprehensive Analysis)
        # Level 10: Superpower Tech (Gen 5+, Stealth, Space, Network) -> USA
        # Level 9: Top Tier Modern (Gen 5 Limited/Gen 4.5++, Advanced Naval/Missile) -> CN, UK, FR, JP, IL, SK, DE
        # Level 8: Advanced Regional (Gen 4.5, Modern Armor, Strong AD) -> RU, TR, IT, AU, SG, SE, NO, PL
        # Level 7: Modernizing (Mix of Gen 4+/4, integrating new tech) -> IN, SA, TW, CA, ES, NL
        # Level 6: Mixed Legacy/Modern (Gen 4 backbone, some Gen 3) -> UA, PK, EG, ID, TH, BR, AE, GR
        # Level 5: Cold War Heritage (Gen 3/4 mix, mass over tech) -> IR, VN, DZ, MA, ZA, CO, CL, MX
        # Level 4: Legacy/Asymmetric (Gen 2/3, relying on mass/asymmetric) -> NK, SY, IQ, VE, CU
        # Level 3: Obsolescent (Gen 2 predominant) -> NG, ET, KE, MM
        # Level 2−1: Basic (Small arms, technicals, no heavy industry)

        tech_map = {
            # TIER 1 (10): Global Power Projection & Tech Supremacy
            "usa": 10,

            # TIER 2 (9): Advanced Modern Militaries
            "chn": 9, "gbr": 9, "fra": 9, "jpn": 9, "isr": 9, "sko": 9, "deu": 9, "ita": 9, "aus": 9, "swe": 9, "nor": 9, "nld": 9, "sgp": 9,

            # TIER 3 (8): Strong Regional Powers & High Tech
            "rus": 8, "tur": 8, "pol": 8, "can": 8, "esp": 8, "fin": 8, "uae": 8, "sau": 8, "twn": 8, "qat": 8, "dnk": 8, "che": 8, "bel": 8,

            # TIER 4 (7): Emerging Modern Forces
            "ind": 7, "bra": 7, "idn": 7, "tha": 7, "egy": 7, "pak": 7, "grc": 7, "cze": 7, "prt": 7, "rou": 7, "mys": 7, "chl": 7, "vnm": 7,

            # TIER 5 (6): Mixed Modern & Legacy Systems
            "ukr": 6, "irn": 6, "dza": 6, "mar": 6, "kaz": 6, "azr": 6, "bgd": 6, "phl": 6, "col": 6, "mex": 6, "arg": 6, "zaf": 6, "per": 6, "kwt": 6, "oma": 6, "hun": 6, "svk": 6, "hrv": 6, "bgr": 6, "srb": 6, "aut": 6,

            # TIER 6 (5): Cold War Legacy / Asymmetric Focus
            "nko": 5, "syr": 5, "irq": 5, "cub": 5, "ven": 5, "blr": 5, "mmr": 5, "lby": 5, "yem": 5, "jor": 5, "uzb": 5, "tkm": 5, "ang": 5, "nga": 5, "eth": 5, "ecu": 5,

            # TIER 7 (4): Aging Legacy Arsenals
            "sdn": 4, "cod": 4, "som": 4, "afg": 4, "mli": 4, "hti": 4, "khm": 4, "lao": 4, "lbn": 4, "nic": 4, "bol": 4, "pry": 4, "uru": 4, "dom": 4, "gtm": 4, "hnd": 4, "tjk": 4, "kgz": 4, "geo": 4, "arm": 4,

            # TIER 8 (3): Obsolescent / Minimal Capability
            "zmb": 3, "zwe": 3, "tza": 3, "cmr": 3, "uga": 3, "nam": 3, "moz": 3, "ken": 3, "sen": 3, "civ": 3, "bfa": 3, "mrt": 3, "mad": 3, "gab": 3, "cog": 3, "ssd": 3, "eri": 3, "bdi": 3, "ben": 3, "bwa": 3, "mne": 3, "mkd": 3, "alb": 3, "bih": 3, "lva": 3, "est": 3, "ltu": 3, "lux": 3, "nzl": 3, "lka": 3, "npl": 3,

            # TIER 9 (2): Security Forces / Symbolic
            "caf": 2, "lbr": 2, "sle": 2, "car": 2, "isl": 2, "pan": 2, "blz": 2, "sur": 2, "btn": 2, "kos": 2, "slv": 2, "gin": 2, "gmb": 2, "gwn": 2, "eqg": 2, "dji": 2, "tgo": 2, "swz": 2, "lso": 2,
            
            # Map ID variations from RankingData if needed (manual mapping adjustments)
            "ukd": 9, "kor": 9, "sk": 9, "tky": 8, "sar": 8, "thl": 7, "alg": 6, "saf": 6, "vet": 7, "por": 7, "rom": 7, "gre": 7, "nth": 9, "mya": 5, "swz": 8, "den": 8, "chi": 7, "czc": 7, "uae": 8, "hun": 6, "ang": 5, "kaz": 6, "uzb": 5, "mor": 6, "azr": 6, "bel": 8, "bul": 6, "srb": 6, "syr": 5, "ecu": 5, "drc": 4, "cub": 5, "ast": 6, "srl": 3, "blr": 5, "slk": 6, "qtr": 8, "sdn": 4, "cro": 6, "jor": 5, "lby": 5, "tkm": 5, "alb": 3, "kuw": 6, "bol": 4, "bah": 6, "oma": 6, "ken": 3, "chd": 3, "yem": 5, "nwz": 3, "par": 4, "lit": 3, "moz": 3, "tun": 5, "arm": 4, "tnz": 3, "cam": 3, "geo": 4, "cmb": 4, "sln": 6, "ire": 6, "mgl": 4, "lat": 3, "uru": 4, "hon": 4, "ivc": 3, "gua": 4, "mal": 4, "kyr": 4, "lao": 4, "est": 3, "tjk": 4, "zam": 3, "gha": 3, "zim": 3, "mac": 3, "ssd": 3, "uga": 3, "leb": 4, "nam": 3, "lux": 3, "afg": 4, "ngr": 4, "eri": 3, "roc": 3, "bot": 3, "mau": 3, "dom": 4, "sen": 3, "nep": 3, "mtn": 3, "esl": 2, "bkf": 3, "mad": 3, "nic": 4, "bos": 3, "gab": 3, "mol": 3, "ice": 2, "pan": 2, "blz": 2, "lib": 2, "srn": 2, "sle": 2, "kos": 2, "som": 4, "car": 2, "ben": 3, "but": 2
        }

        cid_lower = country_id.lower()
        tech_level = tech_map.get(cid_lower)
        
        # Fallback if not mapped (Safety Net)
        if tech_level is None:
            r = country['rank']
            if r <= 20: tech_level = 7
            elif r <= 50: tech_level = 5
            elif r <= 100: tech_level = 3
            else: tech_level = 2

        ts_content += f"""    {{
        id: "{cid_lower}",
        name: "{country['name']}",
        rank: {country['rank']},
        powerIndex: {country['powerIndex']},
        flagUrl: "{country['flagUrl']}",
        mapUrl: "",
        coordinates: [0, 0],
        modernizationLevel: {tech_level}, // Rank-based approximation
        nuclear: {{
            hasNuclear: {has_nuclear},
            stockpile: {stockpile},
            deployed: 0,
        }},
        navy: {{
            totalShips: {total_ships},
            aircraftCarriers: {aircraft_carriers},
            submarines: {submarines},
            destroyers: {destroyers},
            frigates: {frigates},
            corvettes: {corvettes},
            patrolVessels: {patrol_vessels},
            merchantMarine: {merchant_marine},
            majorPorts: {major_ports},
        }},
        army: {{
            activePersonnel: {active_personnel},
            reservePersonnel: {reserve_personnel},
            tanks: {tanks},
            afv: {afv},
            selfPropelledArtillery: {self_propelled_artillery},
            towedArtillery: {towed_artillery},
            rocketProjectors: {rocket_projectors},
        }},
        airforce: {{
            totalAircraft: {total_aircraft},
            fighters: {fighters},
            attackAircraft: {attack_aircraft},
            transports: {transports},
            trainers: {trainers},
            specialMission: {special_mission},
            tankerFleet: {tanker_fleet},
            helicopters: {helicopters},
            attackHelicopters: {attack_helicopters},
            bombers: {bombers},
        }},
        relations: {{
            allies: [{allies_str}],
            potentialThreats: [{threats_str}],
        }},
    }},
"""

    ts_content += """];

export const getAllCountries = () => mockCountries;

export const getCountryById = (id: string) => {
    return mockCountries.find((c) => c.id.toLowerCase() === id.toLowerCase());
};

export function getCountryByName(name: string): CountryData | undefined {
    return mockCountries.find(
        (country) => country.name.toLowerCase() === name.toLowerCase()
    );
}

export function getRelatedCountries(country: CountryData): {
    allies: CountryData[];
    threats: CountryData[];
} {
    const allies = country.relations.allies
        .map((ally) => {
            const found = getCountryByName(ally.name);
            return found ? {...found, relationStrength: ally.strength} : null;
        })
        .filter((c): c is CountryData => c !== null);

    const threats = country.relations.potentialThreats
        .map((threat) => {
            const found = getCountryByName(threat.name);
            return found ? {...found, relationStrength: threat.strength} : null;
        })
        .filter((c): c is CountryData => c !== null);

    return { allies, threats };
}
"""

    with open("src/lib/mockData.ts", "w", encoding="utf-8") as f:
        f.write(ts_content)
    
    print(f"✓ Generated mockData.ts with {len(countries)} countries")
    print(f"✓ Integrated military data and international relations")

if __name__ == "__main__":
    generate_mock_data()
