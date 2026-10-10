# Food Delivery App

A food delivery application with a customer-facing storefront, an admin dashboard, and an Express API backed by MongoDB. The storefront supports browsing food, managing a cart, placing orders, and viewing order history. The admin dashboard supports adding and managing food items and viewing and updating orders.

## Project structure

```text
food-del/
├── admin/       # React + Vite administration dashboard
├── backend/     # Express API, MongoDB models, and uploaded food images
└── frontend/    # React + Vite customer storefront
```

## Requirements

- Node.js and npm
- A MongoDB database (local or MongoDB Atlas)
- A Stripe account and secret key for checkout

## Local setup

Run each component in a separate terminal from the project root.

### 1. Configure the backend

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Edit `backend/.env` and set:

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | Connection string for your MongoDB database |
| `JWT_SECRET` | A long, private random string used to sign login tokens |
| `STRIPE_SECRET_KEY` | Your Stripe secret key (use a test key for local development) |

Start the API:

```powershell
npm run server
```

The API runs at `http://localhost:4000`. To populate the database with the sample food items and copy their images into `backend/uploads`, open another terminal:

```powershell
cd backend
npm run seed
```

### 2. Start the storefront

The backend redirects Stripe checkout back to the storefront at port `5174`, so start Vite on that port:

```powershell
cd frontend
npm install
npm run dev -- --port 5174
```

Open the URL printed by Vite (normally `http://localhost:5174`).

### 3. Start the admin dashboard

```powershell
cd admin
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`).

## Available scripts

| Directory | Command | Purpose |
| --- | --- | --- |
| `backend` | `npm run server` | Start the API with nodemon |
| `backend` | `npm run seed` | Insert or update the sample food items |
| `frontend` | `npm run dev` | Start the storefront development server |
| `frontend` | `npm run build` | Build the storefront for production |
| `frontend` | `npm run lint` | Run ESLint on the storefront |
| `admin` | `npm run dev` | Start the admin development server |
| `admin` | `npm run build` | Build the admin dashboard for production |
| `admin` | `npm run lint` | Run ESLint on the admin dashboard |

## Security notes

- Never commit `.env` files, Stripe secret keys, database credentials, or JWT secrets. The backend `.gitignore` excludes `.env` files; review `git status` before pushing.
- `backend/.env.example` contains placeholders only. Put your real values in `backend/.env`.
- If a real secret has already been exposed or pushed to a repository, revoke or rotate it with the relevant provider.

