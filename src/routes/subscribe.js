import { Router } from "express";
const r = Router();

// temp memory store (later DB)
const inbox = [];

r.post("/subscribe", (req, res) => {
  const { email, skills = "", location = "", frequency = "Daily" } = req.body || {};
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "valid_email_required" });
  }
  inbox.push({ email, skills, location, frequency, at: new Date().toISOString() });
  console.log("📩 New subscriber:", email, skills, location, frequency);
  res.json({ ok: true, message: "subscribed" });
});

export default r;
