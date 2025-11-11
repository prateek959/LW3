# LW3 — Algorand TestNet Wallet

A small example project that demonstrates a simple Algorand TestNet wallet backed by an Express.js API and a React (Vite) frontend. The backend exposes endpoints to create accounts, send ALGO, check transaction status and list transactions. The frontend provides a basic UI to interact with those endpoints.

## Features
- Create an Algorand account (mnemonic / address)
- Check account balance
- Send ALGO transactions using mnemonic
- View transaction status and a simple transactions list (persisted to MongoDB)

## Repository structure

- `backend/` — Express API that talks to Algorand TestNet and MongoDB
	- `server.js` — app entry
	- `routes/algorand.js` — API routes mounted at `/api/algorand`
	- `controllers/algorandController.js` — route handlers
	- `services/algorandService.js` — Algorand-related logic
	- `utils/algodClient.js` — Algod client wrapper
	- `models/Transaction.js` — Mongoose transaction model
	- `.env` — environment variables (not committed)

- `frontend/` — React + Vite single-page app
	- `src/` — React source files (pages: `Home`, `SendAlgo`, `CheckStatus`, `Transactions`)

## Prerequisites
- Node.js (v16+ recommended; project uses ES modules so a modern Node.js is required)
- npm or yarn
- MongoDB instance (local or remote)
- Internet access to reach Algorand TestNet (default uses Algonode TestNet API)

## Environment variables (backend)
Create a `.env` file in `backend/` or set these variables in your environment. The app will use the default values shown if you omit them.

- `ALGOD_SERVER` — Algod REST server URL (default: `https://testnet-api.algonode.cloud`)
- `ALGOD_PORT` — Algod server port (usually empty for HTTPS)
- `ALGOD_TOKEN` — Algod API token (empty when using public Algonode endpoint)
- `MONGO_URI` — MongoDB connection string (default: `mongodb://localhost:27017/algorand-test`)
- `PORT` — Backend server port (default: `4000`)

## Install and run

All commands below are written for Windows PowerShell (you can run equivalent commands in other shells).

1) Install and run the backend

```powershell
cd backend
npm install
# start with auto-reload (nodemon)
npm run dev
```

The backend will print a message when connected to MongoDB and listening on the configured port. The API is mounted under `/api/algorand` (see the API section).

2) Install and run the frontend

```powershell
cd frontend
npm install
npm run dev
```

Vite will run the frontend in development mode (usually at `http://localhost:5173`). The frontend uses `src/utils/api.js` to call the backend API — update the base URL there if your backend runs on a non-default port or host.

## API (backend)
Routes are defined in `backend/routes/algorand.js` and mounted at `/api/algorand`.

- POST `/api/algorand/send`
	- Body: `{ "to": "<recipient address>", "amount": <amount>, "mnemonic": "<sender mnemonic>" }`
	- Sends an ALGO payment transaction. `amount` should be a number greater than 0 (in ALGO units as the frontend handles conversion if required).

- GET `/api/algorand/status/:txId`
	- Returns the status of the transaction with id `txId`.

- GET `/api/algorand/transactions`
	- Returns a list of recorded transactions from MongoDB.

There may be additional helper endpoints in the backend (for example a root status at `/`) — check `backend/server.js` and `backend/controllers` for more.

## Notes, troubleshooting and tips
- If the backend fails to connect to MongoDB, verify `MONGO_URI` and that the DB server is running. The server logs connection errors to the console.
- If you hit CORS issues in the browser, confirm the backend is running and that `cors` is enabled in `server.js` (it is by default).
- When using the public Algonode TestNet endpoint you typically do not need an API token. If you switch to another provider, set `ALGOD_TOKEN` and `ALGOD_SERVER` appropriately.
- Keep your mnemonic secure — do not commit it anywhere.

## Development notes
- Backend dev script: `npm run dev` (uses `nodemon server.js`) — see `backend/package.json`.
- Frontend dev script: `npm run dev` (Vite) — see `frontend/package.json`.

## License & contact
This project is provided as a sample. Adapt and reuse as you like. If you need help integrating or extending it, open an issue or contact the author.

---

If you'd like, I can also:
- add a minimal `.env.example` to `backend/`
- add quick start scripts to `package.json` at the repo root
- add basic README badges or a short GIF demo

Tell me which of these extras you'd prefer and I'll add them.
