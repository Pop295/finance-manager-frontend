# FinFlow — Personal Finance Manager (Vue 3)

A modern, responsive personal finance manager built with **Vue 3 + Vite + Vue Router + Pinia + Axios + Tailwind CSS + Chart.js**.
Designed to pair with a separate **Python Flask REST API** backend.

## ✨ Features
- **Auth**: Login / Register, JWT storage (localStorage), protected routes, logout
- **Dashboard**: balance, income, expenses, remaining budget, transaction count, recent list, expense-by-category pie chart, monthly spending line chart
- **Transactions**: searchable + filterable (date/category/type) paginated table, add/edit/delete modals
- **Categories**: full CRUD with name, color, icon
- **Budgets**: monthly budget + per-category budgets, progress bars, overspend warnings
- **Reports**: monthly income/expense charts, expenses by category, top spending categories, summary cards
- **Profile**: avatar, name, email, change-password form, settings
- **UI kit**: cards, buttons, tables, inputs, selects, date picker, charts, modals, toasts, spinner, empty/error states
- **Layout**: responsive sidebar + topbar

## 🚀 Getting started
```bash
npm install
cp .env.example .env   # edit if you have a backend
npm run dev
```
Open http://localhost:5173

> **Demo mode** is ON by default (`VITE_USE_MOCK=true`) — the app runs entirely on mock data, no backend needed. Any email/password logs you in.

## 🔌 Connecting your Flask backend
1. Set `VITE_USE_MOCK=false` and `VITE_API_BASE_URL=http://localhost:5000/api` in `.env`.
2. Implement these REST endpoints (the frontend already calls them via `src/services/`):

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/login` | `{ token, user }` |
| POST | `/auth/register` | `{ token, user }` |
| GET/POST | `/transactions` | list / create |
| PUT/DELETE | `/transactions/:id` | update / delete |
| GET/POST | `/categories` | list / create |
| PUT/DELETE | `/categories/:id` | update / delete |
| GET | `/budgets` | `{ monthly, items }` |
| PUT | `/budgets/:id`, `/budgets/monthly` | update |
| GET | `/reports` | `{ months, income, expenses, byCategory }` |
| GET/PUT | `/profile` | get / update |
| PUT | `/profile/password` | change password |

The Axios instance (`src/services/api.js`) auto-attaches `Authorization: Bearer <token>` and redirects to login on 401.

## 📁 Structure
```
src/
├── assets/        # global Tailwind CSS
├── components/    # ui/ charts/ layout/ transactions/
├── layouts/       # AuthLayout, DashboardLayout
├── pages/         # Dashboard, Transactions, Categories, Budgets, Reports, Profile, auth/
├── router/        # routes + auth guards
├── services/      # Axios API services + mock data
└── stores/        # Pinia stores
```
