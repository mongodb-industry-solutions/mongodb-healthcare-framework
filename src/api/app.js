const express = require("express");
const bodyParser = require("body-parser");
const fhirRoutes = require("./routes/fhir");
const dbRoutes = require("./routes/mongodb");
const openehrRoutes = require("./routes/openehr");
const fhirDynamicRoutes = require("./routes/fhir-dynamic");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const morgan = require("morgan");

const app = express();
const PORT = 3456;
const options = {
  explorer: true,
};

app.use(bodyParser.json());
app.use(morgan("short"));

app.use("/api/fhir/r4", fhirRoutes);
app.use("/api/openehr/v1", openehrRoutes);
app.use("/api/db", dbRoutes);
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);
app.use("/api/dynamic/fhir/r4", fhirDynamicRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
