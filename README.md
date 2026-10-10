# Food Delivery App

Food Delivery App is a full-stack food ordering platform where customers can browse a menu, manage a shopping cart, check out with Stripe, and track their orders. It includes a React storefront, a separate admin dashboard for managing menu items and orders, and an Express API with MongoDB for data storage and user authentication.

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
| `PORT` | API port; defaults to `4000` locally (the hosting platform can provide this automatically) |
| `FRONTEND_URL` | Storefront origin used for Stripe checkout return URLs; locally `http://localhost:5174` |
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

## Production environment

Configure the backend's `MONGODB_URI`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, and `FRONTEND_URL` in your hosting provider's environment settings. Set `FRONTEND_URL` to the deployed customer storefront URL; the backend uses the hosting platform's `PORT` when provided and otherwise listens on port `4000`. Set `VITE_API_URL` in both frontend hosting projects to the deployed backend URL, then rebuild/redeploy them.

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
