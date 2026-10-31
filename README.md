# Sungrow Next.js Web Application

A pixel-faithful, responsive recreation of the Sungrow web platform built with the Next.js App Router, React 19, TypeScript, Tailwind CSS, and Redux Toolkit.

---

## 🚀 Features

- **7 Recreated Pages & Experiences**:
  - **Home**: Hero scroll video sequence, pinned curtain card transition, scenario tabs, product showcase, and news highlights.
  - **C&I PV Solution**: Commercial & Industrial solar energy solutions, technical features, and system architecture.
  - **Residential Solution**: Residential PV + ESS + EV Charging ecosystem with interactive capability breakdowns.
  - **Brand Story**: About Us timeline, company history, mission, global footprint, and leadership values.
  - **Sustainability**: ESG pillars, net-zero climate commitments, honor awards, and ESG report downloads.
  - **Authentication (Login & Register)**:
    - Multi-mode sign-in (Password & Verification Code).
    - Multi-step registration flow with country selection, role classification, and email verification.
    - User account management (Reset Password, Delete Account, Log Out).

- **Redux Toolkit & RTK Query Integration**:
  - **Auth Session**: Manages active user identity and session status.
  - **RTK Query (`authApi`)**: Handles all authentication queries/mutations with silent re-auth, mutex concurrency control, and tag-based cache invalidation.
  - **UI Overlays**: Manages mobile drawer, desktop mega menus, dynamic nav-row scroll hiding, and account dialogs with route-change auto-dismissal.
  - **Register Progress**: Retains multi-step progress and local verification countdown without store bloat.

- **Security & Authentication Engine**:
  - httpOnly cookie-based session management (JWT access & refresh tokens).
  - Argon2 password hashing and HMAC verification codes.
  - Dev console email transport for local testing and validation.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode)
- **State Management**: [@reduxjs/toolkit](https://redux-toolkit.js.org/) & [react-redux](https://react-redux.js.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation & Carousel**: [Motion](https://motion.dev/) & [Embla Carousel](https://www.embla-carousel.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/) (Unit/Integration) & [Playwright](https://playwright.dev/) (E2E)

---

## 🏁 Getting Started

### Prerequisites

- Node.js 20.9.0 or higher
- npm 10 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/CNAnda1623/New_Web.git
cd New_Web/frontend

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

---

## 🧪 Testing & Code Quality

```bash
# Run unit and integration tests (Vitest + MSW)
npm test

# Run end-to-end tests (Playwright)
npm run test:e2e

# Run TypeScript type check
npm run typecheck

# Run ESLint
npm run lint
```

---

## 🔑 Demo Account Credentials

For quick testing in the local environment:

- **Email**: `jane@example.com`
- **Password**: `Password123!`

---

## 📁 Project Structure

```
New_Web/
├── frontend/
│   ├── public/                 # Static assets, logos, and illustrations
│   ├── src/
│   │   ├── app/                # Next.js App Router (pages and API route handlers)
│   │   ├── components/         # React components organized by feature
│   │   │   ├── about/          # Brand story components
│   │   │   ├── auth/           # Login, account menus, dialogs, session bootstrap
│   │   │   ├── home/           # Homepage hero sequence and sections
│   │   │   ├── layout/         # Header, MegaMenu, MobileDrawer, Footer
│   │   │   ├── solution/       # Solution page components
│   │   │   ├── sustainability/ # Sustainability tabs, cards, and carousel
│   │   │   └── ui/             # Shared primitives (SmartImage, VideoPlayer, etc.)
│   │   ├── data/               # Static navigation and content configuration
│   │   ├── hooks/              # Custom client hooks (e.g. useScrollDirection)
│   │   ├── lib/                # Client utilities and link mappings
│   │   ├── server/             # Server db store, token verification, email mailer
│   │   └── store/              # Redux Toolkit store, RTK Query API, and slices
│   └── tests/
│       ├── e2e/                # Playwright end-to-end test suites
│       └── unit/               # Vitest slice, re-auth, and schema unit tests
└── README.md                   # Repository overview
```
