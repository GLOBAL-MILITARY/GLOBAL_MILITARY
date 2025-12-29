import re

user_table = """
| 1   | United States (USA)                    | 0.0744 ([Global Firepower][1]) |
| 2   | Russia (RUS)                           | 0.0788 ([Global Firepower][1]) |
| 3   | China (CHN)                            | 0.0788 ([Global Firepower][1]) |
| 4   | India (IND)                            | 0.1184 ([Global Firepower][1]) |
| 5   | South Korea (SKO)                      | 0.1656 ([Global Firepower][1]) |
| 6   | United Kingdom (UKD)                   | 0.1785 ([Global Firepower][1]) |
| 7   | France (FRA)                           | 0.1878 ([Global Firepower][1]) |
| 8   | Japan (JPN)                            | 0.1839 ([Global Firepower][1]) |
| 9   | Turkiye (TKY)                          | 0.1902 ([Global Firepower][1]) |
| 10  | Italy (ITA)                            | 0.2164 ([Global Firepower][1]) |
| 11  | Brazil (BRA)                           | 0.2415 ([Global Firepower][1]) |
| 12  | Pakistan (PAK)                         | 0.2513 ([Global Firepower][1]) |
| 13  | Indonesia (INO)                        | 0.2557 ([Global Firepower][1]) |
| 14  | Germany (GER)                          | 0.2601 ([Global Firepower][1]) |
| 15  | Israel (ISR)                           | 0.2661 ([Global Firepower][1]) |
| 16  | Iran (IRN)                             | 0.3048 ([Global Firepower][1]) |
| 17  | Spain (SPN)                            | 0.3242 ([Global Firepower][1]) |
| 18  | Australia (AUS)                        | 0.3298 ([Global Firepower][1]) |
| 19  | Egypt (EGY)                            | 0.3427 ([Global Firepower][1]) |
| 20  | Ukraine (UKR)                          | 0.3755 ([Global Firepower][1]) |
| 21  | Poland (POL)                           | 0.3776 ([Global Firepower][1]) |
| 22  | Taiwan (TWN)                           | 0.3988 ([Global Firepower][1]) |
| 23  | Vietnam (VET)                          | 0.4024 ([Global Firepower][1]) |
| 24  | Saudi Arabia (SAR)                     | 0.4201 ([Global Firepower][1]) |
| 25  | Thailand (THL)                         | 0.4536 ([Global Firepower][1]) |
| 26  | Algeria (ALG)                          | 0.3589 ([Global Firepower][1]) |
| 27  | Sweden (SWE)                           | 0.4835 ([Global Firepower][1]) |
| 28  | Canada (CAN)                           | 0.5179 ([Global Firepower][1]) |
| 29  | Singapore (SNG)                        | 0.5271 ([Global Firepower][1]) |
| 30  | Greece (GRE)                           | 0.5337 ([Global Firepower][1]) |
| 31  | Nigeria (NGA)                          | 0.5771 ([Global Firepower][1]) |
| 32  | Mexico (MEX)                           | 0.5965 ([Global Firepower][1]) |
| 33  | Argentina (ARG)                        | 0.6013 ([Global Firepower][1]) |
| 34  | North Korea (NKO)                      | 0.6016 ([Global Firepower][1]) |
| 35  | Bangladesh (BNG)                       | 0.6062 ([Global Firepower][1]) |
| 36  | Netherlands (NTH)                      | 0.6412 ([Global Firepower][1]) |
| 37  | Myanmar (MYA)                          | 0.6735 ([Global Firepower][1]) |
| 38  | Norway (NOR)                           | 0.6811 ([Global Firepower][1]) |
| 39  | Portugal (POR)                         | 0.6856 ([Global Firepower][1]) |
| 40  | South Africa (SAF)                     | 0.6889 ([Global Firepower][1]) |
| 41  | Philippines (PHL)                      | 0.6987 ([Global Firepower][1]) |
| 42  | Malaysia (MLY)                         | 0.7429 ([Global Firepower][1]) |
| 43  | Iraq (IRQ)                             | 0.7738 ([Global Firepower][1]) |
| 44  | Switzerland (SWZ)                      | 0.7869 ([Global Firepower][1]) |
| 45  | Denmark (DEN)                          | 0.8109 ([Global Firepower][1]) |
| 46  | Colombia (COL)                         | 0.8353 ([Global Firepower][1]) |
| 47  | Chile (CHI)                            | 0.8361 ([Global Firepower][1]) |
| 48  | Finland (FIN)                          | 0.8437 ([Global Firepower][1]) |
| 49  | Peru (PER)                             | 0.8588 ([Global Firepower][1]) |
| 50  | Venezuela (VEN)                        | 0.8882 ([Global Firepower][1]) |
| 51  | Romania (ROM)                          | 0.8984 ([Global Firepower][1]) |
| 52  | Ethiopia (ETH)                         | 0.9305 ([Global Firepower][1]) |
| 53  | Czechia (CZC)                          | 0.9994 ([Global Firepower][1]) |
| 54  | United Arab Emirates (UAE)             | 1.0186 ([Global Firepower][1]) |
| 55  | Hungary (HUN)                          | 1.0259 ([Global Firepower][1]) |
| 56  | Angola (ANG)                           | 1.0961 ([Global Firepower][1]) |
| 57  | Kazakhstan (KAZ)                       | 1.1016 ([Global Firepower][1]) |
| 58  | Uzbekistan (UZB)                       | 1.1121 ([Global Firepower][1]) |
| 59  | Morocco (MOR)                          | 1.1273 ([Global Firepower][1]) |
| 60  | Azerbaijan (AZR)                       | 1.2531 ([Global Firepower][1]) |
| 61  | Belgium (BEL)                          | 1.2564 ([Global Firepower][1]) |
| 62  | Bulgaria (BUL)                         | 1.2563 ([Global Firepower][1]) |
| 63  | Serbia (SRB)                           | 1.2576 ([Global Firepower][1]) |
| 64  | Syria (SYR)                            | 1.2771 ([Global Firepower][1]) |
| 65  | Ecuador (ECU)                          | 1.3021 ([Global Firepower][1]) |
| 66  | Democratic Republic of the Congo (DRC) | 1.3111 ([Global Firepower][1]) |
| 67  | Cuba (CUB)                             | 1.3286 ([Global Firepower][1]) |
| 68  | Austria (AST)                          | 1.3704 ([Global Firepower][1]) |
| 69  | Sri Lanka (SRL)                        | 1.3941 ([Global Firepower][1]) |
| 70  | Belarus (BLR)                          | 1.3954 ([Global Firepower][1]) |
| 71  | Slovakia (SLK)                         | 1.3978 ([Global Firepower][1]) |
| 72  | Qatar (QTR)                            | 1.4307 ([Global Firepower][1]) |
| 73  | Sudan (SDN)                            | 1.4756 ([Global Firepower][1]) |
| 74  | Croatia (CRO)                          | 1.5074 ([Global Firepower][1]) |
| 75  | Jordan (JOR)                           | 1.6139 ([Global Firepower][1]) |
| 76  | Libya (LBY)                            | 1.4449 ([Global Firepower][1]) |
| 77  | Turkmenistan (TKM)                     | 1.6512 ([Global Firepower][1]) |
| 78  | Albania (ALB)                          | 1.6815 ([Global Firepower][1]) |
| 79  | Kuwait (KUW)                           | 1.6982 ([Global Firepower][1]) |
| 80  | Bolivia (BOL)                          | 1.7221 ([Global Firepower][1]) |
| 81  | Bahrain (BAH)                          | 1.7448 ([Global Firepower][1]) |
| 82  | Oman (OMA)                             | 1.8047 ([Global Firepower][1]) |
| 83  | Kenya (KEN)                            | 1.8135 ([Global Firepower][1]) |
| 84  | Chad (CHD)                             | 1.8712 ([Global Firepower][1]) |
| 85  | Yemen (YEM)                            | 1.8901 ([Global Firepower][1]) |
| 86  | New Zealand (NWZ)                      | 1.9039 ([Global Firepower][1]) |
| 87  | Paraguay (PAR)                         | 1.9044 ([Global Firepower][1]) |
| 88  | Lithuania (LIT)                        | 1.9075 ([Global Firepower][1]) |
| 89  | Mozambique (MOZ)                       | 1.9265 ([Global Firepower][1]) |
| 90  | Tunisia (TUN)                          | 1.9538 ([Global Firepower][1]) |
| 91  | Armenia (ARM)                          | 2.0373 ([Global Firepower][1]) |
| 92  | Tanzania (TNZ)                         | 2.0416 ([Global Firepower][1]) |
| 93  | Cameroon (CAM)                         | 2.0501 ([Global Firepower][1]) |
| 94  | Georgia (GEO)                          | 2.0695 ([Global Firepower][1]) |
| 95  | Cambodia (CMB)                         | 2.0752 ([Global Firepower][1]) |
| 96  | Slovenia (SLN)                         | 2.1016 ([Global Firepower][1]) |
| 97  | Ireland (IRE)                          | 2.1103 ([Global Firepower][1]) |
| 98  | Mongolia (MGL)                         | 2.1135 ([Global Firepower][1]) |
| 99  | Latvia (LAT)                           | 2.1246 ([Global Firepower][1]) |
| 100 | Uruguay (URU)                          | 2.1385 ([Global Firepower][1]) |
| 101 | Honduras (HON)                         | 2.1679 ([Global Firepower][1]) |
| 102 | Ivory Coast (IVC)                      | 2.1796 ([Global Firepower][1]) |
| 103 | Guatemala (GUA)                        | 2.1956 ([Global Firepower][1]) |
| 104 | Mali (MAL)                             | 2.2379 ([Global Firepower][1]) |
| 105 | Kyrgyzstan (KYR)                       | 2.2543 ([Global Firepower][1]) |
| 106 | Laos (LAO)                             | 2.2663 ([Global Firepower][1]) |
| 107 | Estonia (EST)                          | 2.2917 ([Global Firepower][1]) |
| 108 | Tajikistan (TJK)                       | 2.3049 ([Global Firepower][1]) |
| 109 | Zambia (ZAM)                           | 2.3411 ([Global Firepower][1]) |
| 110 | Ghana (GHA)                            | 2.3775 ([Global Firepower][1]) |
| 111 | Zimbabwe (ZIM)                         | 2.3863 ([Global Firepower][1]) |
| 112 | North Macedonia (MAC)                  | 2.4042 ([Global Firepower][1]) |
| 113 | South Sudan (SSD)                      | 2.4321 ([Global Firepower][1]) |
| 114 | Uganda (UGA)                           | 2.4767 ([Global Firepower][1]) |
| 115 | Lebanon (LEB)                          | 2.5981 ([Global Firepower][1]) |
| 116 | Namibia (NAM)                          | 2.6384 ([Global Firepower][1]) |
| 117 | Luxembourg (LUX)                       | 2.6415 ([Global Firepower][1]) |
| 118 | Afghanistan (AFG)                      | 2.6442 ([Global Firepower][1]) |
| 119 | Niger (NGR)                            | 2.6689 ([Global Firepower][1]) |
| 120 | Eritrea (ERI)                          | 2.6985 ([Global Firepower][1]) |
| 121 | Republic of the Congo (ROC)            | 2.7282 ([Global Firepower][1]) |
| 122 | Botswana (BOT)                         | 2.7509 ([Global Firepower][1]) |
| 123 | Mauritania (MAU)                       | 2.7977 ([Global Firepower][1]) |
| 124 | Dominican Republic (DOM)               | 2.8023 ([Global Firepower][1]) |
| 125 | Senegal (SEN)                          | 2.8116 ([Global Firepower][1]) |
| 126 | Nepal (NEP)                            | 2.8915 ([Global Firepower][1]) |
| 127 | Montenegro (MTN)                       | 2.9216 ([Global Firepower][1]) |
| 128 | El Salvador (ESL)                      | 2.9371 ([Global Firepower][1]) |
| 129 | Burkina Faso (BKF)                     | 2.9734 ([Global Firepower][1]) |
| 130 | Madagascar (MAD)                       | 3.0609 ([Global Firepower][1]) |
| 131 | Nicaragua (NIC)                        | 3.0966 ([Global Firepower][1]) |
| 132 | Bosnia and Herzegovina (BOS)           | 3.0799 ([Global Firepower][1]) |
| 133 | Gabon (GAB)                            | 3.1805 ([Global Firepower][1]) |
| 134 | Moldova (MOL)                          | 3.2555 ([Global Firepower][1]) |
| 135 | Iceland (ICE)                          | 3.5181 ([Global Firepower][1]) |
| 136 | Panama (PAN)                           | 3.6575 ([Global Firepower][1]) |
| 137 | Belize (BLZ)                           | 3.7191 ([Global Firepower][1]) |
| 138 | Liberia (LIB)                          | 3.7781 ([Global Firepower][1]) |
| 139 | Suriname (SRN)                         | 3.9127 ([Global Firepower][1]) |
| 140 | Sierra Leone (SLE)                     | 3.9701 ([Global Firepower][1]) |
| 141 | Kosovo (KOS)                           | 4.9141 ([Global Firepower][1]) |
| 142 | Somalia (SOM)                          | 4.2037 ([Global Firepower][1]) |
| 143 | Central African Republic (CAR)         | 4.2347 ([Global Firepower][1]) |
| 144 | Benin (BEN)                            | 4.3156 ([Global Firepower][1]) |
| 145 | Bhutan (BUT)                           | 6.3934 ([Global Firepower][1]) |
"""

