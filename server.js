const express = require("express");
const app = express();
const cors = require("cors");

const payload = require("./samples.json");
const port = 3001;

app.use(
  cors({
    origin: "*",
  })
);

app.get("/items", (req, res) => {
  res.send(payload);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
