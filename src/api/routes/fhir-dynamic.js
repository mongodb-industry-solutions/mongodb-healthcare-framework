const express = require("express");
const { loadJSONFromFile } = require("../services/json/loader");
const { connectToMongoDB } = require("../services/database/mongodb");
const path = require("path");

const router = express.Router();

async function connectDB() {
  try {
    return await connectToMongoDB();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function saveAPIConfig(configFile, db) {
  if (!configFile) {
    console.error("No data available to save API config.");
    return;
  }

  const configWithMetadata = {
    ...configFile,
    username: "test",
    date: new Date(),
  };

  try {
    const configCollection = db.collection("api_config");
    await configCollection.insertOne(configWithMetadata);
    console.log("API config saved to MongoDB.");
  } catch (error) {
    console.error("Error saving API config:", error);
  }
}

async function createEndpoints() {
  try {
    const currentDir = process.cwd();
    const filePath = path.join(currentDir, "src/data", "user-config.json");
    const configFile = loadJSONFromFile(filePath);
    console.log("Loaded Config:", JSON.stringify(configFile, null, 2));

    if (!configFile) {
      console.error("No configuration found.");
      return;
    }

    router.stack = [];
    const db = await connectDB();

    await saveAPIConfig(configFile, db);

    Object.keys(configFile).forEach((resourceType) => {
      const resourceConfig = configFile[resourceType];
      if (resourceConfig.fhirOperations?.read) {
        console.log(`Creating GET routes for ${resourceType}`);
        const collection = db.collection(resourceType);

        router.get(`/${resourceType}`, async (req, res) => {
          const data = await collection.find().toArray();
          res.json(data);
        });
      }
    });

    console.log("Dynamic endpoints created successfully.");
  } catch (error) {
    console.error("Error creating endpoints:", error);
  }
}

router.get("/create", async (req, res) => {
  await createEndpoints();
  res.json({ message: "Endpoints created successfully." });
});

module.exports = router;
