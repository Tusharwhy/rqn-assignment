const express = require("express");
const app = express();
const cors = require("cors");

// initializing routes
const AuthRoute = require("./routes/AuthRoutes");

app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Server is live");
});

app.use("/api", AuthRoute);

module.exports = app;
