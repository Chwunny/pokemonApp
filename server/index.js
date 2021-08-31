const express = require("express");
const cors = require("cors");
const path = require("path")

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.use("/css", express.static(path.join(__dirname, '../client/styles.css')))

app.use("/js", express.static(path.join(__dirname, '../client/main.js')))

app.use('/photos', express.static(path.join(__dirname, '../client/photos')))

const port = process.env.PORT || 4005


app.listen(port, () => console.log(`Server up and running on ${port}`));
