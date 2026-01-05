import { Swords, Shield, Crosshair } from "lucide-react";

export type PersonalityType = "OFFENSIVE" | "DEFENSIVE" | "NEUTRAL";
export type ScenarioType = "TOTAL_WAR" | "NAVAL_BLOCKADE" | "AIR_SUPERIORITY" | "BORDER_SKIRMISH";

export interface Tactic {
    id: string;
    name: string;
    description: string;
    personality: PersonalityType;
    scenario: ScenarioType;
}

export const PERSONALITY_INFO: Record<PersonalityType, { label: string; icon: any; color: string; desc: string }> = {
    "OFFENSIVE": { label: "OFFENSIVE", icon: Swords, color: "text-red-500", desc: "+10% Dmg Dealt, +5% Dmg Taken" },
    "DEFENSIVE": { label: "DEFENSIVE", icon: Shield, color: "text-blue-500", desc: "-10% Dmg Output, -15% Dmg Taken" },
    "NEUTRAL": { label: "NEUTRAL", icon: Crosshair, color: "text-slate-400", desc: "Standard Combat Stats" }
};

export const PREDEFINED_PERSONALITIES: Record<string, PersonalityType> = {
    // Offensive (Power projection / Aggressive posture)
    "usa": "OFFENSIVE", "rus": "OFFENSIVE", "chn": "OFFENSIVE",
    "nko": "OFFENSIVE", "isr": "OFFENSIVE", "irn": "OFFENSIVE",
    "tur": "OFFENSIVE", "tky": "OFFENSIVE", "gbr": "OFFENSIVE",
    "fra": "OFFENSIVE", // Expeditionary capability

    // Defensive (Territorial defense / Deterrence)
    "sko": "DEFENSIVE", "ukr": "DEFENSIVE", "twn": "DEFENSIVE",
    "pol": "DEFENSIVE", "fin": "DEFENSIVE", "vnm": "DEFENSIVE",
    "ind": "DEFENSIVE", "egy": "DEFENSIVE", "che": "DEFENSIVE",
    "swe": "DEFENSIVE", "tjk": "DEFENSIVE", "arm": "DEFENSIVE",

    // Neutral/Balanced (Expeditionary but peacekeeping / Mixed)
    "ukd": "NEUTRAL", "deu": "NEUTRAL", "ger": "NEUTRAL",
    "jpn": "NEUTRAL", "ita": "NEUTRAL", "bra": "NEUTRAL",
    "can": "NEUTRAL", "aus": "NEUTRAL", "idn": "NEUTRAL",
    "ino": "NEUTRAL", "sau": "NEUTRAL"
};

export function getPersonality(id: string): PersonalityType {
    return PREDEFINED_PERSONALITIES[id.toLowerCase()] || "NEUTRAL";
}

