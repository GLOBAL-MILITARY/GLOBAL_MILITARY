import json
import re

def generate_relations():
    """
    Generate international relations data for all countries
    Strength scale: 1-10 (10 = strongest relationship)
    """
    
    # Define major alliances and relationships
    relations = {}
    
    # NATO Members (strong mutual defense)
    nato_members = [
        "United States", "United Kingdom", "France", "Germany", "Italy", "Spain",
        "Canada", "Poland", "Netherlands", "Belgium", "Greece", "Czechia", "Portugal",
        "Hungary", "Romania", "Bulgaria", "Slovakia", "Denmark", "Norway", "Turkiye",
        "Croatia", "Albania", "Slovenia", "Lithuania", "Latvia", "Estonia",
        "North Macedonia", "Montenegro", "Iceland", "Luxembourg"
    ]
    
    # EU Members (economic/political alliance)
    eu_members = [
        "Germany", "France", "Italy", "Spain", "Poland", "Romania", "Netherlands",
        "Belgium", "Greece", "Czechia", "Portugal", "Hungary", "Sweden", "Austria",
        "Bulgaria", "Denmark", "Finland", "Slovakia", "Ireland", "Croatia",
        "Lithuania", "Slovenia", "Latvia", "Estonia", "Luxembourg"
    ]
    
    # Five Eyes intelligence alliance
    five_eyes = ["United States", "United Kingdom", "Canada", "Australia", "New Zealand"]
    
    # CSTO (Russia-led military alliance)
    csto = ["Russia", "Belarus", "Armenia", "Kazakhstan", "Kyrgyzstan", "Tajikistan"]
    
    # Major US allies in Asia-Pacific
    us_asian_allies = {
        "Japan": 10, "South Korea": 10, "Australia": 10, "Philippines": 9,
        "Thailand": 8, "Singapore": 8, "Taiwan": 9, "New Zealand": 9
    }
    
    # China's strategic partners
    china_partners = {
        "Russia": 7, "Pakistan": 9, "North Korea": 8, "Iran": 7,
        "Belarus": 6, "Cambodia": 7, "Myanmar": 6
    }
    
    # Middle East alliances
    arab_league = [
        "Egypt", "Saudi Arabia", "United Arab Emirates", "Iraq", "Syria", "Jordan",
        "Libya", "Sudan", "Algeria", "Morocco", "Tunisia", "Lebanon", "Yemen",
        "Kuwait", "Bahrain", "Qatar", "Oman"
    ]
    
    # Major rivalries and conflicts
    rivalries = {
        "United States": {"China": 7, "Russia": 7, "Iran": 8, "North Korea": 9},
        "Russia": {"United States": 7, "Ukraine": 10, "United Kingdom": 6, "Poland": 6},
        "China": {"United States": 7, "India": 7, "Japan": 6, "Taiwan": 9},
        "India": {"Pakistan": 10, "China": 7},
        "Pakistan": {"India": 10},
        "Israel": {"Iran": 9, "Syria": 8, "Lebanon": 7},
        "Iran": {"United States": 8, "Israel": 9, "Saudi Arabia": 7},
        "Saudi Arabia": {"Iran": 7, "Yemen": 6},
        "North Korea": {"South Korea": 10, "United States": 9, "Japan": 8},
        "South Korea": {"North Korea": 10},
        "Japan": {"China": 6, "North Korea": 8},
        "Ukraine": {"Russia": 10},
        "Turkiye": {"Greece": 5, "Syria": 6},
        "Greece": {"Turkiye": 5},
        "Armenia": {"Azerbaijan": 9},
        "Azerbaijan": {"Armenia": 9},
        "Vietnam": {"China": 5},
    }
    
    # Initialize all countries
    try:
        with open("src/lib/rankingData.ts", "r", encoding="utf-8") as f:
            content = f.read()
        
        pattern = r'name:\s*"([^"]+)",\s*id:\s*"([^"]+)"'
        matches = re.findall(pattern, content)
        
        for name, country_id in matches:
            relations[name] = {"allies": [], "threats": []}
    
    except Exception as e:
        print(f"Error reading rankingData: {e}")
        return {}
    
    # Process NATO relationships
    for member in nato_members:
        if member in relations:
            for other in nato_members:
                if other != member and other in relations:
                    relations[member]["allies"].append({"name": other, "strength": 10})
    
    # Process Five Eyes (even stronger than NATO)
    for member in five_eyes:
        if member in relations:
            for other in five_eyes:
                if other != member and other in relations:
                    # Upgrade existing or add new
                    existing = [a for a in relations[member]["allies"] if a["name"] == other]
                    if not existing:
                        relations[member]["allies"].append({"name": other, "strength": 10})
    
    # US Asian allies
    if "United States" in relations:
        for ally, strength in us_asian_allies.items():
            if ally in relations:
                relations["United States"]["allies"].append({"name": ally, "strength": strength})
                relations[ally]["allies"].append({"name": "United States", "strength": strength})
    
    # China's partners
    if "China" in relations:
        for partner, strength in china_partners.items():
            if partner in relations:
                relations["China"]["allies"].append({"name": partner, "strength": strength})
                relations[partner]["allies"].append({"name": "China", "strength": strength})
    
    # CSTO relationships
    for member in csto:
        if member in relations:
            for other in csto:
                if other != member and other in relations:
                    # Check if already added
                    existing = [a for a in relations[member]["allies"] if a["name"] == other]
                    if not existing:
                        strength = 9 if member == "Russia" or other == "Russia" else 7
                        relations[member]["allies"].append({"name": other, "strength": strength})
    
    # Arab League (moderate solidarity)
    for member in arab_league:
        if member in relations:
            for other in arab_league:
                if other != member and other in relations:
                    existing = [a for a in relations[member]["allies"] if a["name"] == other]
                    if not existing:
                        relations[member]["allies"].append({"name": other, "strength": 5})
    
    # Process rivalries and conflicts
    for country, enemies in rivalries.items():
        if country in relations:
            for enemy, strength in enemies.items():
                if enemy in relations:
                    relations[country]["threats"].append({"name": enemy, "strength": strength})
    
    # Sort by strength (descending)
    for country in relations:
        relations[country]["allies"].sort(key=lambda x: x["strength"], reverse=True)
        relations[country]["threats"].sort(key=lambda x: x["strength"], reverse=True)
        
        # Limit to top 10 allies and top 5 threats for cleaner display
        relations[country]["allies"] = relations[country]["allies"][:10]
        relations[country]["threats"] = relations[country]["threats"][:5]
    
    return relations

def main():
    print("Generating international relations data...")
    print("=" * 70)
    
    relations = generate_relations()
    
    # Save to JSON
    output_file = "scripts/relations_data.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(relations, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Generated relations for {len(relations)} countries")
    print(f"✓ Saved to {output_file}")
    
    # Print sample
    if "United States" in relations:
        print("\nSample - United States:")
        print(f"  Allies: {len(relations['United States']['allies'])}")
        for ally in relations['United States']['allies'][:3]:
            print(f"    - {ally['name']} (strength: {ally['strength']})")
        print(f"  Threats: {len(relations['United States']['threats'])}")
        for threat in relations['United States']['threats'][:3]:
            print(f"    - {threat['name']} (strength: {threat['strength']})")

if __name__ == "__main__":
    main()
