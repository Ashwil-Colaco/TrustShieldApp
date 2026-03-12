const express = require("express");
const cors = require("cors");

const emailScanner = require("./services/emailScanner");
const { printSecurityTip } = require("./services/notification");

const app = express();

app.use(cors());
app.use(express.json());

// Email scanner route
app.use("/api", emailScanner);

// Print awareness tips automatically
setInterval(() => {

  printSecurityTip();

}, 10000); // every 30 seconds

app.listen(3000, () => {
  console.log(" Phishing Scanner running on port 3000");
});