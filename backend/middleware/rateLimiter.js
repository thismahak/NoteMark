const rateLimit = require('express-rate-limit');

// ⏱️ Limit repeated requests to auth endpoints (e.g., login)
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts from this IP, please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
});

// 🌐 Global limiter (optional)
const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
  message: 'Too many requests, please slow down.',
});

module.exports = {
  authRateLimiter,
  globalLimiter,
};
