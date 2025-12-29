import json

FILE_PATH = 'complete_military_data.json'

def patch_data():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Check TKY
    if 'TKY' in data:
        tky = data['TKY']
        print("TKY Data Before:", tky.get('army'))
        
        # Patch Turkey with GFP 2025 approx data
        if tky.get('army', {}).get('tanks', 0) == 0:
            print("Patching TKY...")
            tky['army'] = {
                "activePersonnel": 355200,
                "reservePersonnel": 378700,
                "tanks": 2229,
                "afv": 55104,
                "selfPropelledArtillery": 605,
                "towedArtillery": 1038,
                "rocketProjectors": 600
            }
            tky['navy'] = {
                "totalShips": 186,
                "aircraftCarriers": 2, # Inclusive of LHD/Drone carriers
                "submarines": 12,
                "destroyers": 16,
                "frigates": 16,
                "corvettes": 10,
                "patrolVessels": 35,
                "merchantMarine": 1236,
                "majorPorts": 10
            }
            tky['airforce'] = {
                "totalAircraft": 1069,
                "fighters": 205,
                "attackAircraft": 0,
                "transports": 83,
                "trainers": 275,
                "specialMission": 22,
                "tankerFleet": 7,
                "helicopters": 502,
                "attackHelicopters": 111,
                "bombers": 0
            }
    else:
        print("Error: TKY not found in data.")

    # Patch Afghanistan if empty? (Optional, let's stick to major powers first to be safe)
    # TKY was the glaring omission for a "Major Power".
    
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4)
        
    print("Patch complete.")

if __name__ == "__main__":
    patch_data()
