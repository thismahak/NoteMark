// server.js
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown for uncaught errors
process.on("unhandledRejection", (err) => {
  console.error("💥 Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});
