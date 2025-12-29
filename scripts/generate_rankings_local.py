import re

raw_data = """
[1 United States USA PwrIndx: 0.0744]
[2 Russia RUS PwrIndx: 0.0788]
[3 China CHN PwrIndx: 0.0788]
[4 India IND PwrIndx: 0.1184]
[5 South Korea SKO PwrIndx: 0.1656]
[6 United Kingdom UKD PwrIndx: 0.1785]
[7 France FRA PwrIndx: 0.1878]
[8 Japan JPN PwrIndx: 0.1839]
[9 Turkiye TKY PwrIndx: 0.1902]
[10 Italy ITA PwrIndx: 0.2164]
[11 Brazil BRA PwrIndx: 0.2415]
[12 Pakistan PAK PwrIndx: 0.2513]
[13 Indonesia INO PwrIndx: 0.2557]
[14 Germany GER PwrIndx: 0.2601]
[15 Israel ISR PwrIndx: 0.2661]
[16 Iran IRN PwrIndx: 0.3048]
[17 Spain SPN PwrIndx: 0.3242]
[18 Australia AUS PwrIndx: 0.3298]
[19 Egypt EGY PwrIndx: 0.3427]
[20 Ukraine UKR PwrIndx: 0.3755]
[21 Poland POL PwrIndx: 0.3776]
[22 Taiwan TWN PwrIndx: 0.3988]
[23 Vietnam VET PwrIndx: 0.4024]
[24 Saudi Arabia SAR PwrIndx: 0.4201]
[25 Thailand THL PwrIndx: 0.4536]
[26 Algeria ALG PwrIndx: 0.3589]
[27 Sweden SWE PwrIndx: 0.4835]
[28 Canada CAN PwrIndx: 0.5179]
[29 Singapore SNG PwrIndx: 0.5271]
[30 Greece GRE PwrIndx: 0.5337]
[31 Nigeria NGA PwrIndx: 0.5771]
[32 Mexico MEX PwrIndx: 0.5965]
[33 Argentina ARG PwrIndx: 0.6013]
[34 North Korea NKO PwrIndx: 0.6016]
[35 Bangladesh BNG PwrIndx: 0.6062]
[36 Netherlands NTH PwrIndx: 0.6412]
[37 Myanmar MYA PwrIndx: 0.6735]
[38 Norway NOR PwrIndx: 0.6811]
[39 Portugal POR PwrIndx: 0.6856]
[40 South Africa SAF PwrIndx: 0.6889]
[41 Philippines PHL PwrIndx: 0.6987]
[42 Malaysia MLY PwrIndx: 0.7429]
[43 Iraq IRQ PwrIndx: 0.7738]
[44 Switzerland SWZ PwrIndx: 0.7869]
[45 Denmark DEN PwrIndx: 0.8109]
[46 Colombia COL PwrIndx: 0.8353]
[47 Chile CHI PwrIndx: 0.8361]
[48 Finland FIN PwrIndx: 0.8437]
[49 Peru PER PwrIndx: 0.8588]
[50 Venezuela VEN PwrIndx: 0.8882]
[51 Romania ROM PwrIndx: 0.8984]
[52 Ethiopia ETH PwrIndx: 0.9305]
[53 Czechia CZC PwrIndx: 0.9994]
[54 United Arab Emirates UAE PwrIndx: 1.0186]
[55 Hungary HUN PwrIndx: 1.0259]
[56 Angola ANG PwrIndx: 1.0961]
[57 Kazakhstan KAZ PwrIndx: 1.1016]
[58 Uzbekistan UZB PwrIndx: 1.1121]
[59 Morocco MOR PwrIndx: 1.1273]
[60 Azerbaijan AZR PwrIndx: 1.2531]
[61 Belgium BEL PwrIndx: 1.2564]
[62 Bulgaria BUL PwrIndx: 1.2563]
[63 Serbia SRB PwrIndx: 1.2576]
[64 Syria SYR PwrIndx: 1.2771]
[65 Ecuador ECU PwrIndx: 1.3021]
[66 Democratic Republic of the Congo DRC PwrIndx: 1.3111]
[67 Cuba CUB PwrIndx: 1.3286]
[68 Austria AST PwrIndx: 1.3704]
[69 Sri Lanka SRL PwrIndx: 1.3941]
[70 Belarus BLR PwrIndx: 1.3954]
[71 Slovakia SLK PwrIndx: 1.3978]
[72 Qatar QTR PwrIndx: 1.4307]
[73 Sudan SDN PwrIndx: 1.4756]
[74 Croatia CRO PwrIndx: 1.5074]
[75 Jordan JOR PwrIndx: 1.6139]
[76 Libya LBY PwrIndx: 1.4449]
[77 Turkmenistan TKM PwrIndx: 1.6512]
[78 Albania ALB PwrIndx: 1.6815]
[79 Kuwait KUW PwrIndx: 1.6982]
[80 Bolivia BOL PwrIndx: 1.7221]
[81 Bahrain BAH PwrIndx: 1.7448]
[82 Oman OMA PwrIndx: 1.8047]
[83 Kenya KEN PwrIndx: 1.8135]
[84 Chad CHD PwrIndx: 1.8712]
[85 Yemen YEM PwrIndx: 1.8901]
[86 New Zealand NWZ PwrIndx: 1.9039]
[87 Paraguay PAR PwrIndx: 1.9044]
[88 Lithuania LIT PwrIndx: 1.9075]
[89 Mozambique MOZ PwrIndx: 1.9265]
[90 Tunisia TUN PwrIndx: 1.9538]
[91 Armenia ARM PwrIndx: 2.0373]
[92 Tanzania TNZ PwrIndx: 2.0416]
[93 Cameroon CAM PwrIndx: 2.0501]
[94 Georgia GEO PwrIndx: 2.0695]
[95 Cambodia CMB PwrIndx: 2.0752]
[96 Slovenia SLN PwrIndx: 2.1016]
[97 Ireland IRE PwrIndx: 2.1103]
[98 Mongolia MGL PwrIndx: 2.1135]
[99 Latvia LAT PwrIndx: 2.1246]
[100 Uruguay URU PwrIndx: 2.1385]
[101 Honduras HON PwrIndx: 2.1679]
[102 Ivory Coast IVC PwrIndx: 2.1796]
[103 Guatemala GUA PwrIndx: 2.1956]
[104 Mali MAL PwrIndx: 2.2379]
[105 Kyrgyzstan KYR PwrIndx: 2.2543]
[106 Laos LAO PwrIndx: 2.2663]
[107 Estonia EST PwrIndx: 2.2917]
[108 Tajikistan TJK PwrIndx: 2.3049]
[109 Zambia ZAM PwrIndx: 2.3411]
[110 Ghana GHA PwrIndx: 2.3775]
[111 Zimbabwe ZIM PwrIndx: 2.3863]
[112 North Macedonia MAC PwrIndx: 2.4042]
[113 South Sudan SSD PwrIndx: 2.4321]
[114 Uganda UGA PwrIndx: 2.4767]
[115 Lebanon LEB PwrIndx: 2.5981]
[116 Namibia NAM PwrIndx: 2.6384]
[117 Luxembourg LUX PwrIndx: 2.6415]
[118 Afghanistan AFG PwrIndx: 2.6442]
[119 Niger NGR PwrIndx: 2.6689]
[120 Eritrea ERI PwrIndx: 2.6985]
[121 Republic of the Congo ROC PwrIndx: 2.7282]
[122 Botswana BOT PwrIndx: 2.7509]
[123 Mauritania MAU PwrIndx: 2.7977]
[124 Dominican Republic DOM PwrIndx: 2.8023]
[125 Senegal SEN PwrIndx: 2.8116]
[126 Nepal NEP PwrIndx: 2.8915]
[127 Montenegro MTN PwrIndx: 2.9216]
[128 El Salvador ESL PwrIndx: 2.9371]
[129 Burkina Faso BKF PwrIndx: 2.9734]
[130 Madagascar MAD PwrIndx: 3.0609]
[131 Nicaragua NIC PwrIndx: 3.0966]
[132 Bosnia and Herzegovina BOS PwrIndx: 3.0799]
[133 Gabon GAB PwrIndx: 3.1805]
[134 Moldova MOL PwrIndx: 3.2555]
[135 Iceland ICE PwrIndx: 3.5181]
[136 Panama PAN PwrIndx: 3.6575]
[137 Beliz BLZ PwrIndx: 3.7191]
[138 Liberia LIB PwrIndx: 3.7781]
[139 Suriname SRN PwrIndx: 3.9127]
[140 Sierra Leone SLE PwrIndx: 3.9701]
[141 Kosovo KOS PwrIndx: 4.9141]
[142 Somalia SOM PwrIndx: 4.2037]
[143 Central African Republic CAR PwrIndx: 4.2347]
[144 Benin BEN PwrIndx: 4.3156]
[145 Bhutan BUT PwrIndx: 6.3934]
"""

