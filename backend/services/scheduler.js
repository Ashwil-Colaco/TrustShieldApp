const { Expo } = require("expo-server-sdk");
const cron = require("node-cron");
const { getRandomTip } = require("./cyber_tips");

// Create a new Expo SDK client
const expo = new Expo();

function startScheduler(getTokens) {
  // Schedule to run every day at 10:00 AM. 
  // For testing, you can change this to "*/2 * * * *" which runs every 2 minutes.
  cron.schedule("0 10 * * *", async () => {
    console.log("Running daily cybersecurity tip job...");

    const tokens = getTokens();
    if (tokens.length === 0) {
      console.log("No push tokens registered. Skipping.");
      return;
    }

    const tip = getRandomTip();
    if (!tip) {
      console.log("No tips available.");
      return;
    }

    // Create the messages
    let messages = [];
    for (let pushToken of tokens) {
      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
      messages.push({
        to: pushToken,
        sound: 'default',
        title: 'Daily Cybersecurity Tip 🛡️',
        body: tip,
        data: { tip },
      });
    }

    // The Expo push notification service accepts batches of notifications so
    // that you don't need to send 1000 requests to send 1000 notifications. We
    // recommend you batch your notifications to reduce the number of requests
    // and to compress them (notifications with similar content will get compressed).
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    
    // Send the chunks to the Expo push notification service.
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log("Sent notification chunk:", ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error("Error sending push notifications:", error);
      }
    }
  });

  console.log("Daily cybersecurity tip scheduler started.");
}

module.exports = { startScheduler };
