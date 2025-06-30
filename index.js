require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
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
  res.json({ original_url: req.body.url, short_url: 1 });
});

app.get("/api/shorturl/:short_url", function (req, res) {
  res.redirect(req.body.url);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
