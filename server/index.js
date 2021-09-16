const express = require("express");
const cors = require("cors");
const path = require("path");
const Rollbar = require("rollbar");
const app = express();

let rollbar = new Rollbar({
  accessToken: "66b9f4b729b54f6a9e36d77a4aff0c62",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
  rollbar.info("html file served successfully");
});

app.use("/css", express.static(path.join(__dirname, "../client/styles.css")));

app.use("/js", express.static(path.join(__dirname, "../client/main.js")));

app.use("/photos", express.static(path.join(__dirname, "../client/photos")));

const port = process.env.PORT || 4005;

app.use(rollbar.errorHandler());

app.listen(port, () => console.log(`Server up and running on ${port}`));
