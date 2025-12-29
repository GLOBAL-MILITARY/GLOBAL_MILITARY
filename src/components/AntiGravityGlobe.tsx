"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import * as topojson from "topojson-client";
import { geoInterpolate, geoCentroid, geoDistance } from "d3-geo";
// @ts-ignore
import { geoContains } from "d3-geo";
import { useRouter } from "next/navigation";
import { getAllCountries } from "@/lib/mockData";

// --- Constants ---
const GLOBE_RADIUS = 2; // Reduced size for better fit
const DATA_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO 3166-1 Numeric to Alpha-3 Mapping (Partial for major countries, can be expanded)
// This ensures synchronization between TopoJSON IDs (numeric) and our mockData (alpha-3)
const ISO_NUMERIC_TO_ALPHA3: Record<string, string> = {
    "004": "AFG", "008": "ALB", "010": "ATA", "012": "DZA", "016": "ASM", "020": "AND", "024": "AGO", "028": "ATG", "031": "AZE", "032": "ARG", "036": "AUS", "040": "AUT", "044": "BHS", "048": "BHR", "050": "BGD", "051": "ARM", "052": "BRB", "056": "BEL", "060": "BMU", "064": "BTN", "068": "BOL", "070": "BIH", "072": "BWA", "076": "BRA", "084": "BLZ", "090": "SLB", "092": "VGB", "096": "BRN", "100": "BGR", "104": "MMR", "108": "BDI", "112": "BLR", "116": "KHM", "120": "CMR", "124": "CAN", "132": "CPV", "136": "CYM", "140": "CAF", "144": "LKA", "148": "TCD", "152": "CHL", "156": "CHN", "158": "TWN", "170": "COL", "174": "COM", "175": "MYT", "178": "COG", "180": "COD", "184": "COK", "188": "CRI", "191": "HRV", "192": "CUB", "196": "CYP", "203": "CZE", "204": "BEN", "208": "DNK", "212": "DMA", "214": "DOM", "218": "ECU", "222": "SLV", "226": "GNQ", "231": "ETH", "232": "ERI", "233": "EST", "234": "FRO", "238": "FLK", "242": "FJI", "246": "FIN", "248": "ALA", "250": "FRA", "254": "GUF", "258": "PYF", "260": "ATF", "262": "DJI", "266": "GAB", "268": "GEO", "270": "GMB", "275": "PSE", "276": "DEU", "288": "GHA", "292": "GIB", "296": "KIR", "300": "GRC", "304": "GRL", "308": "GRD", "312": "GLP", "316": "GUM", "320": "GTM", "324": "GIN", "328": "GUY", "332": "HTI", "334": "HMD", "336": "VAT", "340": "HND", "344": "HKG", "348": "HUN", "352": "ISL", "356": "IND", "360": "IDN", "364": "IRN", "368": "IRQ", "372": "IRL", "376": "ISR", "380": "ITA", "384": "CIV", "388": "JAM", "392": "JPN", "398": "KAZ", "400": "JOR", "404": "KEN", "408": "PRK", "410": "KOR", "414": "KWT", "417": "KGZ", "418": "LAO", "422": "LBN", "426": "LSO", "428": "LVA", "430": "LBR", "434": "LBY", "438": "LIE", "440": "LTU", "442": "LUX", "446": "MAC", "450": "MDG", "454": "MWI", "458": "MYS", "462": "MDV", "466": "MLI", "470": "MLT", "474": "MTQ", "478": "MRT", "480": "MUS", "484": "MEX", "492": "MCO", "496": "MNG", "498": "MDA", "499": "MNE", "500": "MSR", "504": "MAR", "508": "MOZ", "512": "OMN", "516": "NAM", "520": "NRU", "524": "NPL", "528": "NLD", "531": "CUW", "533": "ABW", "534": "SXM", "535": "BES", "540": "NCL", "548": "VUT", "554": "NZL", "558": "NIC", "562": "NER", "566": "NGA", "570": "NIU", "574": "NFK", "578": "NOR", "580": "MNP", "581": "UMI", "583": "FSM", "584": "MHL", "585": "PLW", "586": "PAK", "591": "PAN", "598": "PNG", "600": "PRY", "604": "PER", "608": "PHL", "612": "PCN", "616": "POL", "620": "PRT", "624": "GNB", "626": "TLS", "630": "PRI", "634": "QAT", "638": "REU", "642": "ROU", "643": "RUS", "646": "RWA", "652": "BLM", "654": "SHN", "659": "KNA", "660": "AIA", "662": "LCA", "663": "MAF", "666": "SPM", "670": "VCT", "674": "SMR", "678": "STP", "682": "SAU", "686": "SEN", "688": "SRB", "690": "SYC", "694": "SLE", "702": "SGP", "703": "SVK", "704": "VNM", "705": "SVN", "706": "SOM", "710": "ZAF", "716": "ZWE", "724": "ESP", "728": "SSD", "729": "SDN", "732": "ESH", "740": "SUR", "744": "SJM", "748": "SWZ", "752": "SWE", "756": "CHE", "760": "SYR", "762": "TJK", "764": "THA", "768": "TGO", "772": "TKL", "776": "TON", "780": "TTO", "784": "ARE", "788": "TUN", "792": "TUR", "795": "TKM", "796": "TCA", "798": "TUV", "800": "UGA", "804": "UKR", "807": "MKD", "818": "EGY", "826": "GBR", "834": "TZA", "840": "USA", "850": "VIR", "854": "BFA", "858": "URY", "860": "UZB", "862": "VEN", "876": "WLF", "882": "WSM", "887": "YEM", "894": "ZMB"
};

