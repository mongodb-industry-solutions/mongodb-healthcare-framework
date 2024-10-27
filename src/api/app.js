const express = require("express");
const bodyParser = require("body-parser");
const fhirRoutes = require("./routes/fhir");
const dbRoutes = require("./routes/mongodb");
const openehrRoutes = require("./routes/openehr");
const morgan = require("morgan");

const app = express();
const PORT = 3456;

app.use(bodyParser.json());
app.use(morgan("short"));

app.use("/api/fhir/r4", fhirRoutes);
app.use("/api/openehr/v1", openehrRoutes);
app.use("/api/db", dbRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
