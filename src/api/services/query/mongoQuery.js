/**
 * Executes a MongoDB find query on the specified collection with the provided parameters.
 *
 * @param {Collection<Document>} collection - The MongoDB Collection object to perform the query on.
 * @param {Filter<Document>} regularParams - Query filter used in the find operation.
 * @returns {Promise<Array<Document>>} A Promise that resolves to an array of documents returned by the find operation.
 * @throws {Error} If there is any error executing the MongoDB query, it will throw a new Error with a message that includes the original error's message.
 */
async function executeMongoQuery(collection, regularParams) {
  try {
    const results = await collection.find(regularParams).toArray();
    return results;
  } catch (error) {
    throw new Error("Error executing MongoDB query: " + error.message);
  }
}

module.exports = { executeMongoQuery };
