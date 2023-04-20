require("dotenv").config();
const express = require("express");
const allRoutes = require("./routes");

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());

app.use(allRoutes);

app.listen(PORT, function () {
  console.log("Express server is listening on port " + PORT);
});
