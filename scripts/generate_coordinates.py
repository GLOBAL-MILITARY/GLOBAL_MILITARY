
import json

# Common coordinates (Latitude, Longitude) for country centroids
# Format: "ISO": [Longitude, Latitude] (GeoJSON format used by D3/React-Simple-Maps)
# Note: Google Maps uses [Lat, Lon], but D3 often uses [Lon, Lat].
# I will output [Lon, Lat] for react-simple-maps.

ID_MAP = {
    "usa": [-95.7129, 37.0902],
    "chn": [104.1954, 35.8617],
    "rus": [105.3188, 61.5240],
    "ind": [78.9629, 20.5937],
    "kor": [127.7669, 35.9078], # South Korea
    "nko": [127.5101, 40.3399], # North Korea
    "gbr": [-3.4360, 55.3781],
    "fra": [2.2137, 46.2276],
    "deu": [10.4515, 51.1657],
    "jpn": [138.2529, 36.2048],
    "tur": [35.2433, 38.9637],
    "irn": [53.6880, 32.4279],
    "isr": [34.8516, 31.0461],
    "ukr": [31.1656, 48.3794],
    "twn": [120.9605, 23.6978],
    "pol": [19.1451, 51.9194],
    "vnm": [108.2772, 14.0583],
    "idn": [113.9213, -0.7893],
    "bra": [-51.9253, -14.2350],
    "egy": [30.8025, 26.8206],
    "aus": [133.7751, -25.2744],
    "can": [-106.3468, 56.1304],
    "ita": [12.5674, 41.8719],
    "sau": [45.0792, 23.8859],
    # Add more as needed or use a library in the future
}

ts_content = """export const COUNTRY_COORDINATES: Record<string, [number, number]> = {
"""

for iso, coords in ID_MAP.items():
    ts_content += f'    "{iso}": [{coords[0]}, {coords[1]}],\n'

ts_content += "};\n"

with open(r'c:\shin_working\war\military-platform\src\lib\countryCoordinates.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Generated src/lib/countryCoordinates.ts")
