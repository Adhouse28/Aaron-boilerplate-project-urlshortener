require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

let urlDatabase = {};
let urlCount = 1;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", function (req, res) {
  let body_url = req.body.url;
  try {
    let url = new URL(body_url);
  } catch (_) {
    return res.json({ error: "invalid url" });
  }
  if (!body_url.includes("https://") && !body_url.includes("http://")) {
    return res.json({ error: "invalid url" });
  }

  const short = urlCount++;
  urlDatabase[short] = body_url;
  res.json({ original_url: req.body.url, short_url: short });
});

app.get("/api/shorturl/:short_url", function (req, res) {
  const short = req.params.short_url;
  const originalUrl = urlDatabase[short];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.json({ error: "No short URL found for the given input" });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

