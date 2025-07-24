# ai_rticle_frontend

**Live URL**: [https://ai-rticle-frontend.vercel.app](https://ai-rticle-frontend.vercel.app)

AI-powered blog frontend application where users can explore, search, and manage articles.

---

## 🌟 Features

- 🔐 Authentication flow (Login, Register)
- 📝 Create, view, and manage article posts
- 🔎 Search articles by title and hashtag
- 🔖 Tag-based navigation
- 🚀 Optimized image handling with Next.js
- 📱 Responsive UI with Tailwind CSS & ShadCN UI
- 🔧 Form validation with React Hook Form + Zod
- 🧪 Unit testing with Jest & Testing Library
- 🧹 Code linting, formatting & CI/CD with GitHub Actions

---

## ⚙️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS, ShadCN UI
- **Forms**: React Hook Form, Zod
- **Testing**: Jest, Testing Library
- **State Management**: Local state (useState, useEffect)
- **Auth Handling**: JWT + LocalStorage
- **API Client**: Axios
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rubayetseason/ai-rticle-frontend.git ai-rticle-frontend
cd ai-rticle-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

Create a `.env` file in the root with the following:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

> Replace the API URL as needed.

### 4. Run Locally

```bash
npm run dev
```

### 5. Run Tests

```bash
npm run test
```

### 6. Lint and Format

```bash
npm run lint     # Check code linting
npm run format   # Auto-format with Prettier (add this script if needed)
```

---

## 🛠️ Available Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "jest",
  "format": "prettier --check .",
  "format:fix": "prettier --write ."
}
```

---

## 📁 Folder Structure (Partial)

- `src/app/` — App Router pages
- `components/` — Reusable components
- `services/` — API layer
- `types/` — TypeScript interfaces
- `helpers/` — Utility functions (e.g. JWT, localStorage)
- `.github/workflows/ci.yml` — GitHub Actions for CI/CD

---

## 📦 Dependencies (Important)

Some key dependencies:

- `next`: 15.4.3
- `react`: 19.1.0
- `tailwindcss`: ^4
- `@hookform/resolvers`, `zod`, `react-hook-form`
- `@testing-library/react`, `jest`, `ts-jest`

---

## 🧪 GitHub Actions: CI/CD

Runs lint, test, and format checks on push to `main` and on pull requests.