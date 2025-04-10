const fs = require("fs");
const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config();

async function loadFhirToMongoDB() {
  const uri = process.env.MONGO_ATLAS_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const dbname = process.env.DATABASE_NAME;
    const database = client.db(dbname);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const folderPath = path.join(__dirname, "synthea_sample_data_fhir_latest");

    console.log(folderPath);

    const files = fs.readdirSync(folderPath);
    console.log("Processing files");

    for (const file of files.slice(0, 5)) {
      const filePath = path.join(folderPath, file);
      const fileData = fs.readFileSync(filePath, "utf8");
      const fhirBundle = JSON.parse(fileData);

      const insertPromises = fhirBundle.entry.map(async (entry) => {
        const resource = entry.resource;
        const collection = database.collection(
          resource.resourceType.toLowerCase() + "s"
        );

        await collection.insertOne({
          metadata: {
            documentVersion: "1.0",
            lastUpdate: new Date().toISOString(),
            status: "active",
            protocol: {
              type: "FHIR",
              version: "4.0.0",
            },
          },
          searchParamsSingle: {
            id: resource.id,
            resourceType: resource.resourceType,
          },
          searchParamsMultiple: {
            id: resource.id,
            resourceType: resource.resourceType,
          },
          relatedDocuments: {
            parentDocumentId: "123",
          },
          customApplicationData: {
            test: "test",
          },
          advancedSearch: {
            embeddings: [1, 2, 3],
          },
          resource: resource,
        });
      });

      await Promise.all(insertPromises); //May take a minute or two to complete all promises
    }

    console.log("Loaded resources to MongoDB successfully!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  } finally {
    await client.close();
  }
}

loadFhirToMongoDB();
