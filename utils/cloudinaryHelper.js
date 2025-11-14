/**
 * Helper functions for Cloudinary operations
 * Eliminates duplication across controllers
 */

/**
 * Extract Cloudinary public_id from URL
 * @param {string} url - Cloudinary URL
 * @returns {string|null} Public ID or null if URL is invalid
 */
function extractPublicId(url) {
  if (!url) return null;
  const parts = url.split("/");
  const file = parts.pop().split(".")[0];
  const folder = parts.slice(parts.indexOf("upload") + 1).join("/");
  return folder ? `${folder}/${file}` : file;
}

module.exports = {
  extractPublicId
};
