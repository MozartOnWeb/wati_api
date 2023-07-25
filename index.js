const express = require("express");
const bodyParser = require("body-parser");
const amplitude = require("@amplitude/analytics-node");

//lib functions
function convertUnixTimestampToHumanReadable(timestamp) {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function convertISOStringToHumanReadable(isoString) {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const app = express();

const port = 3000;

//initialize amplitude
amplitude.init("b9b96baa680b04351fa202752572b766");

// Configure body-parser middleware to parse JSON
app.use(bodyParser.json());
app.use(express.static("public"));

// Shared data structure to store userID information
const sharedData = {};

//
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

// Handle the webhook endpoint
app.post("/sent", (req, res) => {
  if (req.method === "POST") {
    // Extract the payload from the request body
    const payload = req.body;

    // Process the webhook payload
    console.log("SENT", payload);

    // TRACK MESSAGES RECEIVED
    const WhatsApp_Messages_Received = {
      message_id: payload.whatsappMessageId,
      message_text: payload.text,
      send_time: convertISOStringToHumanReadable(payload.created),
    };

    amplitude.track(
      "WhatsApp_Messages_Received_vercel",
      WhatsApp_Messages_Received,
      {
        user_id: payload.waId,
      }
    );

    // Store the userID in the shared data structure
    sharedData[payload.whatsappMessageId] = payload.waId;

    res.status(200).json({
      success: true,
    });
  } else {
    // Respond with a 404 Not Found for non-POST requests
    res.status(404).send("Not Found");
  }
});

app.post("/read", (req, res) => {
  try {
    // Extract the payload from the request body
    const payload = req.body;

    // Process the webhook payload
    console.log("READ", payload);

    // Retrieve the userID from the shared data structure
    const userID = sharedData[payload.whatsappMessageId];

    const WhatsApp_Messages_Read = {
      message_id: payload.whatsappMessageId,
      read_time: convertUnixTimestampToHumanReadable(payload.timestamp),
    };

    console.log("read", userID);

    amplitude.track("WhatsApp_Messages_Read", WhatsApp_Messages_Read, {
      user_id: userID,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/delivered", (req, res) => {
  // Extract the payload from the request body
  const payload = req.body;

  try {
    // Process the webhook payload
    console.log("DELIVERED", payload);

    // Retrieve the userID from the shared data structure
    const userID = sharedData[payload.whatsappMessageId];

    const WhatsApp_Messages_Delivered = {
      message_id: payload.whatsappMessageId,
      delivered_time: convertUnixTimestampToHumanReadable(payload.timestamp),
    };

    console.log("delivered", userID);

    amplitude.track(
      "WhatsApp_Messages_Delivered",
      WhatsApp_Messages_Delivered,
      {
        user_id: userID,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/replied", (req, res) => {
  // Extract the payload from the request body
  const payload = req.body;

  try {
    // Process the webhook payload
    console.log("REPLIED", payload);

    // Retrieve the userID from the shared data structure
    const userID = sharedData[payload.whatsappMessageId];

    const WhatsApp_Messages_Replied = {
      message_id: payload.whatsappMessageId,
      replied_time: convertUnixTimestampToHumanReadable(payload.timestamp),
    };

    console.log("replied", userID);

    amplitude.track("WhatsApp_Messages_Replied", WhatsApp_Messages_Replied, {
      user_id: userID,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`your app is listening on port http://localhost:${port}`);
});

module.exports = app;
