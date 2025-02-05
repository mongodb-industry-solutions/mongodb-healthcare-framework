const fs = require("fs");

function loadJSONFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    return null;
  }
}

function saveJSONToFile(filePath, jsonData) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
    console.log("JSON file updated successfully");
  } catch (error) {
    console.error("Error saving JSON file:", error);
  }
}

module.exports = { loadJSONFromFile, saveJSONToFile };
