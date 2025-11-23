const knex = require("../config/db");

const UserModel = {
  async create(userData) {
    // Convert email to lowercase before storing
    if (userData.email) {
      userData.email = userData.email.toLowerCase();
    }
    return await knex("users").insert(userData).returning("*");
  },

  async findByEmail(email) {
    // Case-insensitive email search
    return await knex("users")
      .whereRaw('LOWER(email) = ?', [email.toLowerCase()])
      .first();
  },

  async findById(id) {
    return await knex("users").where({ id }).first();
  },

  async findPendingUsers() {
    return await knex("users").where({ status: "pending" }).select("*");
  },

  async updateUserStatus(id, status) {
    return await knex("users")
      .where({ id })
      .update({ status })
      .returning("*");
  },

  async update(id, updateData) {
    // Convert email to lowercase if being updated
    if (updateData.email) {
      updateData.email = updateData.email.toLowerCase();
    }
    return await knex("users")
      .where({ id })
      .update(updateData)
      .returning("*");
  },

  async setResetToken(email, resetToken, expiryTime) {
    // Case-insensitive email lookup
    return await knex("users")
      .whereRaw('LOWER(email) = ?', [email.toLowerCase()])
      .update({
        reset_token: resetToken,
        reset_token_expires: expiryTime
      })
      .returning("*");
  },

  async findByResetToken(resetToken) {
    return await knex("users")
      .where({ reset_token: resetToken })
      .where('reset_token_expires', '>', new Date())
      .first();
  },

  async clearResetToken(userId) {
    return await knex("users")
      .where({ id: userId })
      .update({
        reset_token: null,
        reset_token_expires: null
      });
  }
};

module.exports = UserModel;
