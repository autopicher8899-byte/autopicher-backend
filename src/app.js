import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({ origin: ["http://localhost:5173"], methods: ["GET","POST"] }));
app.use(express.json());

// health
app.get("/api/health", (_req, res) => res.json({ ok: true, service: "autopicher-api" }));

// routes
import subscribe from "./routes/subscribe.js";
import jobs from "./routes/jobs.js";
import trackClick from "./routes/trackClick.js";
import admin from "./routes/admin.js";

app.use("/api", subscribe);
app.use("/api", jobs);
app.use("/api", trackClick);
app.use("/api/admin", admin);

export default app;
