const express = require("express");
const router = express.Router();
const { connectToMongoDB } = require("../services/database/mongodb");
const { createEHRDocument } = require("../services/openehr/ehr");
const { createComposition } = require("../services/openehr/composition");

router.put("/ehr/:ehrId", async (req, res) => {
  const ehrId = req.params.ehrId;

  try {
    const db = await connectToMongoDB();
    const collection = db.collection("openEHR");
    const document = createEHRDocument(ehrId);

    const result = await collection.updateOne(
      { "ehr_id.value": ehrId },
      { $set: document },
      { upsert: true }
    );

    return res.status(200).json({
      message: "EHR data stored successfully",
    });
  } catch (error) {
    console.error("Error storing EHR data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/ehr/:ehrId", async (req, res) => {
  const ehrId = req.params.ehrId;

  try {
    const db = await connectToMongoDB();
    const collection = db.collection("openEHR");

    const document = await collection.findOne({ "ehr_id.value": ehrId });

    if (document) {
      return res.status(200).json(document);
    } else {
      return res.status(404).json({ error: "EHR document not found" });
    }
  } catch (error) {
    console.error("Error retrieving EHR data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/ehr/:ehrId/composition", async (req, res) => {
  const ehrId = req.params.ehrId;
  const compositionData = req.body;

  try {
    const db = await connectToMongoDB();
    const collection = db.collection("compositions");

    const compositionDocument = createComposition(compositionData);

    await collection.insertOne({
      ehr_id: ehrId,
      ...compositionDocument,
    });

    return res.status(201).json(compositionDocument);
  } catch (error) {
    console.error("Error storing composition:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/ehr/:ehrId/composition/:compositionId", async (req, res) => {
  const { ehrId, compositionId } = req.params;

  try {
    const db = await connectToMongoDB();
    const collection = db.collection("compositions");

    const compositionDocument = await collection.findOne({
      ehr_id: ehrId,
      "uid.value": compositionId,
    });

    if (!compositionDocument) {
      return res.status(404).json({ error: "Composition not found" });
    }

    return res.status(200).json(compositionDocument);
  } catch (error) {
    console.error("Error retrieving composition:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
