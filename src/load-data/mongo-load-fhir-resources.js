const fs = require("fs");
const { MongoClient } = require("mongodb");
const path = require("path");
const config = require("../config");

async function loadFhirToMongoDB() {
  const uri = config.mongoDBConnectionString;
  const client = new MongoClient(uri);

  try {
    // Connect the client to the server
    await client.connect();
    const database = client.db("fhir-server");
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const folderPath = path.join(
      __dirname,
      "../tests",
      "synthea_sample_data_fhir_latest"
    );
    const files = fs.readdirSync(folderPath);
    console.log("processing files");

    files.slice(0, 5).forEach((file) => {
      const filePath = path.join(folderPath, file);
      const fileData = fs.readFileSync(filePath, "utf8");
      const fhirBundle = JSON.parse(fileData);

      fhirBundle.entry.forEach(async (entry) => {
        const resource = entry.resource;
        const collection = database.collection(
          resource.resourceType.toLowerCase() + "s"
        );

        await collection.insertOne({
          metadata: {
            documentVersion: "1.0",
            fhirVersion: "4.0.0",
            lastUpdate: new Date().toISOString(),
            tenant_id: "Tenant",
            id: resource.id,
            resourceType: resource.resourceType,
          },
          resource: resource,
          // Add more properties as needed
        });
      });
    });

    console.log("loaded resources to MongoDB successfully!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

loadFhirToMongoDB();
