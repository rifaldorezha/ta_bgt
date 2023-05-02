require("dotenv").config();
const express = require("express");
const cors = require("cors");
const allRoutes = require("./routes");

const app = express();
const PORT = 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use("/public/", express.static("public"));

app.use(allRoutes);

app.listen(PORT, function () {
  console.log("Express server is listening on port " + PORT);
});
