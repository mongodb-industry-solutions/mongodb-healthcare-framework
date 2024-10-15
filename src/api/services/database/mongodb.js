const { connectToDatabase } = require("../../db/mongodb-connection");

/**
 * Establishes a connection to the MongoDB database using the provided configuration.
 *
 * @returns {Promise<Db>} A Promise that resolves to a Db object, which represents the connected database.
 */
async function connectToMongoDB() {
  return await connectToDatabase();
}

module.exports = { connectToMongoDB };
