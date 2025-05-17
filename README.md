# FocusLog

집중 시간 추적, 일정 기록, 회고 작성을 통해 생산성을 높이는 **개인 생산성 관리 앱**입니다.

---

## 🛠️ 기술 스택

### Frontend
- **React + TypeScript**
- **Recoil** – 전역 상태 관리
- **React Router v7**
- **Tailwind CSS + DaisyUI** – 반응형 UI 구성
- **Framer Motion** – 애니메이션 효과
- **React Select / Datepicker / Hot Toast** – UI 보조 라이브러리

### Backend
- **Firebase Authentication** – Google / GitHub / Facebook 로그인
- **Firestore Database** – 사용자별 데이터 저장

### Dev Tools
- **Vite** – 빌드 환경
- **ESLint + Prettier** – 코드 스타일 통일
- **Git / GitHub** – 버전 관리 및 협업

---

## 📦 데이터 구조 및 상태 관리

### 🔐 Firebase Authentication
- Google, GitHub, Facebook 로그인 지원
- 로그인 후 사용자 UID를 기준으로 Firestore에 데이터 분리 저장

### 📂 Firestore 데이터 구조 예시
users/{uid}/categories
users/{uid}/schedules
users/{uid}/retrospects


### 🔄 Recoil 상태 전략

- 각 기능별 atom/selector 파일을 분리 관리
  - 예: `categoryAtom.ts`, `scheduleAtom.ts`, `authAtom.ts`
- 초기 mock 상태는 로컬 캐시에 저장하다가 Firestore 연동 후 전환
- atom → service(fetch/transform) → 컴포넌트 구조 유지

---

## ✨ 주요 기능

### 📅 일정 및 태스크 관리
- 카테고리별 일정 생성 및 시각적 구분
- 달력에서 일정 확인
- 일정과 연동된 회고 작성, 집중한 시간 시각화

### ⏱️ 타이머 기반 집중 기능
- 스타일 타이머 UI
- 집중 중 시각적 효과 (Radial Animation)

### 🔄 회고 기록
- 일자별 회고 작성 및 저장
- 집중하면서 느꼈던 점 태그 가능
  
### 📊 통계
- 카테고리/기간별 집중 시간, 회고 작성률 시각화
- completion rate 계산 및 예외 처리 완료

### 👤 인증
- Firebase 기반 소셜 로그인 (Google, GitHub, Facebook)
- 사용자별 개인 데이터 분리 저장

---

## 🌳 Git 브랜치 전략

### 기본 브랜치
- `main`: 배포 가능한 상태
- `dev`: 기능 통합 및 테스트용 중간 브랜치

### 기능 브랜치
- `feature/{기능이름}`: 기능 단위 작업 (예: `feature/auth-integration`)
- `fix/{이슈설명}`: 버그 수정 브랜치
- `refactor/{대상}`: 리팩터링용 브랜치

### 커밋 메시지 규칙
feat: 새로운 기능 추가
fix: 버그 수정
refactor: 리팩토링
chore: 설정 변경 및 기타 잡일
docs: 문서 작성/수정

---

## 👩‍💻 Author

> 이빛나  
> Frontend Developer
> [GitHub @Bit-na25](https://github.com/Bit-na25)
