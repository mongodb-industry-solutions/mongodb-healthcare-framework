const express = require("express");
const router = express.Router();
const {
  connectToDatabaseByParameter,
} = require("../services/db/mongodb-connection-parameter");

/**
 * POST /api/mongodb/connect
 * Connects to the MongoDB database using the provided connection string and database name.
 */
router.post("/mongodb/connect", async (req, res) => {
  const { uri, dbName } = req.body;

  if (!uri || !dbName) {
    return res
      .status(400)
      .json({ error: "Connection string and database name are required." });
  }

  try {
    const db = await connectToDatabaseByParameter(uri, dbName);
    res
      .status(200)
      .json({ message: "Successfully connected to MongoDB", database: dbName });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error connecting to MongoDB", details: error.message });
  }
});

module.exports = router;