def generate_ts():
    lines = raw_data.strip().split('\n')
    countries = []
    
    for line in lines:
        # Format: [Rank Name ID PwrIndx: Value]
        # Regex: \[(\d+)\s+(.+?)\s+([A-Z]{3})\s+PwrIndx:\s+(\d+\.\d+)\]
        match = re.search(r'\[(\d+)\s+(.+?)\s+([A-Z]{3})\s+PwrIndx:\s+(\d+\.\d+)\]', line)
        if match:
            rank = int(match.group(1))
            name = match.group(2)
            country_id = match.group(3)
            power_index = float(match.group(4))
            
            # Map ID to flag URL (using flagcdn)
            # We need a mapping or just use the first 2 letters of ID?
            # Many IDs are not standard ISO 2-letter codes.
            # E.g. UKD -> gb, SKO -> kr, JPN -> jp
            # Let's try to be smart or just use a placeholder if unsure.
            # For now, we'll use a generic logic and maybe fix specific ones.
            
            # Simple mapping for common ones
            flag_code = country_id.lower()[:2]
            
            # Manual overrides for non-standard codes in GFP
            overrides = {
                "UKD": "gb", "SKO": "kr", "JPN": "jp", "TKY": "tr", "INO": "id",
                "GER": "de", "ISR": "il", "IRN": "ir", "SPN": "es", "AUS": "au",
                "EGY": "eg", "UKR": "ua", "POL": "pl", "TWN": "tw", "VET": "vn",
                "SAR": "sa", "THL": "th", "ALG": "dz", "SWE": "se", "CAN": "ca",
                "SNG": "sg", "GRE": "gr", "NGA": "ng", "MEX": "mx", "ARG": "ar",
                "NKO": "kp", "BNG": "bd", "NTH": "nl", "MYA": "mm", "NOR": "no",
                "POR": "pt", "SAF": "za", "PHL": "ph", "MLY": "my", "IRQ": "iq",
                "SWZ": "ch", "DEN": "dk", "COL": "co", "CHI": "cl", "FIN": "fi",
                "PER": "pe", "VEN": "ve", "ROM": "ro", "ETH": "et", "CZC": "cz",
                "UAE": "ae", "HUN": "hu", "ANG": "ao", "KAZ": "kz", "UZB": "uz",
                "MOR": "ma", "AZR": "az", "BEL": "be", "BUL": "bg", "SRB": "rs",
                "SYR": "sy", "ECU": "ec", "DRC": "cd", "CUB": "cu", "AST": "at",
                "SRL": "lk", "BLR": "by", "SLK": "sk", "QTR": "qa", "SDN": "sd",
                "CRO": "hr", "JOR": "jo", "LBY": "ly", "TKM": "tm", "ALB": "al",
                "KUW": "kw", "BOL": "bo", "BAH": "bh", "OMA": "om", "KEN": "ke",
                "CHD": "td", "YEM": "ye", "NWZ": "nz", "PAR": "py", "LIT": "lt",
                "MOZ": "mz", "TUN": "tn", "ARM": "am", "TNZ": "tz", "CAM": "cm",
                "GEO": "ge", "CMB": "kh", "SLN": "si", "IRE": "ie", "MGL": "mn",
                "LAT": "lv", "URU": "uy", "HON": "hn", "IVC": "ci", "GUA": "gt",
                "MAL": "ml", "KYR": "kg", "LAO": "la", "EST": "ee", "TJK": "tj",
                "ZAM": "zm", "GHA": "gh", "ZIM": "zw", "MAC": "mk", "SSD": "ss",
                "UGA": "ug", "LEB": "lb", "NAM": "na", "LUX": "lu", "AFG": "af",
                "NGR": "ne", "ERI": "er", "ROC": "cg", "BOT": "bw", "MAU": "mr",
                "DOM": "do", "SEN": "sn", "NEP": "np", "MTN": "me", "ESL": "sv",
                "BKF": "bf", "MAD": "mg", "NIC": "ni", "BOS": "ba", "GAB": "ga",
                "MOL": "md", "ICE": "is", "PAN": "pa", "BLZ": "bz", "LIB": "lr",
                "SRN": "sr", "SLE": "sl", "KOS": "xk", "SOM": "so", "CAR": "cf",
                "BEN": "bj", "BUT": "bt"
            }
            
            if country_id in overrides:
                flag_code = overrides[country_id]
            
            flag_url = f"https://flagcdn.com/w320/{flag_code}.png"
            
            countries.append({
                "rank": rank,
                "name": name,
                "id": country_id,
                "powerIndex": power_index,
                "flagUrl": flag_url
            })
            
    ts_content = """export interface RankingData {
    rank: number;
    name: string;
    id: string;
    powerIndex: number;
    flagUrl: string;
}

export const allCountriesRanking: RankingData[] = [
"""
    
    for c in countries:
        ts_content += f"""    {{
        rank: {c['rank']},
        name: "{c['name']}",
        id: "{c['id']}",
        powerIndex: {c['powerIndex']},
        flagUrl: "{c['flagUrl']}"
    }},
"""
    
    ts_content += "];\n"
    
    with open("src/lib/rankingData.ts", "w", encoding="utf-8") as f:
        f.write(ts_content)
        
    print(f"Generated src/lib/rankingData.ts with {len(countries)} countries.")

if __name__ == "__main__":
    generate_ts()
