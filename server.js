const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

const payload = require("./samples.json");
const port = 3001;

app.use(
  cors({
    origin: "*",
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("/", function (_req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.get("/items", (req, res) => {
  try {
    const { limit } = req.query;
    const items = [];

    for (let i = 0; i < limit; i++) {
      items.push(payload.items[i]);
    }
    setTimeout(() => {
      res.status(200).send({
        items,
        totalCount: payload.totalCount,
      });
    }, 2000);
  } catch (error) {
    res.status(500).send("Internal error");
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
