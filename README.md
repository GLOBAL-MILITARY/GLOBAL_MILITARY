# 🌍 Global Military Power Platform

실시간 세계 군사력 비교 및 시뮬레이션 플랫폼

## ✨ 주요 기능

### 📊 데이터 시각화
- **3D 인터랙티브 지구본**: 145개국 군사력 데이터를 실시간으로 표시
- **국가별 상세 정보**: 육군, 해군, 공군 세부 데이터 및 핵무기 보유 현황
- **실시간 랭킹**: 글로벌 군사력 순위 및 파워 인덱스

### ⚔️ 시뮬레이션
- **전투 시나리오**: 총력전, 해상 봉쇄, 공중 우세, 국경 분쟁
- **전술 시스템**: 145개국 고유의 공격/방어/특수 전술 (국가당 10-50개)
- **핵무기 옵션**: 실제 보유국 기반 핵전쟁 시뮬레이션

### 🔍 비교 기능
- **국가 간 비교**: 군사력, 경제력, 기술 수준 직접 비교
- **글로벌 인텔리전스**: 최신 군사 뉴스 및 분석

## 🚀 시작하기

### 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 기술 스택

- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **3D Visualization**: Three.js, React Three Fiber
- **Icons**: Lucide React

### 데이터 구조

- 145개국 군사 데이터 (2024년 기준)
- 국가별 현대화 수준 (1-10 레벨)
- 10,000+ 전술 데이터베이스

## 📁 프로젝트 구조

```
military-platform/
├── src/
│   ├── app/              # Next.js 페이지
│   ├── components/       # React 컴포넌트
│   ├── lib/             # 데이터 및 유틸리티
│   └── types/           # TypeScript 타입
├── scripts/             # 데이터 생성 스크립트
└── public/              # 정적 파일
```

## 🛠️ 주요 컴포넌트

- `AntiGravityGlobe`: 3D 지구본 시각화
- `CountryDetailClient`: 국가 상세 정보
- `Simulation`: 전투 시뮬레이터
- `RankingList`: 군사력 순위

## 📝 라이선스

MIT License

## 👤 개발자

commonsensestory-ops
