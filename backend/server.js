import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import algorandRoutes from "./routes/algorand.js";
import { MONGO_URI, PORT } from "./config/index.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Algorand TestNet backend running..."));
app.use("/api/algorand", algorandRoutes);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error("❌ MongoDB connection failed:", err));