// --- Helper Functions ---

// Convert Lat/Lon to 3D Cartesian coordinates
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
}

// Convert 3D Point on Sphere to Lat/Lon
function vector3ToLatLon(point: THREE.Vector3): { lat: number, lon: number } {
    const phi = Math.acos(point.y / GLOBE_RADIUS);
    const theta = Math.atan2(point.z, -point.x); // Note the negative x for correct orientation standard

    const lat = 90 - (phi * 180) / Math.PI;
    const lon = (theta * 180) / Math.PI - 180;

    // Normalize lon to -180 to 180
    let normalizedLon = lon;
    if (normalizedLon < -180) normalizedLon += 360;
    if (normalizedLon > 180) normalizedLon -= 360;

    return { lat, lon };
}

// --- Sub-Components ---

const GlobeBase = () => {
    return (
        <mesh>
            <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
            <meshStandardMaterial
                color="#0f172a" // Slate-950 base
                roughness={0.7}
                metalness={0.1}
            />
            {/* Inner Glow */}
            <mesh scale={[1.01, 1.01, 1.01]}>
                <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
                <meshBasicMaterial
                    color="#1e293b"
                    transparent
                    opacity={0.3}
                    side={THREE.BackSide}
                />
            </mesh>
        </mesh>
    );
};

const Borders = ({ worldData }: { worldData: any }) => {
    const lines = useMemo(() => {
        if (!worldData) return null;

        // Extract mesh for borders
        // @ts-ignore
        const mesh = topojson.mesh(worldData, worldData.objects.countries);

        const points: THREE.Vector3[] = [];
        const { coordinates } = mesh;

        coordinates.forEach((line: any[]) => {
            line.forEach((p, i) => {
                const [lon, lat] = p;
                points.push(latLonToVector3(lat, lon, GLOBE_RADIUS + 0.01));

                // Add duplicate for line segments (except first and last needs care, but Three.js LineSegments expects pairs)
                // Actually simple LineSegments needs pairs: p1-p2, p2-p3...
                // topojson mesh lines are continuous. We need to break them into segments.
                if (i > 0 && i < line.length - 1) {
                    points.push(latLonToVector3(lat, lon, GLOBE_RADIUS + 0.01));
                }
            });
        });

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return geometry;
    }, [worldData]);

    if (!lines) return null;

    return (
        <lineSegments geometry={lines}>
            <lineBasicMaterial color="#38bdf8" opacity={0.6} transparent />
        </lineSegments>
    );
};

