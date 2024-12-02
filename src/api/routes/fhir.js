const express = require("express");
const router = express.Router();
const { connectToMongoDB } = require("../services/database/mongodb");
const { splitQueryParams } = require("../services/params/paramHandler");
const { executeMongoQuery } = require("../services/query/mongoQuery");
require("../services/params/resourceQueryHandler");
const {
  deconstructRegularParams,
} = require("../services/params/deconstructRegularParams");

router.get("/:resource", async (req, res) => {
  const resource = req.params.resource;
  const query = req.query;

  try {
    const db = await connectToMongoDB();
    const resourceName = resource.toLowerCase();
    const collection = db.collection(resourceName);

    console.log(query);

    const { specialParams, regularParams } = splitQueryParams(query);

    console.log("Special Parameters:", specialParams);
    console.log("Regular Parameters:", regularParams);

    const cleanUpRegularParams = deconstructRegularParams(regularParams);

    console.log("Cleaned up Parameters: ", cleanUpRegularParams);

    //const resourceQuery = addResourcePrefix(cleanUpRegularParams);

    console.log("Resource Query for MongoDB:", cleanUpRegularParams);

    const results = await executeMongoQuery(collection, cleanUpRegularParams);

    if (results.length !== 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ error: "No documents found" });
    }
  } catch (error) {
    console.error("Error in handling request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/metadata/:resource", async (req, res) => {
  const resource = req.params.resource;
  const query = req.query;

  try {
    const db = await connectToMongoDB();
    const resourceName = resource.toLowerCase();
    const collection = db.collection(resourceName);

    const metadataQuery = {};
    for (const key in query) {
      metadataQuery[`metadata.${key}`] = query[key];
    }

    const results = await collection.find(metadataQuery).toArray();

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
