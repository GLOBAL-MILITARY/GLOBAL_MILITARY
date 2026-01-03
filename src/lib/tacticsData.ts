export type PersonalityType = "OFFENSIVE" | "DEFENSIVE" | "NEUTRAL";
export type ScenarioType = "TOTAL_WAR" | "NAVAL_BLOCKADE" | "AIR_SUPERIORITY" | "BORDER_SKIRMISH";

export interface Tactic {
    id: string;
    name: string;
    description: string;
    personality: PersonalityType;
    scenario: ScenarioType;
}

export const ALL_TACTICS: Tactic[] = [
    {
        id: "offensive_total_war_0",
        name: "제파식 파상공격",
        description: "멈추지 않는 연속적인 공격군 투입으로 적의 방어선을 물리적으로 마모시킵니다. 아군의 피해를 감수하더라도 적에게 재정비 시간을 주지 않는 것이 핵심입니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_1",
        name: "수도 참수 작전",
        description: "최정예 기동 부대를 적의 심장부로 직공시켜 지휘 체계를 한꺼번에 무너뜨립니다. 전쟁의 조기 종결을 위해 정치적, 군사적 핵심 인사를 타격 목표로 삼습니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_2",
        name: "초토화 진격",
        description: "점령하는 모든 지역의 자원과 기반 시설을 완전히 파괴하며 전진합니다. 적이 퇴각하더라도 다시는 그 땅을 거점으로 사용할 수 없게 만듭니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_3",
        name: "기갑 전격전",
        description: "기갑 부대의 압도적인 기동력을 활용하여 전선의 가장 약한 고리를 돌파합니다. 돌파 후에는 적의 후방 보급로를 차단하여 거대한 포위망을 완성합니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_4",
        name: "무제한 총공세",
        description: "보유한 모든 화력을 한 지점에 집중하여 적의 방어 의지를 완전히 꺾어놓습니다. 단기간에 승부를 보기 위해 보급 역량을 최대로 끌어다 쓰는 도박적인 전술입니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_5",
        name: "종심 돌파",
        description: "전선의 1차 방어선에 그치지 않고 적의 종심 깊숙한 곳까지 한 번에 찔러 들어갑니다. 적의 예비대가 전개되기 전에 후방 지휘소를 무력화하는 것이 목적입니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_6",
        name: "병참선 강습",
        description: "전면전 도중 특수부대를 투입하여 적의 유류고와 탄약고를 우선적으로 타격합니다. 보급이 끊긴 적군은 화력 우위에도 불구하고 전선에서 후퇴할 수밖에 없습니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_7",
        name: "시가전 강습",
        description: "보병과 근접 지원 화력을 투입하여 적의 도시 구역을 빠르게 점령합니다. 건물을 하나하나 장악하며 적의 저항군을 섬멸하는 고강도 작전입니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_8",
        name: "화력 집중 타격",
        description: "가용 가능한 모든 포병 자산을 동원하여 특정 구역을 지도에서 지워버립니다. 진격 전 적의 고정 방어 시설을 완전히 무력화하기 위해 실행됩니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_9",
        name: "심리적 붕괴 작전",
        description: "선전물과 사이버 공격을 병행하여 적군 내부의 반란이나 항복을 유도합니다. 물리적인 전투 없이도 적의 전력을 와해시킬 수 있는 고도의 전략입니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_10",
        name: "결사 항전 돌격",
        description: "퇴로를 차단하고 배수의 진을 친 상태에서 적을 향해 광적인 돌격을 감행합니다. 아군의 사기를 극한으로 끌어올려 수치상의 열세를 극복하는 전술입니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_11",
        name: "강제 점령",
        description: "외교적 고려 없이 즉각적으로 목표 지역에 군을 투입하여 실효 지배를 확립합니다. 국제 사회의 비난을 감수하더라도 전략적 요충지를 선점하는 것이 우선입니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_12",
        name: "화력 섬멸전",
        description: "적의 주력 부대를 특정 지역으로 유인한 뒤 모든 화력을 집중해 궤멸시킵니다. 적의 재기 불능을 목표로 하는 가장 파괴적인 형태의 공격입니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_13",
        name: "신속 기동전",
        description: "경량화된 부대를 활용하여 적이 예상치 못한 경로로 빠르게 이동해 후방을 칩니다. 적의 대응 속도보다 빠른 기동으로 전장의 주도권을 장악합니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_14",
        name: "전선 분쇄",
        description: "적 방어선의 중앙을 강력한 화력으로 타격하여 전선을 두 개로 쪼갭니다. 고립된 적군을 각개격파하여 전체적인 방어 체계를 무너뜨립니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_15",
        name: "무력 항복 권고",
        description: "압도적인 전력을 전선에 전개하여 적에게 최후통첩을 보내 항복을 강요합니다. 전투 없이 승리하는 것을 목표로 하되, 거부 시 즉시 총공격을 시작합니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_16",
        name: "인프라 마비",
        description: "발전소와 통신망 등 국가의 핵심 인프라를 타격하여 적의 전쟁 수행 능력을 마비시킵니다. 군사력뿐만 아니라 국가 시스템 전체를 붕괴시키는 전술입니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_17",
        name: "야간 기습 강습",
        description: "적의 시야가 제한된 야간에 야간 투시 장비를 갖춘 정예군을 투입합니다. 적이 혼란에 빠진 틈을 타 주요 거점을 신속하게 장악합니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_18",
        name: "용병 및 동맹군 투입",
        description: "외부 전력을 적극적으로 고용하거나 동맹국을 참전시켜 전력의 공백을 메웁니다. 아군의 피해를 줄이면서도 공격의 강도를 높이는 방법입니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_total_war_19",
        name: "최후의 일격",
        description: "적의 방어력이 한계에 다다랐을 때 숨겨둔 전략 예비군을 투입해 승기를 굳힙니다. 전장의 모든 가용 자원을 쏟아부어 마침표를 찍는 작전입니다.",
        personality: "OFFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "offensive_naval_blockade_20",
        name: "늑대 떼 잠수함 작전",
        description: "다수의 잠수함을 산개시켜 적의 수송 선단을 사방에서 동시에 공격합니다. 적 호위함이 대응하기 어려운 다각도 타격으로 수송선을 격침합니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_21",
        name: "항만 기습 폭격",
        description: "적의 주요 군항과 상업 항구에 대규모 공습을 가해 기능을 마비시킵니다. 정박 중인 함선과 하역 시설을 파괴하여 해상 보급을 원천 차단합니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_22",
        name: "무제한 잠수함전",
        description: "국적에 관계없이 봉쇄 구역을 통과하는 모든 함선을 적함으로 간주하고 격침합니다. 적의 경제를 고립시키기 위한 가장 극단적인 해상 전술입니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_23",
        name: "보급선 사냥",
        description: "적의 전선으로 향하는 유조선과 화물선을 최우선 목표로 삼아 추적합니다. 전방 부대의 연료와 탄약을 고갈시켜 육상 전투에도 영향을 미칩니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_24",
        name: "해상 관문 강탈",
        description: "해상 교통의 요충지인 해협이나 운하를 무력으로 점령합니다. 전 세계 해상 물류의 목줄을 쥐고 적의 함대 이동을 완전히 통제합니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_25",
        name: "공세적 기뢰 부설",
        description: "적의 항구 바로 앞바다에 스텔스 기뢰를 대량으로 살포합니다. 적 함대가 항구를 나서는 순간부터 피해를 입게 만들어 해상 진출을 억제합니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_26",
        name: "함대 직공",
        description: "아군의 주력 함대를 이끌고 적의 봉쇄 함대를 향해 전면적인 함대 결전을 시도합니다. 해상권을 완전히 장악하기 위해 적의 주력함을 격멸하는 것이 목적입니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_27",
        name: "해안 교두보 확보",
        description: "봉쇄 구역 내의 주요 섬이나 해안 거점을 점령하여 전진 기지로 활용합니다. 이곳에 대함 미사일을 배치하여 주변 해역의 통제력을 강화합니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_28",
        name: "연안 전투함 돌격",
        description: "소형이고 빠른 연안 전투함들을 동원해 적의 대형 함선을 근거리에서 기습합니다. 좁은 해역에서의 기동성을 살려 대형함의 사각지대를 공략합니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_29",
        name: "해상 보급로 절단",
        description: "적의 본국과 식민지 혹은 우방국 사이의 최단 경로를 점거합니다. 장거리 무역로를 끊어 적 국가 경제에 심각한 타격을 입힙니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_30",
        name: "상륙 함대 호위",
        description: "적의 봉쇄망을 뚫고 대규모 상륙 부대를 적 본토에 상륙시키기 위한 엄호 작전입니다. 해상권 확보와 동시에 지상전으로의 전환을 노리는 강력한 공세입니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_31",
        name: "항구 봉쇄 돌파",
        description: "아군의 항구를 봉쇄하고 있는 적의 선단을 강력한 집중 화력으로 밀어내고 탈출합니다. 고립된 아군 전력을 외부로 끌어내어 반격의 기틀을 마련합니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_32",
        name: "해양 기지 탈취",
        description: "적이 해상에서 운영하는 석유 시추선이나 해상 기지를 공격하여 점령합니다. 적의 자원 수급원을 빼앗고 아군의 전초 기지로 개조합니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_33",
        name: "수중 특수전",
        description: "특수 잠수 요원들을 투입하여 정박 중인 적 함선의 선체에 폭발물을 부착합니다. 큰 함대 충돌 없이도 적의 주력함을 침몰시킬 수 있는 은밀한 전술입니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_34",
        name: "적 함대 유인 섬멸",
        description: "소수의 미끼 함선을 내세워 적 함대를 아군의 미사일 사거리 내로 끌어들입니다. 적이 추격에 집중하는 사이 매복해 있던 전력이 측면을 타격합니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_35",
        name: "해상 패권 장악",
        description: "모든 가용 함대를 전개하여 특정 해역에서 적의 깃발이 보이지 않게 만듭니다. 압도적인 수적 우위로 적이 해상으로 나올 엄두도 내지 못하게 압박합니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_36",
        name: "원거리 함포 사격",
        description: "사거리가 긴 함포와 함대지 미사일을 사용하여 적의 해안 방어 시설을 두들깁니다. 안전 거리에서 적의 반격 수단을 제거한 뒤 봉쇄망을 좁힙니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_37",
        name: "상선 나포 작전",
        description: "적의 물자를 실은 상선을 격침하는 대신 나포하여 아군의 자원으로 편입합니다. 적의 손실을 아군의 이득으로 바꾸는 경제적인 공세 전술입니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_38",
        name: "해상 초계 섬멸",
        description: "적의 눈 역할을 하는 정찰선과 초계기를 우선적으로 찾아내 제거합니다. 적을 장님으로 만든 뒤 아군의 주력 함대가 기습적인 위치에서 나타나 공격합니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_naval_blockade_39",
        name: "심해 기습",
        description: "최신형 무소음 잠수함을 활용하여 적의 소나 망을 뚫고 함대 중앙으로 침투합니다. 가장 취약한 항공모함이나 보급함을 근거리에서 어뢰로 타격합니다.",
        personality: "OFFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "offensive_border_skirmish_40",
        name: "전초기지 기습",
        description: "국경에 위치한 적의 최전방 초소들을 동시에 공격하여 점령합니다. 적의 경계망을 순식간에 마비시키고 국경 안쪽으로 진입할 통로를 확보합니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_41",
        name: "기습 월경 작전",
        description: "정식 선전포고 없이 국경선을 넘어 적의 영토로 빠르게 진입합니다. 적이 방어 태세를 갖추기 전에 주요 도로와 교량을 선점하는 작전입니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_42",
        name: "국지적 강습",
        description: "특정 국경 마을이나 산업 단지를 목표로 설정하고 강력한 화력을 투입해 탈취합니다. 한정된 지역에서의 승리를 통해 외교적 협상력을 높이려 합니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_43",
        name: "비무장지대 무력화",
        description: "양국 사이의 완충 지대를 무시하고 중화기를 전진 배치합니다. 적의 심리적 저항선을 무너뜨리고 언제든 공격할 준비가 되었음을 과시합니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_44",
        name: "특수부대 침투",
        description: "야간을 틈타 국경의 산악 지대나 숲을 통해 소수 정예병을 후방으로 보냅니다. 적의 통신 중계소와 보급 창고를 파괴하여 내부 혼란을 야기합니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_45",
        name: "국경선 밀어내기",
        description: "대규모 기갑 부대를 전면에 내세워 국경선을 조금씩 적의 영토 쪽으로 전진시킵니다. 물리적인 힘으로 영토를 조금씩 잠식해 나가는 야금야금 전술입니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_46",
        name: "선제 타격",
        description: "적군이 국경 인근에 집결하는 조짐이 보이면 먼저 포격을 가해 분쇄합니다. 적의 공격 의지를 사전에 꺾고 아군의 방어 유리함을 공격으로 승화시킵니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_47",
        name: "신속 기동군 투입",
        description: "헬기와 장갑차를 활용한 신속 대응군을 투입해 국경의 요충지를 선점합니다. 지형적 이점을 먼저 차지하여 적의 반격을 불가능하게 만듭니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_48",
        name: "통신 기지 파괴",
        description: "국경 인근의 적 레이더와 통신탑을 정밀 유도 미사일로 타격합니다. 적의 눈과 귀를 멀게 한 뒤 대규모 부대를 국경 너머로 이동시킵니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_49",
        name: "국경 포격전",
        description: "자주포와 다연장 로켓을 동원해 국경 너머 적의 군사 시설을 맹폭합니다. 아군 보병의 진격 없이 화력만으로 적의 방어선을 무력화하는 전술입니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_50",
        name: "매복 섬멸",
        description: "국경을 순찰하는 적군을 유리한 지형으로 유인한 뒤 집중 사격으로 섬멸합니다. 국경 인근에서의 잦은 소모전을 통해 적의 병력을 갉아먹습니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_51",
        name: "장벽 파괴",
        description: "적이 설치한 국경 장벽과 철책을 폭파하고 대규모 전차 부대를 진입시킵니다. 물리적 장벽을 무용지물로 만들며 아군의 힘을 과시하는 공격입니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_52",
        name: "고지 탈환",
        description: "국경 인근의 가장 높은 고지를 공격하여 관측권과 사격권을 확보합니다. 고지를 점령함으로써 주변 수십 킬로미터의 국경 지대를 아군의 통제하에 둡니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_53",
        name: "야간 침투",
        description: "적의 감시가 소홀해지는 새벽 시간대에 무소음 장비를 갖춘 부대를 침투시킵니다. 적의 전방 지휘관을 암살하거나 중요 문서를 탈취하여 복귀합니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_54",
        name: "위력 정찰",
        description: "정찰 부대를 가장하여 적의 방어선 안쪽까지 깊숙이 찌르고 들어갑니다. 적의 대응 화력과 위치를 파악함과 동시에 국지적인 피해를 입힙니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_55",
        name: "보급 거점 약탈",
        description: "국경 인근에 위치한 적의 민간 및 군사 창고를 습격하여 물자를 탈취합니다. 아군의 보급 문제를 해결함과 동시에 적의 자급자족 능력을 파괴합니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_56",
        name: "철도망 파괴",
        description: "국경을 가로지르는 적의 철도와 도로망을 폭파하여 증원군 도착을 늦춥니다. 고립된 국경 수비대를 손쉽게 제압하기 위한 사전 작업입니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_57",
        name: "전방 지휘소 타격",
        description: "국경을 관리하는 적의 현장 지휘소를 정밀 타격하여 명령 체계를 끊습니다. 현장 판단 능력을 잃은 적군을 혼란에 빠뜨려 각개격파합니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_58",
        name: "방어선 교란",
        description: "여러 국경 지점에서 동시에 소규모 공격을 가해 적의 방어 병력을 분산시킵니다. 적이 병력을 이동시키는 사이 진짜 목표 지점에 주력을 투입합니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_border_skirmish_59",
        name: "국경 점거",
        description: "아예 국경선 자체를 점령하여 적의 영토 진입을 원천 봉쇄하고 역으로 진격합니다. 국경을 새로운 공격 기지로 변모시켜 전쟁의 판도를 바꿉니다.",
        personality: "OFFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "offensive_air_superiority_60",
        name: "제공권 완전 장악",
        description: "모든 전투기를 출격시켜 적의 공군 전력을 하늘에서 완전히 제거합니다. 적 비행기가 한 대도 뜰 수 없는 환경을 만들어 지상군의 안전을 확보합니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_61",
        name: "전략 폭격기 전개",
        description: "거대한 폭격기 편대를 투입하여 적의 산업 중심지와 주요 도시를 맹폭합니다. 적의 전쟁 의지 자체를 초토화하는 강력한 공중 공세입니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_62",
        name: "드론 스웜 습격",
        description: "수천 대의 소형 자폭 드론을 한꺼번에 날려 보내 적의 방공망을 마비시킵니다. 값싼 드론으로 고가의 방공 미사일을 소진시키고 목표를 타격합니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_63",
        name: "공항 선제 타격",
        description: "전쟁 시작과 동시에 적의 모든 활주로와 격납고를 정밀 미사일로 타격합니다. 적 공군이 이륙조차 하지 못하게 만들어 하늘을 선점합니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_64",
        name: "고고도 미사일 폭격",
        description: "적의 레이더가 닿지 않는 성층권에서 유도 미사일을 발사합니다. 보이지 않는 곳에서 가해지는 타격으로 적에게 극심한 공포를 심어줍니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_65",
        name: "방공망 제압(SEAD)",
        description: "대레이더 미사일을 장착한 특수 기체로 적의 지대공 미사일 기지를 사냥합니다. 공중 공격의 가장 큰 걸림돌인 방공망을 우선적으로 제거합니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_66",
        name: "근접 항공 지원(CAS)",
        description: "지상군과 긴밀히 협력하여 전선 바로 위의 적 부대를 직접 공격합니다. 저공 비행을 하며 가틀링 건과 로켓으로 적의 기갑 부대를 파괴합니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_67",
        name: "공중 강습",
        description: "수송기와 헬기를 이용해 적의 후방 요충지에 대규모 낙하산 부대를 투입합니다. 하늘을 통해 적의 방어선을 건너뛰어 바로 핵심 지점을 장악합니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_68",
        name: "공중 급유 작전",
        description: "공중 급유기를 동원해 아군 전투기의 작전 반경과 체류 시간을 비약적으로 늘립니다. 적 본토 깊숙한 곳까지 중단 없는 공격을 가능하게 합니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_69",
        name: "전자전 기만",
        description: "강력한 전파 방해 장비로 적의 레이더에 가짜 신호를 수백 개 생성합니다. 혼란에 빠진 적군이 허공에 미사일을 쏘게 유도한 뒤 실제 공격을 가합니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_70",
        name: "전투기 초계 섬멸",
        description: "특정 구역을 비행하는 적의 정찰기나 조기경보기를 우선적으로 격추합니다. 적의 정보 수집 능력을 차단하여 아군의 움직임을 은폐합니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_71",
        name: "고정 표적 폭격",
        description: "벙커 버스터 등 특수 폭탄을 사용하여 적의 지하 벙커와 견고한 요새를 파괴합니다. 아무리 깊은 곳에 숨어도 공중 타격을 피할 수 없음을 보여줍니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_72",
        name: "활주로 파괴",
        description: "관통 탄두를 사용해 적의 활주로에 거대한 구멍을 뚫어 이착륙을 막습니다. 복구 전까지 적 공군을 지상에 묶어두는 효과적인 봉쇄 전술입니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_73",
        name: "공중 조기 경보 타격",
        description: "적의 지휘 항공기를 타격하여 공중전의 컨트롤 타워를 제거합니다. 지휘를 잃은 적 전투기들을 각개격파하여 공중전의 승기를 잡습니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_74",
        name: "유도 미사일 세례",
        description: "수백 발의 크루즈 미사일을 동시에 발사하여 적의 방공망이 감당할 수 없는 과부하를 줍니다. 일부 미사일이 격추되더라도 나머지가 목표를 확실히 파괴합니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_75",
        name: "초음속 침투",
        description: "소리보다 빠른 속도로 적의 방어선을 돌파하여 눈 깜짝할 새 공격하고 사라집니다. 적이 레이더를 확인하기도 전에 이미 상황을 종료시키는 전광석화 작전입니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_76",
        name: "공중 요격 작전",
        description: "아군 본토로 향하는 적의 폭격기 편대를 공중에서 미리 차단합니다. 적의 공격 시도를 하늘에서 분쇄하여 지상의 피해를 완벽히 막아냅니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_77",
        name: "위성 정찰 타격",
        description: "위성으로 파악한 실시간 좌표를 이용해 오차 없는 공중 폭격을 가합니다. 구름 위나 밤중에도 적의 작은 움직임 하나까지 놓치지 않고 타격합니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_78",
        name: "스텔스 폭격",
        description: "레이더에 잡히지 않는 스텔스기를 투입하여 적의 가장 삼엄한 방어 구역을 통과합니다. 예고 없이 적의 핵심 시설을 파괴하고 유유히 빠져나옵니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "offensive_air_superiority_79",
        name: "공중 지휘소 무력화",
        description: "지상의 지휘 통제 센터를 공중에서 정밀 타격하여 전쟁 수행 지능을 마비시킵니다. 적군 전체를 머리 없는 신체처럼 만들어 우왕좌왕하게 만듭니다.",
        personality: "OFFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_total_war_80",
        name: "철벽 방어선 구축",
        description: "주요 진입로에 다층적인 참호와 콘크리트 벙커를 건설하여 적의 전진을 막습니다. 적이 막대한 피해를 보지 않고서는 한 걸음도 뗄 수 없게 만듭니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_81",
        name: "청야 작전",
        description: "후퇴하면서 적군이 활용할 수 있는 모든 물자와 식량, 건물을 파괴합니다. 점령한 땅에서 아무것도 얻지 못한 적군이 보급난에 빠지게 유도합니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_82",
        name: "요새화 벙커 네트워크",
        description: "지하 통로로 연결된 요새들을 구축하여 적의 폭격에도 부대를 온전히 보존합니다. 지상에서는 보이지 않지만 언제든 역습을 가할 수 있는 요새군입니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_83",
        name: "종심 방어",
        description: "한 줄의 방어선이 뚫리더라도 뒤에 수많은 방어선이 대기하는 겹겹의 방어 체계를 갖춥니다. 적의 공격 에너지를 전진할수록 소진시키는 전략입니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_84",
        name: "도시 요새화",
        description: "일반 도시의 모든 건물을 방어 거점으로 개조하여 시가전을 유도합니다. 적군이 미로 같은 도시에서 보이지 않는 저격수와 함정에 소모되게 만듭니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_85",
        name: "민병대 동원",
        description: "일반 시민들을 무장시켜 정규군과 함께 방어전에 투입합니다. 압도적인 수적 열세를 머릿수로 극복하며 적의 점령 속도를 늦춥니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_86",
        name: "지연전",
        description: "승리보다는 적의 진격 속도를 늦추는 데 집중하여 시간을 법니다. 그 사이 우방국의 지원을 받거나 강력한 반격 무기를 준비합니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_87",
        name: "거점 사수",
        description: "전략적으로 포기할 수 없는 요충지에 정예병을 배치하여 끝까지 저항합니다. 적의 발을 묶어두어 다른 전선의 아군이 재정비할 기회를 제공합니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_88",
        name: "방어적 지뢰 매설",
        description: "적의 예상 진로에 대량의 대인 및 대전차 지뢰를 매설합니다. 지뢰밭에 발이 묶인 적군을 장거리 포격으로 섬멸하는 방식입니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_89",
        name: "지하 대피소 운용",
        description: "전 국민과 핵심 설비를 지하로 대피시켜 적의 전략 폭격 효과를 무력화합니다. 국가의 핵심 기능을 유지하며 장기전으로 끌고 갑니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_90",
        name: "보급로 우회",
        description: "적의 공격을 받는 주요 도로 대신 비밀리에 구축한 보급로를 통해 물자를 공급합니다. 전선이 고립되는 것을 막고 지속적인 저항 능력을 확보합니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_91",
        name: "역습 준비",
        description: "적의 공세가 가장 치열할 때 힘을 비축했다가, 적이 지친 순간을 노려 반격을 가합니다. 수비의 끝을 공격으로 장식하여 전세를 역전시키는 작전입니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_92",
        name: "게릴라 저항",
        description: "점령당한 지역 뒤편에서 소규모 부대를 운영해 적의 후방을 계속 괴롭힙니다. 적군이 점령지를 안정화하지 못하게 만들어 병력을 분산시키게 합니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_93",
        name: "대공망 밀집",
        description: "모든 방어 진지에 대공포와 지대공 미사일을 촘촘히 배치합니다. 적의 항공 지원을 원천 차단하여 지상군끼리의 공정한(?) 대결을 강요합니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_94",
        name: "주요 시설 은폐",
        description: "위장막과 기만 시설을 활용해 공장이나 지휘소를 평범한 건물처럼 보이게 합니다. 적의 폭탄이 엉뚱한 곳에 낭비되도록 유도하는 기만술입니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_95",
        name: "전략적 후퇴",
        description: "지형이 불리할 때는 과감히 후퇴하여 더 유리한 방어 지점으로 적을 끌어들입니다. 적의 보급선은 늘리고 아군의 보급선은 짧게 만드는 효과가 있습니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_96",
        name: "방어 기동",
        description: "고정된 방어선에 머물지 않고 적의 공격 지점에 맞춰 방어 병력을 빠르게 이동시킵니다. 유연한 대응으로 적의 집중 타격을 회피하며 방어력을 유지합니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_97",
        name: "결항 항전",
        description: "모든 병사에게 사수 명령을 내려 한 사람도 물러서지 않고 싸우게 합니다. 극단적인 정신 무장을 통해 적에게 심리적 경외심과 피로감을 줍니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_98",
        name: "보급품 비축",
        description: "전쟁 전부터 산더미 같은 식량과 탄약을 전국 곳곳에 숨겨둡니다. 외부 보급이 끊기더라도 수년 동안 자력으로 버틸 수 있는 환경을 만듭니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_total_war_99",
        name: "함정 구역 설정",
        description: "방어선 일부를 일부러 약하게 만들어 적을 깊숙이 유인한 뒤, 사방에서 포위하여 섬멸합니다. 적의 승리감을 이용해 패배를 안겨주는 고도의 함정입니다.",
        personality: "DEFENSIVE",
        scenario: "TOTAL_WAR"
    },
    {
        id: "defensive_naval_blockade_100",
        name: "해안포대 방어",
        description: "해안 절벽과 요새에 강력한 대함포를 배치해 접근을 막습니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_101",
        name: "항만 기뢰지대",
        description: "아군 항구 주변을 기뢰로 도배하여 적 함선의 진입을 물리적으로 차단합니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_102",
        name: "대잠 초계 강화",
        description: "소나와 초계기를 총동원해 잠수함의 침투를 24시간 감시합니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_103",
        name: "호송 선단 보호",
        description: "구축함으로 상선들을 겹겹이 에워싸 약탈을 막아냅니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_104",
        name: "연안 방어 기동",
        description: "얕은 바다의 이점을 살려 소형함들이 적 대형함을 농락합니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_105",
        name: "수중 음향 감시망",
        description: "바다 밑바닥에 감지기를 깔아 적의 움직임을 실시간으로 읽습니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_106",
        name: "방어용 인공섬",
        description: "바다 한가운데 요새화된 섬을 만들어 방어 반경을 넓힙니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_107",
        name: "항구 폐쇄",
        description: "최악의 경우 스스로 선박을 침몰시켜 항구 입구를 막아버립니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_108",
        name: "근해 고슴도치 전략",
        description: "무수한 미사일 고속정을 배치해 적이 다가오면 벌떼처럼 공격합니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_109",
        name: "해안 방어벽",
        description: "상륙이 가능한 해변에 거대한 콘크리트 장벽과 장애물을 설치합니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_110",
        name: "잠입 차단",
        description: "해안선 근처의 야간 순찰을 강화해 소규모 침투조를 막습니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_111",
        name: "해상 구조대 전개",
        description: "피해를 본 아군 함선에서 병력을 신속히 구조해 전력 손실을 줄입니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_112",
        name: "보급선 호위",
        description: "전투함 일부를 보급선 전담 경호팀으로 지정해 안정성을 높입니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_113",
        name: "수중 장벽 구축",
        description: "적 잠수함이 통과할 수 없는 거대한 그물과 장벽을 수중에 설치합니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_114",
        name: "연안 경비 강화",
        description: "무장한 해양 경찰과 경비정을 동원해 촘촘한 감시망을 유지합니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_115",
        name: "적 잠수함 탐지",
        description: "최신 대잠 헬기를 운용해 적 잠수함을 끝까지 추격해 부상시킵니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_116",
        name: "해양 주권 선포",
        description: "국제법을 강조하며 적의 진입이 불법임을 전 세계에 알립니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_117",
        name: "항만 요새화",
        description: "항구 주변 건물을 포대로 개조해 최후의 항전 준비를 합니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_118",
        name: "해안 미사일 기지",
        description: "산속 깊이 숨겨진 미사일 차량으로 언제든 적 함대를 저격합니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_naval_blockade_119",
        name: "기동 방어 함대",
        description: "중앙에 대기하다가 적이 나타난 지점으로 즉각 출동해 방어합니다.",
        personality: "DEFENSIVE",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "defensive_border_skirmish_120",
        name: "장벽 및 참호 구축",
        description: "국경 전체를 가로지르는 철옹성을 쌓아 물리적 진입을 막습니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_121",
        name: "국경 요새화",
        description: "주요 도로마다 요새를 건설해 적 전차의 통행을 원천 봉쇄합니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_122",
        name: "유인 매복",
        description: "적이 국경을 넘도록 유도한 뒤 미리 준비된 사격 구역에서 섬멸합니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_123",
        name: "지대지 미사일 배치",
        description: "적이 국경 인근에 집결하면 즉시 타격할 수 있는 미사일을 대기시킵니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_124",
        name: "국경 수비대 증강",
        description: "최정예 병력을 국경에 상시 배치해 즉각 대응 체계를 갖춥니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_125",
        name: "전자전 방어",
        description: "적의 전파 방해에 대비해 독자적인 보안 통신망을 강화합니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_126",
        name: "통제 구역 설정",
        description: "국경 인근 민간인의 출입을 제한해 간첩 침투를 차단합니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_127",
        name: "정찰 자산 감시",
        description: "고성능 CCTV와 센서로 국경의 모든 움직임을 모니터링합니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_128",
        name: "방어적 포격",
        description: "적이 국경에 접근하면 경고의 의미로 정밀 포격을 가합니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_129",
        name: "지뢰 지대",
        description: "적이 올 수밖에 없는 길목에 대량의 지뢰를 깔아 진격을 늦춥니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_130",
        name: "비무장지대 사수",
        description: "완충 지대의 평화를 유지하며 적의 도발 명분을 제거합니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_131",
        name: "기동 방어군",
        description: "헬기를 이용해 국경 어느 곳이든 10분 내로 증원군을 보냅니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_132",
        name: "검문소 강화",
        description: "모든 출입 인원과 차량을 철저히 검사해 파괴 분자를 색출합니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_133",
        name: "침투 차단망",
        description: "적 특수부대가 넘을 수 없는 센서 벽을 설치합니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_134",
        name: "관측소 증설",
        description: "사각지대 없는 감시를 위해 수많은 무인 관측소를 운영합니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_135",
        name: "장애물 설치",
        description: "전차의 진입을 막는 '용치'와 철조망을 겹겹이 배치합니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_136",
        name: "통신망 보안",
        description: "아군 국경 수비대의 무전을 적이 도청하지 못하게 암호화합니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_137",
        name: "국경 경보 체계",
        description: "침입 발생 시 전 지역에 즉시 비상 사이렌을 울려 대비합니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_138",
        name: "지형지물 활용",
        description: "험준한 산악 지형을 방패 삼아 소수 병력으로 대군을 막습니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_border_skirmish_139",
        name: "방어용 드론",
        description: "자폭 기능이 아닌 정찰과 경고 기능을 가진 드론으로 국경을 지킵니다.",
        personality: "DEFENSIVE",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "defensive_air_superiority_140",
        name: "방공 식별 구역 강화",
        description: "미식별 항공기가 근처에 오면 즉시 요격기를 출격시킵니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_141",
        name: "지대공 미사일 밀집",
        description: "하늘 전체를 뒤덮을 정도의 미사일 방어망을 구축합니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_142",
        name: "요격기 상시 대기",
        description: "조종사들이 콕핏 안에서 대기하며 5분 내 이륙 태세를 유지합니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_143",
        name: "대공 감시 레이더",
        description: "적의 스텔스기까지 잡아낼 수 있는 다파장 레이더를 운영합니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_144",
        name: "기만용 가짜 기지",
        description: "가짜 전투기 모형을 배치해 적 폭격기의 헛수고를 유도합니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_145",
        name: "항공기 은폐 엄폐",
        description: "전투기를 지하 격납고나 산속 동굴에 숨겨 보존합니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_146",
        name: "이동식 방공 시스템",
        description: "미사일 차량을 계속 이동시켜 적의 선제 타격을 피합니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_147",
        name: "공중 우회로 확보",
        description: "적의 방공망을 피해 아군기가 안전하게 이동할 통로를 지킵니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_148",
        name: "전자파 차단",
        description: "적의 유도 미사일을 무력화하는 강력한 재밍 신호를 방출합니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_149",
        name: "방어적 제공 작전",
        description: "아군 영공에 들어온 적기만 골라 격추하며 세력을 보존합니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_150",
        name: "통합 관제 방어",
        description: "육해공의 모든 레이더 정보를 통합해 효율적으로 요격합니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_151",
        name: "탄도탄 요격",
        description: "적의 미사일을 공중에서 맞추는 미사일 방어 체계(MD)를 가동합니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_152",
        name: "비행 금지 구역 설정",
        description: "특정 지역을 비행 금지 구역으로 선포하고 진입 시 무조건 격추합니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_153",
        name: "대공포 진지",
        description: "미사일이 놓친 적기를 위해 촘촘한 기관포 방어망을 운영합니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_154",
        name: "통신 재밍 방어",
        description: "적의 전자전 공격 속에서도 아군기끼리의 통신을 유지합니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_155",
        name: "공군 기지 요새화",
        description: "기지 주변을 견고한 요새로 만들어 지상 공격으로부터 보호합니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_156",
        name: "조기 경보 전파",
        description: "적기가 뜨는 순간 전 국민에게 공습경보를 전달합니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_157",
        name: "방공망 복구 작전",
        description: "파괴된 레이더나 미사일 기지를 즉시 수리해 방어 공백을 메웁니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_158",
        name: "항공 자산 보호",
        description: "전쟁 초기에는 전투기를 아껴뒀다가 결정적인 순간에 출격시킵니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "defensive_air_superiority_159",
        name: "긴급 요격",
        description: "적 폭격기가 목표에 닿기 전 자살 특공에 가까운 요격을 감행합니다.",
        personality: "DEFENSIVE",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_total_war_160",
        name: "무력 시위",
        description: "전면전 대신 국경 인근에서 대규모 훈련을 열어 적의 공격을 억제합니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_161",
        name: "완충 지대 확보",
        description: "적과 아군 사이에 중립 지대를 설정해 직접적인 충돌을 피합니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_162",
        name: "협상용 점령",
        description: "작은 요충지 하나만 점령한 뒤 이를 지렛대 삼아 유리한 평화 협상을 제안합니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_163",
        name: "평화 유지군",
        description: "국제 기구의 승인을 얻어 제3국 군대를 전선에 배치해 전쟁을 멈춥니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_164",
        name: "제한적 보복",
        description: "적이 공격한 만큼만 똑같이 되돌려주어 확전을 방지하고 경고를 보냅니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_165",
        name: "경제 제재 병행",
        description: "총 대신 경제적 압박을 가해 적이 스스로 전쟁을 포기하게 유도합니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_166",
        name: "전략적 인내",
        description: "적의 도발에도 즉각 대응하지 않고 국제 사회의 여론이 우리 편이 될 때까지 기다립니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_167",
        name: "외교적 고립 작전",
        description: "적국을 국제 사회에서 악당으로 몰아세워 우방국들이 돕지 못하게 만듭니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_168",
        name: "정보전",
        description: "적의 내부 정보를 유출시켜 적국 시민들이 전쟁에 반대하게 만듭니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_169",
        name: "인도적 지원 통로",
        description: "민간인들을 위해 길을 열어주어 전쟁의 비극을 최소화하고 명분을 쌓습니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_170",
        name: "휴전 협상 유도",
        description: "전력이 팽팽할 때 제3자의 중재를 요청해 전쟁을 조기에 끝냅니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_171",
        name: "정치적 공작",
        description: "적국 내부의 온건파를 지원해 주전파 지휘부를 교체하도록 유도합니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_172",
        name: "국제 여론전",
        description: "미디어를 활용해 아군의 방어 정당성을 홍보하고 지원을 끌어냅니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_173",
        name: "방어적 억제력",
        description: "\"공격하면 너도 죽는다\"는 핵전력이나 강력한 무기를 보여주며 평화를 유지합니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_174",
        name: "비밀 작전",
        description: "전면전 대신 요인 암살이나 주요 시설 파괴 등 보이지 않는 전쟁을 치릅니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_175",
        name: "중재군 수용",
        description: "아군 영토에 제3국 군대가 주둔하게 하여 적의 공격 명분을 없앱니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_176",
        name: "전력 균형 유지",
        description: "어느 한쪽이 너무 강해지지 않게 힘을 조절하며 소모전을 유도합니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_177",
        name: "통신 채널 개방",
        description: "전쟁 중에도 적국 수뇌부와 언제든 대화할 수 있는 '핫라인'을 유지합니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_178",
        name: "전시 중립 선언",
        description: "강대국 사이의 전쟁에서 어느 편도 들지 않고 영토 침범만 막습니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_total_war_179",
        name: "위기 관리 작전",
        description: "우발적 충돌이 큰 전쟁으로 번지지 않게 현장에서 즉시 불을 끕니다.",
        personality: "NEUTRAL",
        scenario: "TOTAL_WAR"
    },
    {
        id: "neutral_naval_blockade_180",
        name: "선별적 검문",
        description: "무기가 아닌 식량이나 생필품을 실은 배는 통과시켜 국제적 비난을 피합니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_181",
        name: "국제 수역 감시",
        description: "공해상에서의 무질서한 전투를 막고 평화적인 항행권을 보호합니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_182",
        name: "경고 사격",
        description: "적함 근처 바다에 포를 쏴서 더 이상 다가오지 말라는 신호를 보냅니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_183",
        name: "해로 우회 유도",
        description: "봉쇄 구역 대신 더 멀지만 안전한 다른 길로 가라고 상선들에게 안내합니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_184",
        name: "제한적 임검",
        description: "의심스러운 배만 세워서 조사하고, 문제가 없으면 사과와 함께 보내줍니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_185",
        name: "해상 평화 구역",
        description: "특정 해역을 전투 금지 구역으로 선포하고 누구든 진입하면 퇴거시킵니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_186",
        name: "해적 소탕 명분",
        description: "해적을 잡는다는 핑계로 군함을 배치해 자연스럽게 해역을 통제합니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_187",
        name: "공해상의 대치",
        description: "싸우지 않고 적 함대 앞에 아군 함대를 배치해 길을 막고 버팁니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_188",
        name: "해상 정찰",
        description: "공격 무기 없이 정찰기만 띄워 적의 움직임을 모두 기록하고 공개합니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_189",
        name: "구조 및 수색",
        description: "바다에 빠진 적군도 구조해주며 아군의 도덕적 우위를 과시합니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_190",
        name: "해양법 준수 감시",
        description: "국제 해양법을 어기는 적의 행동을 낱낱이 기록해 국제 재판소에 제소합니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_191",
        name: "환경 보호 명분",
        description: "해양 오염을 막는다는 명분으로 유조선의 통행을 제한적으로 통제합니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_192",
        name: "해로 보호",
        description: "아군과 중립국들의 상선들이 공격받지 않게 안전 통로를 만들어 호위합니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_193",
        name: "통신 감청",
        description: "바다 위에서 오가는 모든 무전을 수집해 적의 의도를 파악합니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_194",
        name: "비살상 무기 대응",
        description: "물포나 음향 대포를 사용해 적함을 손상시키지 않고 돌려보냅니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_195",
        name: "해상 완충기 설치",
        description: "대형 부표나 그물을 설치해 배들이 물리적으로 접근하기 어렵게 만듭니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_196",
        name: "교전 규칙 준수",
        description: "공격받기 전에는 절대로 먼저 쏘지 않는 엄격한 수칙을 지킵니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_197",
        name: "함대 근접 시위",
        description: "적 함대와 아주 가까운 거리에서 나란히 항해하며 압박감을 줍니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_198",
        name: "해상 통행료 부과",
        description: "봉쇄 대신 특정 해역 통과 시 안전 보장 명목의 비용을 요구합니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_naval_blockade_199",
        name: "정보 수집함 운용",
        description: "어선으로 위장한 배를 띄워 적 함대의 정보를 은밀히 수집합니다.",
        personality: "NEUTRAL",
        scenario: "NAVAL_BLOCKADE"
    },
    {
        id: "neutral_border_skirmish_200",
        name: "정찰 드론 운용",
        description: "사람이 직접 가지 않고 드론으로만 국경을 감시해 인명 피해를 막습니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_201",
        name: "경고 방송",
        description: "확성기로 아군의 방어 의지를 알리고 적군의 불법 행위를 지적합니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_202",
        name: "대치 상태 유지",
        description: "참호에서 서로 쳐다만 보며 먼저 쏘기를 기다리는 고도의 심리전을 펼칩니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_203",
        name: "비살상 무기 대응",
        description: "국경을 넘는 자들에게 최루가스나 고무탄을 쏴서 생명을 보존하며 막습니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_204",
        name: "국지적 휴전",
        description: "충돌이 일어난 마을에서만이라도 싸움을 멈추기로 현장 지휘관끼리 합의합니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_205",
        name: "국경 감시단",
        description: "중립적인 제3국의 감시원들을 국경에 초청해 투명성을 확보합니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_206",
        name: "장벽 유지보수",
        description: "무너진 담장을 고치며 우리 땅을 지키겠다는 의지만 묵묵히 보여줍니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_207",
        name: "외교관 보호",
        description: "전쟁 중에도 국경을 넘는 외교관들의 안전을 보장해 대화의 끈을 놓지 않습니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_208",
        name: "월경 방지",
        description: "아군 병사나 민간인이 실수로 적진에 들어가지 않게 철저히 단속합니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_209",
        name: "정치 홍보전",
        description: "국경에 대형 전광판을 설치해 아군의 번영과 평화 의지를 보여줍니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_210",
        name: "심리전 방송",
        description: "적군에게 고향 소식이나 노래를 들려주며 전투 의지를 약화시킵니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_211",
        name: "통신 차단",
        description: "국경 인근의 특정 주파수만 재밍하여 적의 연락을 일시적으로 방해합니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_212",
        name: "국경 무역 제한",
        description: "시장을 닫아 적국 국경 마을의 생필품 수급을 어렵게 만들어 압박합니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_213",
        name: "합동 정찰 제안",
        description: "오히려 적군에게 국경을 같이 정찰하자고 제안해 오해를 줄입니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_214",
        name: "우발적 충돌 방지",
        description: "실수로 총이 발사되었을 때 즉시 사과하고 상황을 수습합니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_215",
        name: "경계선 마킹",
        description: "누가 봐도 알 수 있게 국경선을 크고 분명하게 표시해 분쟁을 예방합니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_216",
        name: "탈영병 관리",
        description: "적국에서 넘어온 탈영병을 인도적으로 대우하며 정보를 얻습니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_217",
        name: "중립 지대 정찰",
        description: "아군과 적군 누구의 땅도 아닌 곳의 동태를 살펴 선점당하지 않게 합니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_218",
        name: "국경 긴장 완화",
        description: "명절이나 기념일에는 국경의 경계 수위를 낮춰 평화의 제스처를 보냅니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_border_skirmish_219",
        name: "평화 선전",
        description: "국경 근처에 평화 공원을 조성해 전쟁터가 아닌 공존의 장임을 강조합니다.",
        personality: "NEUTRAL",
        scenario: "BORDER_SKIRMISH"
    },
    {
        id: "neutral_air_superiority_220",
        name: "비행 금지 구역",
        description: "특정 하늘을 \"누구도 날 수 없는 곳\"으로 선포해 공습을 원천 차단합니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_221",
        name: "공중 정찰",
        description: "공격용 무기 없이 고성능 카메라만 달고 적의 기지 배치를 촬영합니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_222",
        name: "공중 급유 대기",
        description: "언제든 장거리 비행이 가능하도록 급유기를 공중에 띄워두어 억제력을 보여줍니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_223",
        name: "위성 감시",
        description: "우주에서 적의 비행장 움직임을 감시해 이륙 사실을 미리 알립니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_224",
        name: "조기 경보 체제",
        description: "거대한 레이더 기를 띄워 수백 킬로미터 밖의 적기를 미리 찾아냅니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_225",
        name: "EMP 억제",
        description: "적의 전자 기기만 고장 내는 비살상 전자기파 공격을 준비합니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_226",
        name: "영공 침범 경고",
        description: "적기가 다가오면 무전으로 즉시 퇴거를 요청하고 요격 의사를 밝힙니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_227",
        name: "전자파 수집",
        description: "적의 레이더 신호를 수집해 나중에 적 미사일을 교란할 데이터를 모읍니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_228",
        name: "공중 충돌 방지",
        description: "적기와 마주쳤을 때 사고가 나지 않게 국제 비행 규칙을 철저히 지킵니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_229",
        name: "기상 조작 정찰",
        description: "인공 강우 등을 이용해 적 비행장의 시야를 일시적으로 가립니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_230",
        name: "드론 감시망",
        description: "수많은 소형 드론을 띄워 하늘의 작은 틈새까지 감시합니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_231",
        name: "공중 위력 시위",
        description: "적기가 보이는 곳에서 아군 전투기가 화려한 곡예 비행을 하며 실력을 뽐냅니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_232",
        name: "무인 정찰기 살포",
        description: "격추되어도 인명 피해가 없는 무인기를 대량으로 띄워 적을 피곤하게 합니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_233",
        name: "항공 통제",
        description: "민간 항공기들이 전쟁에 휘말리지 않게 안전한 하늘길을 관리합니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_234",
        name: "신호 정보 수집",
        description: "적 전투기들 사이의 교신 내용을 도청해 작전 계획을 알아냅니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_235",
        name: "항공 안전 구역",
        description: "병원이나 유적지 상공을 안전 구역으로 정해 폭격을 방지합니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_236",
        name: "비행 경로 추적",
        description: "적기의 이륙부터 착륙까지 모든 경로를 기록해 국제 사회에 고발합니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_237",
        name: "공중 중계 거점",
        description: "산악 지형에서 통신이 끊기지 않게 하늘에 통신 중계기를 띄웁니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_238",
        name: "전파 방해 시연",
        description: "적의 레이더를 잠시 먹통으로 만들었다가 풀어주며 기술적 우위를 경고합니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
    {
        id: "neutral_air_superiority_239",
        name: "항공 억제력 과시",
        description: "최신형 스텔스기를 한 번씩 노출시켜 적이 함부로 덤비지 못하게 합니다.",
        personality: "NEUTRAL",
        scenario: "AIR_SUPERIORITY"
    },
];
