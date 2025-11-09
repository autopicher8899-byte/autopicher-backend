import { Router } from "express";
const r = Router();

r.post("/track-click", (req, res) => {
  const { jobId, utm_source = "site" } = req.body || {};
  console.log("🔗 click", { jobId, utm_source, at: new Date().toISOString() });
  res.json({ ok: true });
});

export default r;
