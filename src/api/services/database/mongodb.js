const { connectToDatabase } = require("../../db/mongodb-connection");

async function connectToMongoDB() {
  return await connectToDatabase();
}

module.exports = { connectToMongoDB };
