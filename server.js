const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Route to serve the dashboard frontend
app.use(express.static(path.join(__dirname, "build")));

// Route to fetch data for the dashboard
app.get("/data", (req, res) => {
  // Assuming your data is stored in db.json file
  const filePath = path.join(__dirname, "db.json");
  
  // Read data from db.json file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Failed to read data" });
    } else {
      // Parse JSON data
      const jsonData = JSON.parse(data);
      
      // Modify the data structure if needed
      
      // Send the data as response
      res.json(jsonData);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
