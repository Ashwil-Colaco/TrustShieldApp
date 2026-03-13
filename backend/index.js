const express = require("express");
const cors = require("cors");

const emailScanner = require("./services/emailScanner");
const { startScheduler } = require("./services/scheduler");

const app = express();

app.use(cors());
app.use(express.json());

// In-memory array to store Expo Push Tokens
let expoPushTokens = [];

// Email scanner route
app.use("/api", emailScanner);

// Endpoint to register push tokens from the Expo mobile app
app.post("/api/register-push-token", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  // Store the token if it's not already in the array
  if (!expoPushTokens.includes(token)) {
    expoPushTokens.push(token);
    console.log(`Registered new push token: ${token}`);
  }

  res.status(200).json({ message: "Token registered successfully" });
});

// Start the daily notification scheduler, providing it a way to fetch the latest tokens
startScheduler(() => expoPushTokens);

app.listen(3000, () => {
  console.log(" Server running on port 3000");
});