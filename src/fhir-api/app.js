const express = require("express");
const bodyParser = require("body-parser");
const dynamicRoutes = require("./routes/main");
const morgan = require("morgan");

const app = express();
const PORT = 3456;

app.use(bodyParser.json());
app.use(morgan("combined"));

app.use("/main", dynamicRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