const RegionHighlight = ({ feature }: { feature: any }) => {
    const geometry = useMemo(() => {
        if (!feature) return null;

        const points: THREE.Vector3[] = [];

        // Handle Polygon and MultiPolygon
        const polygons = feature.geometry.type === "Polygon"
            ? [feature.geometry.coordinates]
            : feature.geometry.coordinates;

        // Naive border rendering for highlight (converting polygon rings to lines)
        polygons.forEach((poly: any[]) => {
            // Exterior ring is poly[0]
            const ring = poly[0];
            ring.forEach((p: any[], i: number) => {
                const [lon, lat] = p;
                points.push(latLonToVector3(lat, lon, GLOBE_RADIUS + 0.02)); // Slightly higher
                if (i > 0 && i < ring.length - 1) {
                    points.push(latLonToVector3(lat, lon, GLOBE_RADIUS + 0.02));
                }
            });
            // Close loop
            if (ring.length > 0) {
                const first = ring[0];
                const last = ring[ring.length - 1];
                if (first[0] !== last[0] || first[1] !== last[1]) {
                    points.push(latLonToVector3(last[1], last[0], GLOBE_RADIUS + 0.02));
                    points.push(latLonToVector3(first[1], first[0], GLOBE_RADIUS + 0.02));
                }
            }
        });

        return new THREE.BufferGeometry().setFromPoints(points);
    }, [feature]);

    if (!geometry) return null;

    return (
        <lineSegments geometry={geometry}>
            <lineBasicMaterial color="#fcd34d" linewidth={2} /> {/* Gold Highlight */}
        </lineSegments>
    );
}

// --- Main Interactive Globe ---

