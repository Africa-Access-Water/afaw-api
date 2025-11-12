const knex = require('../config/db');

class Donor {

  static async findAll() {
    return knex('donors').orderBy('created_at', 'desc');
  }

  static async findByEmail(email) {
    // Case-insensitive email search
    return knex('donors')
      .whereRaw('LOWER(email) = ?', [email.toLowerCase()])
      .first();
  }

  static async findById(id) {
    return knex('donors').where({ id }).first();
  }

  static async findByStripeCustomerId(stripeCustomerId) {
    return knex('donors').where({ stripe_customer_id: stripeCustomerId }).first();
  }

  static async create(data) {
    // Convert email to lowercase before storing
    if (data.email) {
      data.email = data.email.toLowerCase();
    }
    
    // Use .returning('id') for Postgres; for SQLite it will just return the inserted id
    if (knex.client.config.client === 'pg') {
      const [result] = await knex('donors').insert(data).returning('id');
      return result.id;
    } else {
      return await knex('donors').insert(data);
    }
  }

  static async updateStripeCustomerId(id, stripeCustomerId) {
    await knex('donors')
      .where({ id })
      .update({ stripe_customer_id: stripeCustomerId });
  }
}

module.exports = Donor;
