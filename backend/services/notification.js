const fs = require("fs");
const path = require("path");

const tipsFile = path.join(__dirname, "cyber_tips.txt");

// Read dataset
const tips = fs
  .readFileSync(tipsFile, "utf8")
  .split("\n")
  .map(t => t.trim())
  .filter(t => t.length > 0);

function printSecurityTip() {

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  console.log("\nTip:");
  console.log(randomTip);
  console.log("----------------------------------");

}

module.exports = { printSecurityTip };