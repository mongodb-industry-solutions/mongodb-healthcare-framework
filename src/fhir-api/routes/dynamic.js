const express = require("express");
const router = express.Router();

router.get("/api/:resource", (req, res) => {
  const resource = req.params.resource;

  console.log("Host URL: ", req.originalUrl);
  console.log("Origin: ", req.headers.host);
  console.log(req.params);
  console.log(req.params.resource);
  console.log(req.query);

  if (resource === "Patients") {
    return res
      .status(200)
      .json({ message: "You requested the data of Patients." });
  } else if (resource === "Observations") {
    return res
      .status(200)
      .json({ message: "You requested the data of Observations." });
  } else {
    return res.status(404).json({ error: "Resource not found" });
  }
});

module.exports = router;
