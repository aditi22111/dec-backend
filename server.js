const fs = require('fs');
const path = require('path');
const express = require("express");
const app = express();
const cors = require('cors');
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.get("/", (req, res) => {
  res.send("default");
});

app.get("/data", (req, res) => {
  const filePath = path.join(__dirname, "db.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Failed to read data" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
