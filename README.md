# Liverpool Lounge — PlayStation Gaming Lounge Manager 🎮

A full-featured gaming lounge management system built with **React + TypeScript + Vite + Firebase**.

## ✨ Features

- 🎮 Room booking & session management
- 👤 Dual-role authentication (Admin / Customer)
- 🛒 POS system with food & drinks ordering
- 📊 Revenue dashboard & analytics
- 🌍 Multi-language support (Arabic / English)
- 🔥 Real-time data with Firebase Firestore

## 🚀 Getting Started (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env and fill in your Firebase & Paymob credentials
```

### 4. Run the dev server
```bash
npm run dev
```

App will be available at `http://localhost:5173`

## 🌐 Deploy to Vercel

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Add the environment variables from `.env.example` in the Vercel dashboard:
   - `Settings → Environment Variables`
4. Deploy! Vercel will automatically rebuild on every push.

## 🔧 Environment Variables

See `.env.example` for all required variables. You'll need:
- **Firebase** project credentials (free tier works fine)
- **Paymob** API keys (optional, for payment processing)

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 + TypeScript | UI framework |
| Vite 8 | Build tool |
| Tailwind CSS 4 | Styling |
| Firebase | Auth + Firestore database |
| Zustand | State management |
| React Router 7 | Client-side routing |
| Recharts | Analytics charts |

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Route-level pages (Admin, Customer)
├── services/       # Firebase/Firestore service layer
├── store/          # Zustand state stores
├── i18n/           # Translation files (AR/EN)
└── types/          # TypeScript type definitions
```
