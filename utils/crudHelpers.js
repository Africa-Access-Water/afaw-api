/**
 * Generic CRUD helper functions for standard database operations
 * Reduces duplication across controllers
 */

/**
 * Generic handler for fetching all records from a table
 * @param {Object} db - Knex database instance
 * @param {string} tableName - Name of the database table
 * @param {string} resourceName - Name of resource for error messages
 * @returns {Function} Express middleware function
 */
const getAllHandler = (db, tableName, resourceName) => {
  return async (req, res) => {
    try {
      const records = await db(tableName).orderBy("created_at", "desc");
      res.json(records);
    } catch (err) {
      console.error(`Error fetching ${resourceName}:`, err);
      res.status(500).json({ error: `Failed to fetch ${resourceName}` });
    }
  };
};

/**
 * Generic handler for fetching a single record by ID
 * @param {Object} db - Knex database instance
 * @param {string} tableName - Name of the database table
 * @param {string} resourceName - Name of resource for error messages (singular)
 * @returns {Function} Express middleware function
 */
const getByIdHandler = (db, tableName, resourceName) => {
  return async (req, res) => {
    try {
      const { id } = req.params;
      const record = await db(tableName).where({ id }).first();

      if (!record) {
        return res.status(404).json({ error: `${resourceName} not found` });
      }

      res.json(record);
    } catch (err) {
      console.error(`Error fetching ${resourceName}:`, err);
      res.status(500).json({ error: `Failed to fetch ${resourceName}` });
    }
  };
};

/**
 * Generic handler for deleting a record
 * @param {Object} db - Knex database instance
 * @param {string} tableName - Name of the database table
 * @param {string} resourceName - Name of resource for error messages (singular)
 * @returns {Function} Express middleware function
 */
const deleteHandler = (db, tableName, resourceName) => {
  return async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await db(tableName).where({ id }).del();

      if (!deleted) {
        return res.status(404).json({ error: `${resourceName} not found` });
      }

      res.json({ message: `${resourceName} deleted successfully` });
    } catch (err) {
      console.error(`Error deleting ${resourceName}:`, err);
      res.status(500).json({ error: `Failed to delete ${resourceName}` });
    }
  };
};

module.exports = {
  getAllHandler,
  getByIdHandler,
  deleteHandler
};
