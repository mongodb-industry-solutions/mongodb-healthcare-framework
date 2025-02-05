const express = require("express");
const router = express.Router();
const { loadJSONFromFile, saveJSONToFile } = require("../services/json/loader");
const path = require("path");

function createEndpoints() {
  const filePath = path.join(__dirname, "../../data/fhir_data.json");
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

router.get("/create", (req, res) => {
  createEndpoints();
  res.json({ message: "Endpoints created successfully." });
});

module.exports = router;
