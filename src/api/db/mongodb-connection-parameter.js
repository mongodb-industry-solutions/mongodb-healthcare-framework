const { MongoClient } = require("mongodb");

let db = null;

/**
 * Connects to the MongoDB database using the provided connection string and database name.
 *
 * @param {string} uri - The connection string (URI) for MongoDB.
 * @param {string} dbName - The name of the database to connect to.
 * @returns {db} - Returns a promise that resolves to the connected MongoDB database instance.
 * @throws Will throw an error if the connection fails.
 */
async function connectToDatabaseByParameter(uri, dbName) {
  if (db) {
    return db;
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Connected successfully to MongoDB");
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = { connectToDatabaseByParameter };