export const ALL_TACTICS: Tactic[] = [
    {
        id: "offensive_total_war_0",
        name: "Wave Attack Strategy",
        description: "Continuous waves of attackers physically wear down enemy defenses...",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_1",
        name: "Capital Decapitation Strike",
        description: "Elite units strike directly at enemy heart to collapse command structure. Targets key political/military figures for early war termination.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_2",
        name: "Scorched Earth Advance",
        description: "Destroy all resources and infrastructure while advancing. Ensures enemy cannot use the land again even if they retreat.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_3",
        name: "Armored Blitzkrieg",
        description: "Use overwhelming armor mobility to break the weakest link. Then cut rear supply lines to complete a massive encirclement.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_4",
        name: "Unlimited General Offensive",
        description: "Concentrate all firepower on one point to break enemy will. A gamble using maximum supply capacity for a quick victory.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_5",
        name: "Deep Operations Breakthrough",
        description: "Thrust deep into enemy rear, past the first line. Aim is to neutralize rear command posts before reserves deploy.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_6",
        name: "Supply Line Raid",
        description: "Deploy special forces to hit fuel and ammo depots. Starved of supplies, the enemy must retreat despite Superior firepower.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_7",
        name: "Urban Warfare Assault",
        description: "Infantry and support fire rapidly seize urban areas. High-intensity operation clearing buildings one by one to destroy resistance.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_8",
        name: "Concentrated Fire Strike",
        description: "Mobilize all artillery to erase a specific area from the map. Executed to neutralize fixed defenses before advancing.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_9",
        name: "Psychological Collapse Operation",
        description: "Combine propaganda and cyber attacks to incite internal revolt. A sophisticated strategy to degrade enemy power without physical combat.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_10",
        name: "Last Stand Charge",
        description: "Cut off retreat and charge frantically with no way out. Boots morale to the extreme to overcome numerical inferiority.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_11",
        name: "Forced Occupation",
        description: "Deploy troops immediately to establish effective control, ignoring diplomacy. Prioritizes seizing key points despite international condemnation.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_12",
        name: "Firepower Annihilation",
        description: "Lure enemy main force into a zone and destroy them with concentrated fire. Most destructive attack aimed at preventing enemy recovery.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_13",
        name: "Rapid Maneuver Warfare",
        description: "Light units move fast via unexpected routes to hit the rear. Seize initiative with maneuver speed faster than enemy response.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_14",
        name: "Frontline Shattering",
        description: "Strike defense center with heavy fire to split the front. Destroy isolated enemies piecemeal to collapse the defense system.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_15",
        name: "Armed Surrender Ultimatum",
        description: "Deploy overwhelming force and issue ultimatum for surrender. Aim for victory without fighting, but launch total attack if refused.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_16",
        name: "Infrastructure Paralysis",
        description: "Strike key infrastructure like power and comms to paralyze war capability. Collapses the entire state system, not just military.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_17",
        name: "Night Raid Assault",
        description: "Deploy elite troops with night vision when enemy visibility is low. Seize key points quickly while enemy is in chaos.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_18",
        name: "Mercenary & Ally Deployment",
        description: "Hire external forces or bring in allies to fill power gaps. Increases attack intensity while reducing friendly casualties.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_19",
        name: "Final Blow",
        description: "Commit hidden reserves when enemy defense is at its limit. Pour in all resources to seal the victory.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_naval_blockade_20",
        name: "Wolfpack Submarine Tactic",
        description: "Scatter submarines to attack convoys from all sides. Sink transports with multi-angle strikes difficult for escorts to counter.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_21",
        name: "Port Surprise Bombing",
        description: "Massive airstrikes on key naval/commercial ports to paralyze them. Destroy docked ships and facilities to cut sea supply.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_22",
        name: "Unrestricted Submarine Warfare",
        description: "Sink any ship in the blockade zone, regardless of nationality. Most extreme tactic to isolate enemy economy.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_23",
        name: "Supply Ship Hunting",
        description: "Prioritize hunting tankers and freighters heading to the front. Deplete fuel and ammo, affecting land combat.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_24",
        name: "Maritime Gateway Seizure",
        description: "Seize choke points like straits or canals by force. Strangle logistics and control enemy fleet movement.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_25",
        name: "Offensive Visual Mining",
        description: "Deploy stealth mines right off enemy ports. Inflict damage as soon as they leave, suppressing naval projection.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_26",
        name: "Direct Fleet Assault",
        description: "Lead main fleet into decisive battle against blockade fleet. Aim to destroy enemy capital ships for total sea control.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_27",
        name: "Coastal Beachhead Securing",
        description: "Occupy islands or coastal points inside blockade zone as forward bases. Deploy anti-ship missiles to strengthen control.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_28",
        name: "Littoral Combat Ship Charge",
        description: "Use small, fast littoral ships to ambush large vessels close. Exploit agility in narrow waters to hit blind spots.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_29",
        name: "Sea Supply Line Cut",
        description: "Seize shortest route between enemy home and allies. Cut long-range trade to severely hit economy.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_30",
        name: "Landing Fleet Escort",
        description: "Escort massive landing force through blockade to enemy mainland. Strong offensive aiming for sea control and ground war shift.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_31",
        name: "Port Blockade Breakthrough",
        description: "Push back blockading fleet with concentrated fire to breakout. Extract isolated forces to prepare counter-attack.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_32",
        name: "Ocean Base Seizure",
        description: "Attack and seize enemy oil rigs or sea bases. Steal resource sources and convert to friendly outposts.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_33",
        name: "Underwater Special Ops",
        description: "Deploy divers to attach explosives to docked ship hulls. Stealth tactic to sink capital ships without fleet battle.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_34",
        name: "Enemy Fleet Lure & Destroy",
        description: "Use decoy ships to lure enemy into missile range. Ambush forces strike flank while enemy focuses on chase.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_35",
        name: "Maritime Supremacy Seizure",
        description: "Deploy all fleets to erase enemy presence in a zone. Overwhelming numbers prevent enemy from even attempting to sail.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_36",
        name: "Long-range Naval Gunfire",
        description: "Pound coastal defenses with long-range guns and missiles. Remove threats from safe distance, then tighten blockade.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_37",
        name: "Merchant Ship Seizure",
        description: "Capture merchant ships instead of sinking them. Economic tactic turning enemy loss into friendly gain.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_38",
        name: "Naval Patrol Annihilation",
        description: "Hunt down recon ships and patrol planes first. Blind the enemy, then main fleet strikes from surprise position.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_39",
        name: "Deep Sea Ambush",
        description: "Use silent subs to penetrate sonar net into fleet center. Torpedo vulnerable carriers or supply ships at close range.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_border_skirmish_40",
        name: "Outpost Raid",
        description: "Simultaneously attack and seize enemy border outposts. Paralyze alert network and open entry into border.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_41",
        name: "Surprise Border Crossing",
        description: "Cross border rapidly without war declaration. Seize key roads and bridges before enemy prepares defense.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_42",
        name: "Local Assault",
        description: "Target and seize specific border towns or industrial zones with heavy fire. Local victory aimed at boosting diplomatic leverage.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_43",
        name: "DMZ Neutralization",
        description: "Ignore buffer zone and forward deploy heavy weapons. Break psychological line and show readiness to attack.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_44",
        name: "Special Forces Infiltration",
        description: "Infiltrate elite troops via mountains/forests at night. Destroy rear comms and supply depots to cause chaos.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_45",
        name: "Border Pushing",
        description: "Push border forward with massive armored front. Encroach territory little by little using physical force.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_46",
        name: "Pre-emptive Strike",
        description: "Shell enemy gatherings near border preemptively. Break attack will early and turn defense advantage into offense.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_47",
        name: "Rapid Reaction Force Deployment",
        description: "Deploy rapid response with helis/IFVs to seize border points. Take terrain advantage first to prevent counter-attack.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_48",
        name: "Comms Base Destruction",
        description: "Strike border radars/towers with precision missiles. Blind the enemy, then move large forces across.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_49",
        name: "Border Artillery Duel",
        description: "Bombard military facilities with self-propelled guns and MLRS. Neutralize defense with fire alone, no infantry advance.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_50",
        name: "Ambush & Annihilate",
        description: "Lure border patrols into ambush and destroy. Wear down enemy manpower through frequent attrition.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_51",
        name: "Barrier Destruction",
        description: "Blow up border barriers/fences and send in tanks. Render physical barriers useless and show force.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_52",
        name: "High Ground Recapture",
        description: "Attack highest ground near border for observation/fire control. Control tens of km around by seizing the hill.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_53",
        name: "Night Infiltration",
        description: "Infiltrate silent units at dawn when guard is low. Assassinate commanders or steal docs and return.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_54",
        name: "Reconnaissance in Force",
        description: "Penetrate deep disguised as recon. Identify enemy fire/positions while inflicting local damage.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_55",
        name: "Supply Depot Looting",
        description: "Raid border warehouses to steal supplies. Solve friendly supply issues while destroying enemy self-sufficiency.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_56",
        name: "Rail Network Destruction",
        description: "Blow up cross-border rail/roads to delay reinforcements. Prep work to easily suppress isolated guards.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_57",
        name: "Forward Command Strike",
        description: "Precision strike on border command posts. Cut command chain, confusing enemy for piecemeal defeat.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_58",
        name: "Defense Line Disruption",
        description: "Small attacks at multiple points to disperse defense. Send main force to real target while enemy moves.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_59",
        name: "Border Occupation",
        description: "Occupy the border line itself to block entry and advance. Turn border into attack base, changing war tide.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_air_superiority_60",
        name: "Total Air Superiority",
        description: "Launch all fighters to completely eliminate enemy air power in the sky. Create an environment where not a single enemy plane can fly, ensuring ground force safety.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_61",
        name: "Strategic Bomber Deployment",
        description: "Deploy massive bomber formations to devastate enemy industrial centers and major cities. A powerful aerial assault that obliterates the enemy's will to fight.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_62",
        name: "Drone Swarm Raid",
        description: "Launch thousands of small suicide drones simultaneously to paralyze enemy air defenses. Exhaust expensive anti-air missiles with cheap drones, then strike the target.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_63",
        name: "Airfield Pre-emptive Strike",
        description: "Strike all enemy runways and hangars with precision missiles at war's start. Prevent enemy air force from even taking off, seizing control of the skies.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_64",
        name: "High-Altitude Missile Bombing",
        description: "Launch guided missiles from the stratosphere beyond enemy radar range. Strikes from invisible heights inflict extreme terror on the enemy.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_65",
        name: "SEAD Operation",
        description: "Hunt enemy surface-to-air missile sites with specialized aircraft carrying anti-radar missiles. Prioritize eliminating air defenses, the biggest obstacle to aerial attacks.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_66",
        name: "Close Air Support (CAS)",
        description: "Coordinate closely with ground forces to directly attack enemy units at the front line. Fly low and destroy enemy armored units with Gatling guns and rockets.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_67",
        name: "Air Assault",
        description: "Deploy massive paratrooper forces to enemy rear strategic points using transports and helicopters. Leapfrog enemy defense lines through the sky to seize key positions directly.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_68",
        name: "Aerial Refueling Operation",
        description: "Deploy aerial refueling tankers to dramatically extend fighter operational range and loiter time. Enable uninterrupted attacks deep into enemy homeland.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_69",
        name: "Electronic Warfare Deception",
        description: "Generate hundreds of fake signals on enemy radar using powerful jamming equipment. Lead confused enemy to fire missiles at empty air, then launch the real attack.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_70",
        name: "Fighter Patrol Annihilation",
        description: "Prioritize shooting down enemy reconnaissance planes and early warning aircraft patrolling specific areas. Cut off enemy intelligence gathering to conceal friendly movements.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_71",
        name: "Fixed Target Bombing",
        description: "Use special bombs like bunker busters to destroy enemy underground bunkers and fortified strongholds. Show that no matter how deep they hide, aerial strikes cannot be avoided.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_72",
        name: "Runway Destruction",
        description: "Use penetrating warheads to punch massive holes in enemy runways, preventing takeoffs and landings. An effective blockade tactic that keeps enemy air force grounded until repairs are made.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_73",
        name: "AWACS Strike",
        description: "Strike enemy command aircraft to eliminate the control tower of aerial warfare. Destroy enemy fighters individually after they lose command to gain air superiority.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_74",
        name: "Guided Missile Barrage",
        description: "Launch hundreds of cruise missiles simultaneously to overload enemy air defenses beyond capacity. Even if some missiles are shot down, the rest will certainly destroy the targets.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_75",
        name: "Supersonic Penetration",
        description: "Break through enemy defense lines at supersonic speed, attack in the blink of an eye, and vanish. A lightning-fast operation that ends the situation before the enemy can even check their radar.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_76",
        name: "Aerial Interception",
        description: "Intercept enemy bomber formations heading toward friendly homeland in mid-air. Crush enemy attack attempts in the sky to completely prevent ground damage.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_77",
        name: "Satellite Recon Strike",
        description: "Conduct pinpoint aerial bombardment using real-time coordinates identified by satellites. Strike without missing even the smallest enemy movements above clouds or at night.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_78",
        name: "Stealth Bombing",
        description: "Deploy stealth aircraft invisible to radar to penetrate enemy's most heavily defended zones. Destroy key enemy facilities without warning and escape leisurely.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_79",
        name: "Air Command Neutralization",
        description: "Precision strike ground command and control centers from the air to paralyze war-fighting intelligence. Turn the entire enemy force into a headless body, making them wander in confusion.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_total_war_80",
        name: "Iron Defense Line",
        description: "Construct multi-layered trenches and concrete bunkers on key approach routes. Make every step forward costly for the enemy.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_81",
        name: "Scorched Earth Retreat",
        description: "Destroy all usable supplies, food, and buildings while retreating. Leave nothing for the enemy, forcing them into a supply crisis.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_82",
        name: "Fortified Bunker Network",
        description: "Build interconnected underground fortresses to preserve forces from bombing. Invisible from above, but ready to counter-attack at any time.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_83",
        name: "Defense in Depth",
        description: "Establish a deep, multi-layered defense system. As the enemy breaches one line, they face another, exhausting their momentum.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_84",
        name: "Urban Fortification",
        description: "Convert city buildings into defense points to force urban combat. Wear down the enemy in a maze of snipers and traps.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_85",
        name: "Militia Mobilization",
        description: "Arm civilians to fight alongside the regular army. Overcome numerical inferiority with sheer numbers and slow the occupation.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_86",
        name: "Delaying Action",
        description: "Focus on slowing enemy advance rather than winning, to buy time. Use the delay to get ally support or prepare counter-weapons.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_87",
        name: "Stronghold Defense",
        description: "Deploy elite troops to hold key strategic points at all costs. Tie down the enemy to allow friendly forces elsewhere to regroup.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_88",
        name: "Defensive Mine Laying",
        description: "Lay massive minefields on expected enemy routes. Trap the enemy in the fields and destroy them with long-range artillery.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_89",
        name: "Underground Shelter Ops",
        description: "Evacuate citizens and key facilities underground to neutralize strategic bombing. Maintain core state functions for a protracted war.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_90",
        name: "Supply Route Detour",
        description: "Supply via secret routes instead of targeted main roads. Prevent isolation and ensure sustained resistance capability.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_91",
        name: "Counter-attack Prep",
        description: "Conserve strength during peak enemy offense, then counter-attack when they tire. Turn the tables by ending defense with a strike.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_92",
        name: "Guerrilla Resistance",
        description: "Operate small units behind lines to harass enemy rear. Prevent occupation stabilization and force enemy dispersion.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_93",
        name: "Dense Air Defense",
        description: "Deploy dense AA guns and SAMs at all defense sites. Deny air support, forcing a 'fair' ground-only fight.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_94",
        name: "Key Facility Concealment",
        description: "Camouflage factories and command posts as normal buildings. Deceive the enemy into wasting bombs on wrong targets.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_95",
        name: "Strategic Retreat",
        description: "Retreat from bad terrain to lure enemy to better defense spots. Extends enemy supply lines while shortening friendly ones.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_96",
        name: "Defensive Maneuver",
        description: "Move defense forces rapidly to match enemy attack points instead of staying static. Flexibly evade concentrated strikes.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_97",
        name: "Desperate Resistance",
        description: "Order 'No Retreat' to all soldiers. Create psychological awe and fatigue in the enemy through extreme mental fortitude.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_98",
        name: "Supply Stockpiling",
        description: "Hide stockpiles of food and ammo nationwide before war. Enable years of self-sufficiency even if cut off.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_99",
        name: "Trap Zone Setup",
        description: "Weaken part of the line to lure enemy deep, then encircle and destroy. A sophisticated trap exploiting enemy confidence.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_naval_blockade_100",
        name: "Coastal Battery Defense",
        description: "Deploy powerful anti-ship guns on coastal cliffs and forts to block access.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_101",
        name: "Harbor Minefield",
        description: "Mine friendly harbors to physically block enemy ship entry.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_102",
        name: "ASW Patrol Reinforcement",
        description: "Mobilize all sonar and patrol planes for 24/7 sub infiltration monitoring.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_103",
        name: "Convoy Protection",
        description: "Surround merchant ships with destroyers to prevent looting.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_104",
        name: "Coastal Defense Maneuver",
        description: "Use small ships to outmaneuver large enemy vessels in shallow waters.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_105",
        name: "Underwater Sonar Network",
        description: "Lay seabed sensors to track enemy movements in real-time.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_106",
        name: "Defensive Artificial Island",
        description: "Build fortified islands in the middle of the sea to extend defense range.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_107",
        name: "Port Closure",
        description: "Scuttle ships to block harbor entrances in worst-case scenarios.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_108",
        name: "Coastal Porcupine Strategy",
        description: "Deploy swarms of missile boats to attack approaching enemies like bees.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_109",
        name: "Coastal Sea Wall",
        description: "Install huge concrete walls and obstacles on landable beaches.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_110",
        name: "Infiltration Block",
        description: "Strengthen night patrols near coastline to stop small infiltration teams.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_111",
        name: "Naval Rescue Deployment",
        description: "Rapidly rescue troops from damaged ships to minimize force loss.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_112",
        name: "Supply Ship Escort",
        description: "Assign combat ships specifically to escort supply vessels for stability.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_113",
        name: "Underwater Barrier",
        description: "Install nets and barriers underwater that subs cannot pass.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_114",
        name: "Coastal Guard Reinforcement",
        description: "Mobilize armed coast guard and cutters to maintain a tight watch.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_115",
        name: "Enemy Sub Detection",
        description: "Use modern ASW helis to hunt subs until they surface.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_116",
        name: "Maritime Sovereignty Declaration",
        description: "Highlight international law and declare enemy entry effectively illegal to the world.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_117",
        name: "Port Fortification",
        description: "Convert port buildings into batteries for last stand preparation.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_118",
        name: "Coastal Missile Base",
        description: "Snipe enemy fleets anytime with missile vehicles hidden deep in mountains.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_119",
        name: "Mobile Defense Fleet",
        description: "Wait in center, then immediately deploy to wherever enemy appears.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_border_skirmish_120",
        name: "Wall & Trench Construction",
        description: "Build a massive wall across the border to physically prevent entry.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_121",
        name: "Border Fortification",
        description: "Build forts on key roads to block enemy tank passage completely.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_122",
        name: "Lure Ambush",
        description: "Lure enemy across border, then destroy in prepared kill zones.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_123",
        name: "Surface-to-Surface Missile",
        description: "Ready missiles to strike immediately if enemy gathers near border.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_124",
        name: "Border Guard Reinforcement",
        description: "Station elite troops at border permanently for immediate response.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_125",
        name: "Electronic Warfare Defense",
        description: "Strengthen secure comms network against enemy jamming.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_126",
        name: "Control Zone Setup",
        description: "Restrict civilian access near border to stop spy infiltration.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_127",
        name: "Recon Asset Surveillance",
        description: "Monitor all border movement with high-performance CCTV and sensors.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_128",
        name: "Defensive Shelling",
        description: "Fire precision warning shots if enemy approaches border.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_129",
        name: "Minefield",
        description: "Lay mines on inevitable paths to slow enemy advance.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_130",
        name: "DMZ Defense",
        description: "Maintain peace in buffer zone to remove enemy pretext for provocation.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_131",
        name: "Mobile Defense Force",
        description: "Send reinforcements anywhere on border within 10 mins using helis.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_132",
        name: "Checkpoint Reinforcement",
        description: "Inspect all people and vehicles thoroughly to catch saboteurs.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_133",
        name: "Infiltration Interdiction Net",
        description: "Install sensor walls that enemy special forces cannot cross.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_134",
        name: "Observation Post Expansion",
        description: "Operate numerous unmanned posts for blind-spot-free surveillance.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_135",
        name: "Obstacle Installation",
        description: "Layer 'dragon's teeth' and barbed wire to block tanks.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_136",
        name: "Comms Network Security",
        description: "Encrypt friendly border guard comms to prevent eavesdropping.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_137",
        name: "Border Warning System",
        description: "Sound emergency sirens everywhere immediately upon intrusion.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_138",
        name: "Terrain Utilization",
        description: "Use rough mountain terrain as a shield to stop large armies with few troops.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_139",
        name: "Defensive Drone",
        description: "Guard border with drones for recon/warning, not suicide attacks.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_air_superiority_140",
        name: "ADIZ Reinforcement",
        description: "Scramble interceptors immediately if unidentified aircraft approach.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_141",
        name: "SAM Concentration",
        description: "Build a missile defense net covering the entire sky.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_142",
        name: "Interceptor Standby",
        description: "Pilots wait in cockpits, ready to takeoff in 5 mins.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_143",
        name: "Air Surveillance Radar",
        description: "Operate multi-wavelength radar capable of catching stealth jets.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_144",
        name: "Decoy Base",
        description: "Deploy dummy fighters to trick enemy bombers.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_145",
        name: "Aircraft Concealment",
        description: "Hide fighters in underground hangars or caves.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_146",
        name: "Mobile Air Defense",
        description: "Keep missile vehicles moving to avoid pre-emptive strikes.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_147",
        name: "Air Detour Security",
        description: "Secure a corridor for friendly planes to avoid enemy air defense.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_148",
        name: "Electromagnetic Blocking",
        description: "Emit strong jamming signals to neutralize enemy guided missiles.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_149",
        name: "Defensive Counter-Air",
        description: "Shoot down only intruding enemy planes to conserve strength.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_150",
        name: "Integrated Control Defense",
        description: "Integrate land/sea/air radar info for efficient interception.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_151",
        name: "Ballistic Missile Intercept",
        description: "Activate Missile Defense (MD) to hit enemy missiles in the air.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_152",
        name: "No-Fly Zone Setup",
        description: "Declare No-Fly Zone and shoot down anything entering it.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_153",
        name: "AA Gun Emplacement",
        description: "Operate dense AA gun nets for planes that missiles miss.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_154",
        name: "Comms Jamming Defense",
        description: "Maintain friendly plane comms even under enemy EW attack.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_155",
        name: "Airbase Fortification",
        description: "Fortify base perimeter against ground attacks.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_156",
        name: "Early Warning Broadcast",
        description: "Broadcast air raid warning to public the moment enemy takes off.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_157",
        name: "Air Defense Repair",
        description: "Repair destroyed radars/bases immediately to fill defense gaps.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_158",
        name: "Air Asset Protection",
        description: "Save fighters early in war, launch at decisive moment.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_159",
        name: "Scramble Intercept",
        description: "Intercept enemy bombers with near-suicidal attacks before they reach targets.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_total_war_160",
        name: "Show of Force",
        description: "Hold massive drills near border instead of war to deter attack.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_161",
        name: "Buffer Zone Security",
        description: "Set neutral zone to avoid direct conflict.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_162",
        name: "Negotiation Occupation",
        description: "Occupy just one key point for leverage in peace talks.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_163",
        name: "Peacekeeping Force",
        description: "Deploy 3rd party troops with UN approval to stop war.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_164",
        name: "Limited Retaliation",
        description: "Retaliate exactly in kind to prevent escalation and send warning.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_165",
        name: "Economic Sanctions",
        description: "Use economic pressure instead of guns to force enemy surrender.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_166",
        name: "Strategic Patience",
        description: "Wait for international opinion to shift instead of reacting to provocation.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_167",
        name: "Diplomatic Isolation",
        description: "Paint enemy as villains globally so allies won't help them.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_168",
        name: "Information Warfare",
        description: "Leak enemy internal info to turn their citizens against war.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_169",
        name: "Humanitarian Corridor",
        description: "Open humanitarian corridors to minimize tragedy and build moral high ground.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_170",
        name: "Ceasefire Negotiation",
        description: "Request mediation when power is balanced to end war early.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_171",
        name: "Political Sabotage",
        description: "Support enemy moderates to replace hawkish leadership.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_172",
        name: "International Public Opinion War",
        description: "Use media to promote defense legitimacy and attract support.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_173",
        name: "Defensive Deterrence",
        description: "Maintain peace by displaying nuclear capabilities or powerful weapons with the message 'If you attack, you die too.'",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_174",
        name: "Covert Operation",
        description: "Wage invisible war (assassination/sabotage) instead of total war.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_175",
        name: "Mediator Force Acceptance",
        description: "Host 3rd party troops to remove enemy attack pretext.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_176",
        name: "Power Balance Maintenance",
        description: "Control power balance to induce attrition warfare without a clear winner.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_177",
        name: "Comms Channel Opening",
        description: "Maintain 'hotline' with enemy leaders even during war.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_178",
        name: "Wartime Neutrality Declaration",
        description: "Take no side in great power war, only stop territory breach.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_179",
        name: "Crisis Management Ops",
        description: "Extinguish accidental clashes immediately on site to prevent war.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_naval_blockade_180",
        name: "Selective Inspection",
        description: "Let food/necessities pass to avoid international condemnation.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_181",
        name: "International Waters Watch",
        description: "Stop chaotic fighting in high seas and protect navigation rights.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_182",
        name: "Warning Shot",
        description: "Fire warning shots near enemy ships to signal 'keep away'.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_183",
        name: "Sea Route Detour",
        description: "Guide merchants to safer, longer routes avoiding blockade.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_184",
        name: "Limited Boarding",
        description: "Stop only suspicious ships; apologize and release if clean.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_185",
        name: "Maritime Peace Zone",
        description: "Declare sea zone as 'No Combat' and evict any entrants.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_186",
        name: "Anti-Piracy Pretext",
        description: "Deploy warships under pretext of anti-piracy to control seas.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_187",
        name: "High Seas Standoff",
        description: "Block enemy path with fleet without fighting, just standing off.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_188",
        name: "Naval Reconnaissance",
        description: "Launch only recon planes to record and publicize all enemy moves.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_189",
        name: "Search and Rescue",
        description: "Rescue drowning enemies to show moral superiority.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_190",
        name: "Maritime Law Monitoring",
        description: "Record all enemy maritime law violations for international court.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_191",
        name: "Environmental Protection Pretext",
        description: "Restrict tanker passage under pretext of preventing pollution.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_192",
        name: "Sea Lane Protection",
        description: "Escort friendly/neutral merchants through safe lanes.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_193",
        name: "Comms Interception",
        description: "Intercept all signals at sea to understand enemy intent.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_194",
        name: "Non-lethal Response",
        description: "Turn back enemy ships with water cannons/sonic guns, no damage.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_195",
        name: "Sea Buffer Installation",
        description: "Install large buoys/nets to make physical approach hard.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_196",
        name: "ROE Compliance",
        description: "Strictly follow 'Do not fire unless fired upon'.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_197",
        name: "Fleet Proximity Demo",
        description: "Sail very close to enemy fleet to create pressure.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_198",
        name: "Maritime Toll Levy",
        description: "Charge 'safety fee' for passage instead of blockade.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_199",
        name: "Spy Ship Operation",
        description: "Deploy spy ships disguised as fishing boats to gather info.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_border_skirmish_200",
        name: "Recon Drone Operation",
        description: "Monitor border only with drones to prevent human casualties.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_201",
        name: "Warning Broadcast",
        description: "Broadcast defense will and call out enemy illegal acts via loudspeakers.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_202",
        name: "Standoff Maintenance",
        description: "Stare-down from trenches, waiting for other to shoot first (Psychological).",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_203",
        name: "Non-lethal Response",
        description: "Use tear gas/rubber bullets on crossers to stop them without killing.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_204",
        name: "Local Ceasefire",
        description: "Field commanders agree to local ceasefire in conflict village.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_205",
        name: "Border Monitors",
        description: "Invite 3rd party monitors to border for transparency.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_206",
        name: "Barrier Maintenance",
        description: "Silently repair broken walls to show resolve to protect land.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_207",
        name: "Diplomat Protection",
        description: "Ensure diplomat safety crossing border to keep dialogue alive.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_208",
        name: "Crossing Prevention",
        description: "Strictly prevent friendly soldiers/civilians from accidentally crossing.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_209",
        name: "Political Propaganda War",
        description: "Install huge billboards at border showing prosperity and peace.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_210",
        name: "Psyops Broadcast",
        description: "Play hometown news/songs to weaken enemy fighting spirit.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_211",
        name: "Comms Blackout",
        description: "Jam specific border frequencies to disrupt enemy contact temporarily.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_212",
        name: "Border Trade Restriction",
        description: "Close markets to cut supplies to enemy border towns.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_213",
        name: "Joint Recon Proposal",
        description: "Propose joint border recon to reduce misunderstandings.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_214",
        name: "Accidental Conflict Prevention",
        description: "Immediately apologize and de-escalate if gun goes off strictly.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_215",
        name: "Border Marking",
        description: "Mark border clearly so everyone knows, preventing disputes.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_216",
        name: "Deserter Management",
        description: "Treat deserters humanely and gain intelligence.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_217",
        name: "Neutral Zone Recon",
        description: "Recon no-man's land to prevent enemy pre-emption.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_218",
        name: "Border De-escalation",
        description: "Lower alert level on holidays as a peace gesture.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_219",
        name: "Peace Propaganda",
        description: "Build peace park near border to emphasize coexistence.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_air_superiority_220",
        name: "No-Fly Zone",
        description: "Declare specific airspace as a 'No-Fly Zone where no one can fly' to completely block air raids.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_221",
        name: "Aerial Reconnaissance",
        description: "Equip only cameras, not weapons, to photograph enemy bases.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_222",
        name: "Aerial Refueling Standby",
        description: "Keep tankers airborne to show long-range capability deterence.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_223",
        name: "Satellite Surveillance",
        description: "Monitor airfields from space to warn of takeoffs in advance.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_224",
        name: "Early Warning System",
        description: "Launch giant radar planes to find enemy jets hundreds of km away.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_225",
        name: "EMP Suppression",
        description: "Prepare non-lethal EMP to disable only electronics.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_226",
        name: "Airspace Violation Warning",
        description: "Warn approaching planes to leave immediately or face interception.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_227",
        name: "Electronic Signal Collection",
        description: "Collect enemy radar signals to gather data for future jamming.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_228",
        name: "Aerial Collision Avoidance",
        description: "Follow international flight rules strictly to avoid accidents with enemy.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_229",
        name: "Weather Control Recon",
        description: "Use artificial rain etc. to blind enemy airfields strictly.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_230",
        name: "Drone Surveillance Network",
        description: "Launch many small drones to watch every gap in the sky.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_231",
        name: "Aerial Power Demo",
        description: "Perform aerobatics in enemy view to show off skill.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_232",
        name: "UAV Swarm",
        description: "Launch mass UAVs (no casualty risk) to tire out the enemy.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_233",
        name: "Air Traffic Control",
        description: "Manage safe skylanes so civilian planes don't get hit.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_234",
        name: "SIGINT Collection",
        description: "Eavesdrop on enemy fighter comms to learn plans.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_235",
        name: "Air Safety Zone",
        description: "Designate hospitals/ruins as Air Safety Zones to prevent bombing.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_236",
        name: "Flight Path Tracking",
        description: "Record entire enemy flight path to report to world.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_237",
        name: "Air Relay Point",
        description: "Launch air relays to keep comms alive in mountains.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_238",
        name: "Jamming Demonstration",
        description: "Briefly jam enemy radar, then release to warn of tech superiority.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_239",
        name: "Air Deterrence Display",
        description: "Expose stealth jets occasionally to stop enemy from acting rashly.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
];
