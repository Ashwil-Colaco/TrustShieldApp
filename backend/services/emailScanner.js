const express = require("express");
const axios = require("axios");

const router = express.Router();

const suspiciousWords = [
  "verify",
  "password",
  "bank",
  "urgent",
  "login",
  "click here",
  "suspend",
  "confirm"
];

const shorteners = [
  "bit.ly",
  "tinyurl",
  "t.co",
  "goo.gl",
  "ow.ly"
];

const trustedBrands = [
  "paypal",
  "amazon",
  "google",
  "facebook",
  "apple",
  "microsoft"
];

router.get("/scan", async (req, res) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  try {

    const listRes = await axios.get(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=2",
      { headers: { Authorization: authHeader } }
    );

    if (!listRes.data.messages) {
      return res.json([]);
    }

    const scanResults = await Promise.all(
      listRes.data.messages.map(async (msg) => {

        const detailRes = await axios.get(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`,
          { headers: { Authorization: authHeader } }
        );

        const headers = detailRes.data.payload.headers;

        const subject =
          headers.find(h => h.name === "Subject")?.value || "No Subject";

        const from =
          headers.find(h => h.name === "From")?.value || "Unknown";

        const authResults =
          headers.find(h => h.name === "Authentication-Results")?.value ||
          headers.find(h => h.name === "ARC-Authentication-Results")?.value ||
          "";

        const emailMatch = from.match(/<(.+?)>/);
        const senderEmail = emailMatch ? emailMatch[1] : from;
        const domain = senderEmail.split("@")[1] || "";

        let body = "";

        if (detailRes.data.payload.parts) {
          const part = detailRes.data.payload.parts.find(p => p.mimeType === "text/html");
          if (part?.body?.data) {
            body = Buffer.from(part.body.data, "base64").toString("utf8");
          }
        }

        const authFail =
          authResults.includes("spf=fail") ||
          authResults.includes("dmarc=fail") ||
          authResults.includes("spf=softfail");

        const keywordRisk = suspiciousWords.some(word =>
          subject.toLowerCase().includes(word)
        );

        const shortenedLink = shorteners.some(link =>
          body.includes(link)
        );

        const fakeLoginUrl =
          body.includes("login") ||
          body.includes("verify") ||
          body.includes("secure");

        let displaySpoof = false;

        trustedBrands.forEach(brand => {

          if (
            from.toLowerCase().includes(brand) &&
            !domain.includes(brand)
          ) {
            displaySpoof = true;
          }

        });

        let status = "Safe";

        if (
          authFail ||
          keywordRisk ||
          shortenedLink ||
          fakeLoginUrl ||
          displaySpoof
        ) {
          status = "High Risk";
        }

        return {
          id: msg.id,
          from,
          email: senderEmail,
          domain,
          subject,
          status,
          checks: {
            authFail,
            keywordRisk,
            shortenedLink,
            fakeLoginUrl,
            displaySpoof
          }
        };

      })
    );

    res.send(JSON.stringify({
      scannedEmails: scanResults.length,
      timestamp: new Date(),
      results: scanResults
    }, null, 2));

  } catch (error) {

    console.error(error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to scan emails"
    });

  }

});

module.exports = router;