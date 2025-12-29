import re

# Common flag URL mistakes and corrections
FLAG_CORRECTIONS = {
    # Country name: correct ISO code
    "China": "cn",  # Currently wrong: ch (Switzerland)
    "Switzerland": "ch",
    "United States": "us",
    "Russia": "ru",
    "India": "in",
    "South Korea": "kr",
    "United Kingdom": "gb",
    "France": "fr",
    "Japan": "jp",
    "Turkiye": "tr",  # Turkey
    "Italy": "it",
    "Brazil": "br",
    "Pakistan": "pk",
    "Indonesia": "id",
    "Germany": "de",
    "Israel": "il",
    "Iran": "ir",
    "Spain": "es",
    "Australia": "au",
    "Egypt": "eg",
    "Ukraine": "ua",
    "Poland": "pl",
    "Taiwan": "tw",
    "Vietnam": "vn",
    "Saudi Arabia": "sa",
    "Thailand": "th",
    "Algeria": "dz",
    "Sweden": "se",
    "Canada": "ca",
    "Singapore": "sg",
    "Greece": "gr",
    "Nigeria": "ng",
    "Mexico": "mx",
    "Argentina": "ar",
    "North Korea": "kp",
    "Bangladesh": "bd",
    "Netherlands": "nl",
    "Myanmar": "mm",
    "Norway": "no",
    "Portugal": "pt",
    "South Africa": "za",
    "Philippines": "ph",
    "Malaysia": "my",
    "Iraq": "iq",
    "Denmark": "dk",
    "Colombia": "co",
    "Chile": "cl",
    "Finland": "fi",
    "Peru": "pe",
    "Venezuela": "ve",
    "Romania": "ro",
    "Ethiopia": "et",
    "Czechia": "cz",
    "United Arab Emirates": "ae",
    "Hungary": "hu",
    "Angola": "ao",
    "Kazakhstan": "kz",
    "Uzbekistan": "uz",
    "Morocco": "ma",
    "Azerbaijan": "az",
    "Belgium": "be",
    "Bulgaria": "bg",
    "Serbia": "rs",
    "Syria": "sy",
    "Ecuador": "ec",
    "Democratic Republic of the Congo": "cd",
    "Cuba": "cu",
    "Austria": "at",
    "Sri Lanka": "lk",
    "Belarus": "by",
    "Slovakia": "sk",
    "Qatar": "qa",
    "Sudan": "sd",
    "Croatia": "hr",
    "Jordan": "jo",
    "Libya": "ly",
    "Turkmenistan": "tm",
    "Albania": "al",
    "Kuwait": "kw",
    "Bolivia": "bo",
    "Bahrain": "bh",
    "Oman": "om",
    "Kenya": "ke",
    "Chad": "td",
    "Yemen": "ye",
    "New Zealand": "nz",
    "Paraguay": "py",
    "Lithuania": "lt",
    "Mozambique": "mz",
    "Tunisia": "tn",
    "Armenia": "am",
    "Tanzania": "tz",
    "Cameroon": "cm",
    "Georgia": "ge",
    "Cambodia": "kh",
    "Slovenia": "si",
    "Ireland": "ie",
    "Mongolia": "mn",
    "Latvia": "lv",
    "Uruguay": "uy",
    "Honduras": "hn",
    "Ivory Coast": "ci",
    "Guatemala": "gt",
    "Mali": "ml",
    "Kyrgyzstan": "kg",
    "Laos": "la",
    "Estonia": "ee",
    "Tajikistan": "tj",
    "Zambia": "zm",
    "Ghana": "gh",
    "Zimbabwe": "zw",
    "North Macedonia": "mk",
    "South Sudan": "ss",
    "Uganda": "ug",
    "Lebanon": "lb",
    "Namibia": "na",
    "Luxembourg": "lu",
    "Afghanistan": "af",
    "Niger": "ne",
    "Eritrea": "er",
    "Republic of the Congo": "cg",
    "Botswana": "bw",
    "Mauritania": "mr",
    "Dominican Republic": "do",
    "Senegal": "sn",
    "Nepal": "np",
    "Montenegro": "me",
    "El Salvador": "sv",
    "Burkina Faso": "bf",
    "Madagascar": "mg",
    "Nicaragua": "ni",
    "Bosnia and Herzegovina": "ba",
    "Gabon": "ga",
    "Moldova": "md",
    "Iceland": "is",
    "Panama": "pa",
    "Belize": "bz",
    "Liberia": "lr",
    "Suriname": "sr",
    "Sierra Leone": "sl",
    "Kosovo": "xk",
    "Somalia": "so",
    "Central African Republic": "cf",
    "Benin": "bj",
}

def fix_flags_in_ranking_data():
    """Read rankingData.ts and fix incorrect flag URLs"""
    
    with open("src/lib/rankingData.ts", "r", encoding="utf-8") as f:
        content = f.read()
    
    # Find all country entries
    pattern = r'{\s*rank:\s*(\d+),\s*name:\s*"([^"]+)",\s*id:\s*"([^"]+)",\s*powerIndex:\s*([\d.]+),\s*flagUrl:\s*"([^"]+)"\s*}'
    
    def replace_flag(match):
        rank = match.group(1)
        name = match.group(2)
        country_id = match.group(3)
        power_index = match.group(4)
        current_flag_url = match.group(5)
        
        # Get correct ISO code
        if name in FLAG_CORRECTIONS:
            correct_iso = FLAG_CORRECTIONS[name]
            correct_flag_url = f"https://flagcdn.com/w320/{correct_iso}.png"
            
            if current_flag_url != correct_flag_url:
                print(f"Fixing {name}: {current_flag_url} -> {correct_flag_url}")
            
            return f'''{{
        rank: {rank},
        name: "{name}",
        id: "{country_id}",
        powerIndex: {power_index},
        flagUrl: "{correct_flag_url}"
    }}'''
        else:
            print(f"Warning: No flag correction defined for '{name}'")
            return match.group(0)
    
    # Replace all matches
    new_content = re.sub(pattern, replace_flag, content)
    
    # Write back
    with open("src/lib/rankingData.ts", "w", encoding="utf-8") as f:
        f.write(new_content)
    
    print("\nFlag URLs have been updated in rankingData.ts")

if __name__ == "__main__":
    fix_flags_in_ranking_data()
