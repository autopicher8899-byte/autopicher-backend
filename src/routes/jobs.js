import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const r = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(__dirname, "../../sample-data/jobs.json");

const readJobs = () => {
  try { return JSON.parse(fs.readFileSync(dataPath, "utf8")); }
  catch { return []; }
};

r.get("/jobs", (req, res) => {
  const q = (req.query.q || "").toString().toLowerCase();
  const jobs = readJobs().filter(j =>
    !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q)
  );
  res.json({ items: jobs, total: jobs.length, page: 1 });
});

r.get("/job/:id", (req, res) => {
  const job = readJobs().find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ error: "not_found" });
  res.json(job);
});

export default r;
