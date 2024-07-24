const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../../db/mongodb-connection");

function connectToMongoDB() {
  return connectToDatabase();
}

router.get("/api/:resource", async (req, res) => {
  const resource = req.params.resource;

  try {
    const db = await connectToMongoDB();
    const resourceName = resource.toLowerCase();
    const collection = db.collection(resourceName);
    const results = await collection.find().toArray();

    if (results.length !== 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ error: "Resource not found" });
    }
  } catch (error) {
    console.error("Error in handling request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
