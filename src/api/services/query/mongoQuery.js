async function executeMongoQuery(collection, regularParams) {
  try {
    const results = await collection.find(regularParams).toArray();
    return results;
  } catch (error) {
    throw new Error("Error executing MongoDB query: " + error.message);
  }
}

module.exports = { executeMongoQuery };
