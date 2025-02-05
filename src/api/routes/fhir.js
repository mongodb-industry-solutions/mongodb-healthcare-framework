const express = require("express");
const router = express.Router();
const { connectToMongoDB } = require("../services/database/mongodb");
const { splitQueryParams } = require("../services/params/paramHandler");
const { executeMongoQuery } = require("../services/query/mongoQuery");
require("../services/params/resourceQueryHandler");
const {
  deconstructRegularParams,
} = require("../services/params/deconstructRegularParams");
const { loadJSONFromFile, saveJSONToFile } = require("../services/json/loader");

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

function createEndpoints() {
  const filePath = "../../data/fhir_data.json"; // Path to the JSON file
  const fhirData = loadJSONFromFile(filePath);

  if (!fhirData) {
    console.error("No data available to create endpoints.");
    return;
  }

  router.stack = [];

  Object.keys(fhirData).forEach((resourceType) => {
    router.get(`/${resourceType}`, (req, res) => {
      res.json(fhirData[resourceType]);
    });

    router.get(`/${resourceType}/:id`, (req, res) => {
      const item = fhirData[resourceType].find(
        (resource) => resource.id === req.params.id
      );
      if (item) {
        res.json(item);
      } else {
        res
          .status(404)
          .send(
            `Resource of type ${resourceType} with ID ${req.params.id} not found`
          );
      }
    });
  });

  console.log("Dynamic endpoints created successfully.");
}

router.get("/createEndpoints", (req, res) => {
  createEndpoints();
  res.json({ message: "Endpoints created successfully." });
});

module.exports = router;
