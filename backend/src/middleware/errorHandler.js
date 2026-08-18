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

  // Custom status code or default to 500
  const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode;
  const message = statusCode === 500 ? "Internal server error" : (err.message || "Request failed");

  res.status(statusCode).json({
    success: false,
    message,
  });
};