const RotatingGlobe = ({ onHover, onClick }: { onHover: (iso: string | null, x: number, y: number) => void, onClick: (iso: string) => void }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [worldData, setWorldData] = useState<any>(null);
    const [features, setFeatures] = useState<any[]>([]);
    const [hoveredFeature, setHoveredFeature] = useState<any>(null);
    const { camera, raycaster, mouse } = useThree();

    // Fetch TopoJSON
    useEffect(() => {
        fetch(DATA_URL)
            .then(res => res.json())
            .then(data => {
                setWorldData(data);
                // @ts-ignore
                const featureCollection = topojson.feature(data, data.objects.countries);
                // Ensure we get an array of features
                const parsedFeatures = featureCollection.features || [featureCollection];
                console.log("TopoJSON Features Loaded:", parsedFeatures.length);
                setFeatures(parsedFeatures);
            })
            .catch(err => console.error("Failed to load map data:", err));
    }, []);

    // Raycasting for HOVER interaction
    useFrame(() => {
        if (!meshRef.current || features.length === 0) return;

        // Perform raycasting
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(meshRef.current);

        if (intersects.length > 0) {
            const point = intersects[0].point;
            // Correct logic to transform point to local space if group rotated?
            // Actually, if we rotate the Group (Float), the mesh rotates with it.
            // intersects[0].point is World Space. We need Local Space for latLon calculation if the object was transformed off-origin
            // But we will apply rotation to the Globe, so the geometry matches world space if we account for the object matrix.
            // Simplified: Convert world intersection to local point
            const localPoint = meshRef.current.worldToLocal(point.clone());

            const { lat, lon } = vector3ToLatLon(localPoint);
            // Debug Log (throttle this in real app, but useful for now)
            // console.log("Raycast Hit:", lat, lon); 

            // Find feature containing this point
            // This is computationally heavy to do every frame for 170+ countries using geoContains
            // Optimization: Only check if mouse moved significantly?
            // Or use a bounding box pre-check.

            // For now, simple find (Performance warning!)
            // We can optimize by converting Lat/Lon to [lon, lat]
            const coords = [lon, lat];

            // @ts-ignore
            const found = features.find(f => geoContains(f, coords));

            if (found) {
                if (found !== hoveredFeature) {
                    setHoveredFeature(found);

                    // Logic duplication from click handler - acceptable for now or refactor
                    let iso = found.properties?.ISO_A3;
                    if (!iso) {
                        const numericId = String(found.id).padStart(3, '0');
                        iso = ISO_NUMERIC_TO_ALPHA3[numericId] || String(found.id);
                    }

                    onHover(iso, mouse.x, mouse.y);
                }
            } else {
                if (hoveredFeature) {
                    setHoveredFeature(null);
                    onHover(null, 0, 0);
                }
            }
        } else {
            if (hoveredFeature) {
                setHoveredFeature(null);
                onHover(null, 0, 0);
            }
        }
    });



    // Direct Click Handling (Robust Nearest-Centroid Strategy)
    const handleGlobeClick = (event: any) => {
        event.stopPropagation();

        if (!meshRef.current || features.length === 0) return;

        // Get exact click point in local space
        const point = event.point;
        const localPoint = meshRef.current.worldToLocal(point.clone());
        const { lat, lon } = vector3ToLatLon(localPoint);
        const clickCoords = [lon, lat];

        console.log("Click Coords:", clickCoords);

        // Strategy: Instead of strict point-in-polygon (which fails on borders/precision),
        // Find the closest country centroid to the click.

        let closestFeature = null;
        let minDistance = Infinity;

        // Threshold: ~5 degrees (allows clicking slightly outside but catches the country)
        // d3.geoDistance returns radians. 1 degree ~= 0.017 rads. 5 deg ~= 0.08
        // Let's be generous: 0.1 rads (~5-6 degrees)
        const MAX_DIST_RAD = 0.1;

        features.forEach(f => {
            // Calculate centroid if not cached (could optimize by caching)
            const center = geoCentroid(f);
            const dist = geoDistance(clickCoords, center);

            if (dist < minDistance) {
                minDistance = dist;
                closestFeature = f;
            }
        });

        // Logic to resolve ISO from Feature
        const getIsoFromFeature = (f: any): string => {
            // 1. Try properties.ISO_A3 (if available)
            if (f.properties?.ISO_A3) return f.properties.ISO_A3;
            // 2. Try Numeric ID -> Alpha-3 Mapping
            // Ensure ID is padded string "004" etc.
            const numericId = String(f.id).padStart(3, '0');
            if (ISO_NUMERIC_TO_ALPHA3[numericId]) return ISO_NUMERIC_TO_ALPHA3[numericId];
            // 3. Fallback to raw ID
            return String(f.id);
        };

        if (closestFeature && minDistance < MAX_DIST_RAD) {
            const iso = getIsoFromFeature(closestFeature);
            console.log("Navigating to (Proximity):", iso);
            onClick(iso);
        } else {
            // Fallback: If not close to center, try strict containment one last time
            // @ts-ignore
            const exactMatch = features.find(f => geoContains(f, clickCoords));
            if (exactMatch) {
                const iso = getIsoFromFeature(exactMatch);
                console.log("Navigating to (Exact):", iso);
                onClick(iso);
            } else {
                console.warn("No country found near click.");
            }
        }
    };

    return (
        <group>
            <mesh
                ref={meshRef}
                onClick={handleGlobeClick}
                onPointerMissed={() => { }} // avoid bubbling
            >
                <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
                <meshBasicMaterial transparent opacity={0} /> {/* Invisible interaction sphere */}
            </mesh>

            <GlobeBase />
            <Borders worldData={worldData} />
            {hoveredFeature && <RegionHighlight feature={hoveredFeature} />}
        </group>
    );
};


// --- Component Export ---

