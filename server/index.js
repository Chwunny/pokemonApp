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

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get("/api/fortune", (req, res) => {
  const fortunes = [
    "A friend is a present you give yourself.",
    "A person of words and not deeds is like a garden full of weeds.",
    "Adventure can be real happiness.",
    "Any decision you have to make tomorrow is a good decision.",
    "Change is happening in your life, so go with the flow!",
    "Don’t just spend time. Invest it.",
    "Each day, compel yourself to do something you would rather not do.",
    "Emulate what you respect in your friends.",
    "Go take a rest; you deserve it."
  ]

  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndex];

  res.status(200).send(randomFortune);

})


app.listen(port, () => console.log(`Server up and running on ${port}`));
