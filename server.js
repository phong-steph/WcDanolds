const express = require("express");
const app = express();

const port = 3001;

const payload = require("./samples.json");

app.get("/", (req, res) => {
  res.send(payload);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
