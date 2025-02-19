const express = require("express");
const { loadJSONFromFile } = require("../services/json/loader");
const { connectToMongoDB } = require("../services/database/mongodb");
const path = require("path");

const router = express.Router();

async function createEndpoints() {
  const currentDir = process.cwd();
  const filePath = path.join(currentDir, "src/data", "mongo.json");
  const fhirData = loadJSONFromFile(filePath);
  //console.log(JSON.stringify(fhirData, null, 2));

  if (!fhirData) {
    console.error("No data available to create endpoints.");
    return;
  }

  router.stack = [];

  const db = await connectToMongoDB();

  const fhirDataWithUsername = {
    ...fhirData,
    username: "test",
    date: new Date(),
  };

  const configCollection = db.collection("api_config");
  await configCollection.insertOne(fhirDataWithUsername);
  console.log("Inserting config file into MongoDB");

  Object.keys(fhirData).forEach((resourceType) => {
    console.log(resourceType);
    const collection = db.collection(resourceType);
    console.log(`Creating routes for ${resourceType}`);

    router.get(`/${resourceType}`, async (req, res) => {
      const data = await collection.find().toArray();
      res.json(data);
    });

    router.get(`/${resourceType}/:id`, async (req, res) => {
      const item = await collection.findOne({ _id: req.params.id });
      item
        ? res.json(item)
        : res
            .status(404)
            .send(
              `Resource of type ${resourceType} with ID ${req.params.id} not found`
            );
    });

    router.post(`/${resourceType}`, async (req, res) => {
      const result = await collection.insertOne(req.body);
      res.status(201).json(result.ops[0]);
    });

    router.delete(`/${resourceType}/:id`, async (req, res) => {
      await collection.deleteOne({ _id: req.params.id });
      res.json({ message: "Deleted successfully" });
    });
  });

  console.log("Dynamic endpoints created successfully.");
}

router.get("/create", async (req, res) => {
  await createEndpoints();
  res.json({ message: "Endpoints created successfully." });
});

module.exports = router;
