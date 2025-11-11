import dotenv from "dotenv";
dotenv.config();

export const ALGOD_SERVER = process.env.ALGOD_SERVER || "https://testnet-api.algonode.cloud";
export const ALGOD_PORT = process.env.ALGOD_PORT || "";
export const ALGOD_TOKEN = process.env.ALGOD_TOKEN || "";

export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/algorand-test";
export const PORT = process.env.PORT || 4000;
