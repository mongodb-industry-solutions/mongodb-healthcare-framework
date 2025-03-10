const express = require("express");
const runPythonScript = require("../../services/python/runner");

const router = express.Router();

router.get("/run-script", async (req, res) => {
  try {
    const { filename } = req.query;

    if (!filename) {
      return res.status(400).json({ error: "Missing filename parameter" });
    }

    const output = await runPythonScript(filename);
    res.json({ result: output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
