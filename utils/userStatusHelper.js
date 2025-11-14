/**
 * Helper functions for user status management
 * Eliminates duplication between approveUser and rejectUser functions
 */

const UserModel = require("../models/userModel");

/**
 * Update user status with validation
 * @param {string} userId - User ID to update
 * @param {string} newStatus - New status (accepted, rejected, etc.)
 * @param {string} actionName - Name of the action for error messages (e.g., "approve", "reject")
 * @returns {Object} Updated user object
 */
const updateUserStatus = async (userId, newStatus, actionName = "update") => {
  // Check if user exists and is pending
  const user = await UserModel.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  
  if (user.status !== "pending") {
    const error = new Error("User is not in pending status");
    error.statusCode = 400;
    throw error;
  }

  // Update user status
  const [updatedUser] = await UserModel.updateUserStatus(userId, newStatus);
  
  return {
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
    status: updatedUser.status
  };
};

module.exports = {
  updateUserStatus
};