def generate_ts():
    lines = user_table.strip().split('\n')
    countries = []
    
    for line in lines:
        # Format: | Rank | Name (ID) | PwrIndx ([Link]) |
        # Regex to extract: Rank, Name, ID, PwrIndx
        # Example: | 1   | United States (USA)                    | 0.0744 ([Global Firepower][1]) |
        
        # Remove leading/trailing pipes and whitespace
        clean_line = line.strip('|').strip()
        parts = [p.strip() for p in clean_line.split('|')]
        
        if len(parts) < 3:
            continue
            
        rank_str = parts[0]
        name_id_str = parts[1]
        pwr_str = parts[2]
        
        # Parse Rank
        try:
            rank = int(rank_str)
        except:
            continue
            
        # Parse Name and ID: "United States (USA)"
        name_match = re.match(r'(.+)\s+\(([A-Z]{3})\)', name_id_str)
        if name_match:
            name = name_match.group(1).strip()
            country_id = name_match.group(2)
        else:
            # Fallback if no ID found in parens
            name = name_id_str
            country_id = name[:3].upper()
            
        # Parse PowerIndex: "0.0744 ([Global Firepower][1])"
        pwr_match = re.match(r'(\d+\.\d+)', pwr_str)
        if pwr_match:
            power_index = float(pwr_match.group(1))
        else:
            power_index = 0.0
            
        # Flag URL logic (same as before)
        flag_code = country_id.lower()[:2]
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
        
    print(f"Generated src/lib/rankingData.ts with {len(countries)} countries from user table.")

if __name__ == "__main__":
    generate_ts()
