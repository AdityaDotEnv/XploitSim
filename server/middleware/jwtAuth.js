// server/middleware/jwtAuth.js
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_this';

function optionalAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return next();
  const parts = auth.split(' ');
  if (parts.length !== 2) return next();
  const token = parts[1];
  try {
    req.user = jwt.verify(token, SECRET);
  } catch (err) {
    req.authError = err.message;
  }
  next();
}

function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing token' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(400).json({ error: 'Malformed Authorization header' });
  const token = parts[1];
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { optionalAuth, requireAuth };
