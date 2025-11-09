export function requireApiKey(req, res, next) {
  const key = req.headers["x-api-key"];
  if (!key || key !== process.env.API_KEY_ADMIN) {
    return res.status(401).json({ error: "unauthorized" });
  }
  next();
}
