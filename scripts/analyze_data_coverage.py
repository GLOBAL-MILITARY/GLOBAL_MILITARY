import json
import os

def analyze_data_coverage():
    """Analyze the coverage of military data across all countries"""
    
    with open("scripts/military_data_cache.json", "r") as f:
        data = json.load(f)
    
    print("=" * 80)
    print("MILITARY DATA COVERAGE ANALYSIS")
    print("=" * 80)
    print(f"\nTotal countries in cache: {len(data)}")
    
    # Define all expected fields
    expected_fields = {
        "army": [
            "activePersonnel", "reservePersonnel", "tanks", "afv",
            "selfPropelledArtillery", "towedArtillery", "rocketProjectors"
        ],
        "navy": [
            "totalShips", "aircraftCarriers", "submarines", "destroyers",
            "frigates", "corvettes", "patrolVessels", "merchantMarine", "majorPorts"
        ],
        "airforce": [
            "totalAircraft", "fighters", "attackAircraft", "transports",
            "trainers", "specialMission", "tankerFleet", "helicopters",
            "attackHelicopters", "bombers"
        ],
        "nuclear": ["hasNuclear", "stockpile"]
    }
    
    # Analyze coverage
    coverage_stats = {
        "army": {field: 0 for field in expected_fields["army"]},
        "navy": {field: 0 for field in expected_fields["navy"]},
        "airforce": {field: 0 for field in expected_fields["airforce"]},
        "nuclear": {field: 0 for field in expected_fields["nuclear"]}
    }
    
    countries_with_data = {
        "army": {field: [] for field in expected_fields["army"]},
        "navy": {field: [] for field in expected_fields["navy"]},
        "airforce": {field: [] for field in expected_fields["airforce"]},
        "nuclear": {field: [] for field in expected_fields["nuclear"]}
    }
    
    for country_id, country_data in data.items():
        for category in ["army", "navy", "airforce", "nuclear"]:
            if category in country_data:
                for field in expected_fields[category]:
                    if field in country_data[category]:
                        value = country_data[category][field]
                        if value not in [0, False, ""]:
                            coverage_stats[category][field] += 1
                            countries_with_data[category][field].append(country_id)
    
    # Print coverage statistics
    print("\n" + "=" * 80)
    print("COVERAGE STATISTICS")
    print("=" * 80)
    
    total_countries = len(data)
    
    for category in ["army", "navy", "airforce", "nuclear"]:
        print(f"\n{category.upper()}:")
        for field in expected_fields[category]:
            count = coverage_stats[category][field]
            percentage = (count / total_countries) * 100
            print(f"  {field:30s}: {count:3d}/{total_countries} ({percentage:5.1f}%)")
    
    # Find countries with least data
    print("\n" + "=" * 80)
    print("COUNTRIES WITH MISSING DATA (Bottom 20)")
    print("=" * 80)
    
    country_scores = {}
    for country_id, country_data in data.items():
        score = 0
        for category in ["army", "navy", "airforce"]:
            if category in country_data:
                for field, value in country_data[category].items():
                    if value not in [0, False, ""]:
                        score += 1
        country_scores[country_id] = score
    
    sorted_countries = sorted(country_scores.items(), key=lambda x: x[1])
    for country_id, score in sorted_countries[:20]:
        print(f"  {country_id:15s}: {score:2d}/26 fields populated")
    
    # Identify completely empty categories
    print("\n" + "=" * 80)
    print("COUNTRIES WITH EMPTY CATEGORIES")
    print("=" * 80)
    
    for category in ["army", "navy", "airforce"]:
        empty_countries = []
        for country_id, country_data in data.items():
            if category not in country_data:
                empty_countries.append(country_id)
                continue
            
            all_zero = all(
                country_data[category].get(field, 0) in [0, False, ""]
                for field in expected_fields[category]
            )
            if all_zero:
                empty_countries.append(country_id)
        
        if empty_countries:
            print(f"\n{category.upper()} (All zeros): {len(empty_countries)} countries")
            print(f"  {', '.join(empty_countries[:10])}")
            if len(empty_countries) > 10:
                print(f"  ... and {len(empty_countries) - 10} more")

if __name__ == "__main__":
    analyze_data_coverage()
