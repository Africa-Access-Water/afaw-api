/**
 * Common response helper functions to reduce duplication across controllers
 */

/**
 * Send a standardized success response
 * @param {Object} res - Express response object
 * @param {string} message - Success message
 * @param {Object} data - Optional data to include in response
 * @param {number} statusCode - HTTP status code (default: 200)
 */
const sendSuccess = (res, message, data = null, statusCode = 200) => {
  const response = { message };
  if (data) {
    Object.assign(response, data);
  }
  return res.status(statusCode).json(response);
};

/**
 * Send a standardized error response
 * @param {Object} res - Express response object
 * @param {string} error - Error message
 * @param {number} statusCode - HTTP status code (default: 500)
 */
const sendError = (res, error, statusCode = 500) => {
  return res.status(statusCode).json({ error });
};

/**
 * Generic error handler wrapper for async route handlers
 * @param {Function} fn - Async function to wrap
 * @param {string} errorMessage - Error message to return on failure
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn, errorMessage = "Operation failed") => {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (err) {
      console.error(`${errorMessage}:`, err);
      sendError(res, errorMessage);
    }
  };
};

module.exports = {
  sendSuccess,
  sendError,
  asyncHandler
};
