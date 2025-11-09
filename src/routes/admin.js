import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { requireApiKey } from "../middleware/auth.js";

const r = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(__dirname, "../../sample-data/jobs.json");

r.post("/import-jobs", requireApiKey, (req, res) => {
  const list = Array.isArray(req.body) ? req.body : [];
  if (!list.length) return res.json({ imported: 0 });

  const existing = fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath, "utf8")) : [];
  const byId = new Map(existing.map(j => [j.id, j]));
  for (const j of list) byId.set(j.id, j);

  const merged = Array.from(byId.values());
  fs.writeFileSync(dataPath, JSON.stringify(merged, null, 2));
  res.json({ imported: list.length, total: merged.length });
});

export default r;
