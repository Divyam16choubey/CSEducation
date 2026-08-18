// Centralized Error Handling Middleware for Express
// Prevents stack traces, database internals, and filesystem paths from leaking to clients.

module.exports = function errorHandler(err, req, res, next) {
  // Server-side logging for diagnostics
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message || err);

  // Mongoose CastError (e.g. invalid ObjectId format)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid format for field: ${err.path}`,
    });
  }

  // Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(400).json({
      success: false,
      message: `A record with this ${field} already exists`,
    });
  }

  // Mongoose schema validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: messages.join(", ") || "Validation failed",
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token signature",
    });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired, please log in again",
    });
  }

  // CORS policy rejection
  if (err.message && err.message.includes("Blocked by CORS policy")) {
    return res.status(403).json({
      success: false,
      message: "Cross-Origin Request Blocked by CORS policy",
    });
  }

  // Custom status code or fallback (avoiding operator precedence bug)
  const statusCode = err.statusCode || (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);
  const message = statusCode === 500 ? "Internal server error" : (err.message || "Request failed");

  res.status(statusCode).json({
    success: false,
    message,
  });
};