const AntiGravityGlobe = () => {
    const router = useRouter();
    const countries = getAllCountries();
    const [hoveredInfo, setHoveredInfo] = useState<{ name: string, rank: number } | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const isoMap = useMemo(() => new Map(countries.map(c => [c.id.toUpperCase(), c])), [countries]);

    // Comprehensive Alpha-3 to Name Mapping for Fallback
    const ISO_ALPHA3_TO_NAME: Record<string, string> = {
        "AFG": "Afghanistan", "ALB": "Albania", "DZA": "Algeria", "ASM": "American Samoa", "AND": "Andorra",
        "AGO": "Angola", "AIA": "Anguilla", "ATA": "Antarctica", "ATG": "Antigua and Barbuda", "ARG": "Argentina",
        "ARM": "Armenia", "ABW": "Aruba", "AUS": "Australia", "AUT": "Austria", "AZE": "Azerbaijan",
        "BHS": "Bahamas", "BHR": "Bahrain", "BGD": "Bangladesh", "BRB": "Barbados", "BLR": "Belarus",
        "BEL": "Belgium", "BLZ": "Belize", "BEN": "Benin", "BMU": "Bermuda", "BTN": "Bhutan",
        "BOL": "Bolivia", "BES": "Bonaire, Sint Eustatius and Saba", "BIH": "Bosnia and Herzegovina",
        "BWA": "Botswana", "BVT": "Bouvet Island", "BRA": "Brazil", "IOT": "British Indian Ocean Territory",
        "BRN": "Brunei Darussalam", "BGR": "Bulgaria", "BFA": "Burkina Faso", "BDI": "Burundi",
        "CPV": "Cabo Verde", "KHM": "Cambodia", "CMR": "Cameroon", "CAN": "Canada", "CYM": "Cayman Islands",
        "CAF": "Central African Republic", "TCD": "Chad", "CHL": "Chile", "CHN": "China", "CXR": "Christmas Island",
        "CCK": "Cocos (Keeling) Islands", "COL": "Colombia", "COM": "Comoros", "COD": "Congo (DRC)",
        "COG": "Congo", "COK": "Cook Islands", "CRI": "Costa Rica", "HRV": "Croatia", "CUB": "Cuba",
        "CUW": "Curaçao", "CYP": "Cyprus", "CZE": "Czechia", "CIV": "Côte d'Ivoire", "DNK": "Denmark",
        "DJI": "Djibouti", "DMA": "Dominica", "DOM": "Dominican Republic", "ECU": "Ecuador", "EGY": "Egypt",
        "SLV": "El Salvador", "GNQ": "Equatorial Guinea", "ERI": "Eritrea", "EST": "Estonia", "SWZ": "Eswatini",
        "ETH": "Ethiopia", "FLK": "Falkland Islands", "FRO": "Faroe Islands", "FJI": "Fiji", "FIN": "Finland",
        "FRA": "France", "GUF": "French Guiana", "PYF": "French Polynesia", "ATF": "French Southern Territories",
        "GAB": "Gabon", "GMB": "Gambia", "GEO": "Georgia", "DEU": "Germany", "GHA": "Ghana", "GIB": "Gibraltar",
        "GRC": "Greece", "GRL": "Greenland", "GRD": "Grenada", "GLP": "Guadeloupe", "GUM": "Guam",
        "GTM": "Guatemala", "GGY": "Guernsey", "GIN": "Guinea", "GNB": "Guinea-Bissau", "GUY": "Guyana",
        "HTI": "Haiti", "HMD": "Heard Island and McDonald Islands", "VAT": "Holy See", "HND": "Honduras",
        "HKG": "Hong Kong", "HUN": "Hungary", "ISL": "Iceland", "IND": "India", "IDN": "Indonesia",
        "IRN": "Iran", "IRQ": "Iraq", "IRL": "Ireland", "IMN": "Isle of Man", "ISR": "Israel", "ITA": "Italy",
        "JAM": "Jamaica", "JPN": "Japan", "JEY": "Jersey", "JOR": "Jordan", "KAZ": "Kazakhstan", "KEN": "Kenya",
        "KIR": "Kiribati", "PRK": "North Korea", "KOR": "South Korea", "KWT": "Kuwait", "KGZ": "Kyrgyzstan",
        "LAO": "Laos", "LVA": "Latvia", "LBN": "Lebanon", "LSO": "Lesotho", "LBR": "Liberia", "LBY": "Libya",
        "LIE": "Liechtenstein", "LTU": "Lithuania", "LUX": "Luxembourg", "MAC": "Macao", "MDG": "Madagascar",
        "MWI": "Malawi", "MYS": "Malaysia", "MDV": "Maldives", "MLI": "Mali", "MLT": "Malta", "MHL": "Marshall Islands",
        "MTQ": "Martinique", "MRT": "Mauritania", "MUS": "Mauritius", "MYT": "Mayotte", "MEX": "Mexico",
        "FSM": "Micronesia", "MDA": "Moldova", "MCO": "Monaco", "MNG": "Mongolia", "MNE": "Montenegro",
        "MSR": "Montserrat", "MAR": "Morocco", "MOZ": "Mozambique", "MMR": "Myanmar", "NAM": "Namibia",
        "NRU": "Nauru", "NPL": "Nepal", "NLD": "Netherlands", "NCL": "New Caledonia", "NZL": "New Zealand",
        "NIC": "Nicaragua", "NER": "Niger", "NGA": "Nigeria", "NIU": "Niue", "NFK": "Norfolk Island",
        "MKD": "North Macedonia", "MNP": "Northern Mariana Islands", "NOR": "Norway", "OMN": "Oman",
        "PAK": "Pakistan", "PLW": "Palau", "PSE": "Palestine", "PAN": "Panama", "PNG": "Papua New Guinea",
        "PRY": "Paraguay", "PER": "Peru", "PHL": "Philippines", "PCN": "Pitcairn", "POL": "Poland",
        "PRT": "Portugal", "PRI": "Puerto Rico", "QAT": "Qatar", "ROU": "Romania", "RUS": "Russia",
        "RWA": "Rwanda", "REU": "Réunion", "BLM": "Saint Barthélemy", "SHN": "Saint Helena",
        "KNA": "Saint Kitts and Nevis", "LCA": "Saint Lucia", "MAF": "Saint Martin", "SPM": "Saint Pierre and Miquelon",
        "VCT": "Saint Vincent and the Grenadines", "WSM": "Samoa", "SMR": "San Marino", "STP": "Sao Tome and Principe",
        "SAU": "Saudi Arabia", "SEN": "Senegal", "SRB": "Serbia", "SYC": "Seychelles", "SLE": "Sierra Leone",
        "SGP": "Singapore", "SXM": "Sint Maarten", "SVK": "Slovakia", "SVN": "Slovenia", "SLB": "Solomon Islands",
        "SOM": "Somalia", "ZAF": "South Africa", "SGS": "South Georgia and the South Sandwich Islands",
        "SSD": "South Sudan", "ESP": "Spain", "LKA": "Sri Lanka", "SDN": "Sudan", "SUR": "Suriname",
        "SJM": "Svalbard and Jan Mayen", "SWE": "Sweden", "CHE": "Switzerland", "SYR": "Syria", "TWN": "Taiwan",
        "TJK": "Tajikistan", "TZA": "Tanzania", "THA": "Thailand", "TLS": "Timor-Leste", "TGO": "Togo",
        "TKL": "Tokelau", "TON": "Tonga", "TTO": "Trinidad and Tobago", "TUN": "Tunisia", "TUR": "Turkiye",
        "TKM": "Turkmenistan", "TCA": "Turks and Caicos Islands", "TUV": "Tuvalu", "UGA": "Uganda",
        "UKR": "Ukraine", "ARE": "United Arab Emirates", "GBR": "United Kingdom", "USA": "United States",
        "UMI": "US Minor Outlying Islands", "URY": "Uruguay", "UZB": "Uzbekistan", "VUR": "Vanuatu",
        "VEN": "Venezuela", "VNM": "Vietnam", "VGB": "British Virgin Islands", "VIR": "US Virgin Islands",
        "WLF": "Wallis and Futuna", "ESH": "Western Sahara", "YEM": "Yemen", "ZMB": "Zambia", "ZWE": "Zimbabwe"
    };

    // Internal Data vs Standard ISO Mismatches
    // Some entries in mockData.ts use custom IDs (e.g. SKO instead of KOR).
    // We map Standard ISO (from map) -> Internal ID (from mockData) here.
    const STANDARD_TO_INTERNAL_MAPPING: Record<string, string> = {
        // Major Powers & specific overrides
        "KOR": "SKO", "GBR": "UKD", "TUR": "TKY", "IDN": "INO",
        // Europe
        "DEU": "GER", "FRA": "FRA", "ITA": "ITA", "ESP": "SPN", "PRT": "POR",
        "NLD": "NTH", "BEL": "BEL", "DNK": "DEN", "NOR": "NOR", "SWE": "SWE",
        "FIN": "FIN", "CHE": "CHE", "AUT": "AST", "POL": "POL", "CZE": "CZC",
        "SVK": "SLK", "HUN": "HUN", "ROU": "ROM", "BGR": "BUL", "GRC": "GRE",
        "SRB": "SER", "HRV": "CRO", "SVN": "SLN", "BIH": "BOS", "MNE": "MTN",
        "MKD": "MAC", "ALB": "ALB", "UKR": "UKR", "BLR": "BLR", "MDA": "MOL",
        "EST": "EST", "LVA": "LAT", "LTU": "LIT", "IRL": "IRE", "ISL": "ICE",
        // Asia
        "CHN": "CHN", "JPN": "JPN", "IND": "IND", "PAK": "PAK", "BGD": "BNG",
        "LKA": "SRL", "NPL": "NEP", "BTN": "BUT", "THA": "THL", "MMR": "MYA",
        "KHM": "CMB", "LAO": "LAO", "VNM": "VET", "MYS": "MLY", "SGP": "SNG",
        "PHL": "PHI", "TWN": "ROC", "PRK": "NKO", "MNG": "MGL",
        // Middle East & Central Asia
        "ISR": "ISR", "SAU": "SAR", "IRN": "IRN", "IRQ": "IRQ", "SYR": "SYR",
        "JOR": "JOR", "LBN": "LEB", "KWT": "KUW", "QAT": "QTR", "BHR": "BAH",
        "ARE": "UAE", "OMN": "OMA", "YEM": "YEM", "AFG": "AFG", "KAZ": "KAZ",
        "UZB": "UZB", "TKM": "TKM", "KGZ": "KYR", "TJK": "TAJ", "AZE": "AZR",
        "GEO": "GEO", "ARM": "ARM",
        // Americas
        "USA": "USA", "CAN": "CAN", "MEX": "MEX", "GTM": "GUA", "BLZ": "BLZ",
        "SLV": "ESL", "HND": "HON", "NIC": "NIC", "CRI": "COS", "PAN": "PAN",
        "COL": "COL", "VEN": "VEN", "ECU": "ECU", "PER": "PER", "BOL": "BOL",
        "BRA": "BRA", "PRY": "PAR", "URY": "URU", "ARG": "ARG", "CHL": "CHI",
        "CUB": "CUB", "DOM": "DOM", "HTI": "HAI",
        // Africa
        "EGY": "EGY", "LBY": "LIB", "TUN": "TUN", "DZA": "ALG", "MAR": "MOR",
        "SDN": "SUD", "SSD": "SSD", "ETH": "ETH", "ERI": "ERI", "DJI": "DJI",
        "SOM": "SOM", "KEN": "KEN", "TZA": "TNZ", "UGA": "UGA", "RWA": "RWA",
        "BDI": "BDI", "AGO": "ANG", "MOZ": "MOZ", "ZMB": "ZAM", "ZWE": "ZIM",
        "MWI": "MWI", "ZAF": "SAF", "NAM": "NAM", "BWA": "BOT", "LSO": "LES",
        "SWZ": "SWA", "MDG": "MAD", "MUS": "MAU", "NGA": "NGR", "GHA": "GHA",
        "CIV": "IVC", "CMR": "CAM", "GAB": "GAB", "COG": "CON", "COD": "DRC",
        "TCD": "CHD", "CAF": "CAR", "NER": "NIG", "MLI": "MAL", "BFA": "BKF",
        "SEN": "SEN", "GMB": "GAM", "GIN": "GUI", "SLE": "SIE", "LBR": "LIB",
        "MRT": "MAU",
        // Oceania
        "AUS": "AUS", "NZL": "NWZ", "PNG": "PNG", "FJI": "FIJ"
    };

    const handleHover = (iso: string | null, mouseX: number, mouseY: number) => {
        if (iso) {
            let searchId = iso.toUpperCase();
            // Remap if there is a known mismatch
            if (STANDARD_TO_INTERNAL_MAPPING[searchId]) {
                searchId = STANDARD_TO_INTERNAL_MAPPING[searchId];
            }

            // 1. Try to find in our military database (isoMap)
            const country = isoMap.get(searchId);
            if (country) {
                setHoveredInfo({ name: country.name, rank: country.rank });
            } else {
                // 2. If not in DB, try the comprehensive name list (using original ISO)
                // We use original 'iso' here because the name map keys are standard ISOs
                const fallbackName = ISO_ALPHA3_TO_NAME[iso.toUpperCase()];
                if (fallbackName) {
                    setHoveredInfo({ name: fallbackName, rank: 0 }); // Rank 0 = Unranked
                } else if (/^\d+$/.test(iso)) {
                    // 3. Still numeric? (Mapping failed)
                    setHoveredInfo({ name: "Unknown Territory", rank: 0 });
                } else {
                    // 4. Just show the ISO code if nothing else
                    setHoveredInfo({ name: iso, rank: 0 });
                }
            }
        } else {
            setHoveredInfo(null);
        }
    };

    const handleClick = (iso: string) => {
        let searchId = iso.toUpperCase();
        if (STANDARD_TO_INTERNAL_MAPPING[searchId]) {
            searchId = STANDARD_TO_INTERNAL_MAPPING[searchId];
        }

        const country = isoMap.get(searchId);

        if (country) {
            console.log(`Navigating to verified country: ${country.name} (${country.id})`);
            router.push(`/country/${country.id}`);
        } else {
            console.warn(`Click ignored: Country with ISO ${iso} (mapped: ${searchId}) not found in database.`);
            // Optional: Show a toast or feedback to the user
        }
    };

    return (
        <div className="w-full h-[600px] relative bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            {/* 3D Scene */}
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
                <color attach="background" args={["#020617"]} />
                <ambientLight intensity={0.5} color="#94a3b8" />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f472b6" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {/* Anti-Gravity Float Animation */}
                <RotatingGlobe onHover={handleHover} onClick={handleClick} />

                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={3}
                    maxDistance={10}
                    autoRotate={false}
                    autoRotateSpeed={0.5}
                />

                <EffectComposer>
                    <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={1.5} />
                </EffectComposer>
            </Canvas>

            {/* UI Overlay: Title */}
            <div className="absolute top-6 left-6 pointer-events-none">
                <h2 className="text-2xl font-bold text-white tracking-wider flex items-center gap-2">
                    <span className="w-2 h-8 bg-blue-500 rounded-full animate-pulse"></span>
                    GLOBAL COMMAND
                </h2>
                <div className="text-blue-400 text-xs tracking-[0.2em] mt-1 uppercase">
                    Interactive Data Visualization
                </div>
            </div>

            {/* UI Overlay: Tooltip */}
            {hoveredInfo && (
                <div
                    className="absolute pointer-events-none z-20 backdrop-blur-md bg-slate-900/80 border border-blue-500/50 p-4 rounded-lg shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-75"
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >

                    <div className="text-2xl font-bold text-white">{hoveredInfo.name}</div>
                    {hoveredInfo.rank > 0 && (
                        <div className="text-lg text-emerald-400 font-mono mt-1 font-bold">
                            Global Rank: #{hoveredInfo.rank}
                        </div>
                    )}

                </div>
            )}

            {/* Scanlines Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"></div>
        </div>
    );
};

export default AntiGravityGlobe;
