const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

const mqtt = require("mqtt");

app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Welcome to the Kilowatt server");
});

// MQTT Connection using HiveMQ Public Broker
const protocol = "mqtt";
const host = "broker.emqx.io";
const port = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `${protocol}://${host}:${port}`;

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "emqx",
  password: "public",
  reconnectPeriod: 1000,
});

const acTopic = process.env.AC_TOPIC;
const refrigetorTopic = process.env.REF_TOPIC;
const ceilingFanTopic = process.env.CEIL_FAN_TOPIC;
const ovenTopic = process.env.OVEN_TOPIC;
const tvTopic = process.env.TV_TOPIC;
const washerDryerTopic = process.env.WASHER_DRY_TOPIC;
const porchLightTopic = process.env.PORCH_LIGHT_TOPIC;
const ceilingLightTopic = process.env.CEIL_LIGHT_TOPIC;

let applianceStatuses = {
  ac: false,
  refrigerator: false,
  ceilingFan: false,
  oven: false,
  tv: false,
  washerDryer: false,
  porchLight: false,
  ceilingLight: false,
};

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe(acTopic, () => {
    console.log(`Subscribed to topic ${acTopic}`);
  });
  client.subscribe(refrigetorTopic, () => {
    console.log(`Subscribed to topic ${refrigetorTopic}`);
  });
  client.subscribe(ceilingFanTopic, () => {
    console.log(`Subscribed to topic ${ceilingFanTopic}`);
  });
  client.subscribe(ovenTopic, () => {
    console.log(`Subscribed to topic ${ovenTopic}`);
  });
  client.subscribe(tvTopic, () => {
    console.log(`Subscribed to topic ${tvTopic}`);
  });
  client.subscribe(washerDryerTopic, () => {
    console.log(`Subscribed to topic ${washerDryerTopic}`);
  });
  client.subscribe(porchLightTopic, () => {
    console.log(`Subscribed to topic ${porchLightTopic}`);
  });
  client.subscribe(ceilingLightTopic, () => {
    console.log(`Subscribed to topic ${ceilingLightTopic}`);
  });
});

// WebsocketIO connection
const io = socketIo(server, {
  cors: {
    origin: "https://kilowatt-hacc24.vercel.app/",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

io.on("connection", (socket) => {
  console.log("Websocket client connected");

  socket.on("disconnect", () => {
    console.log("Websocket client disconnected");
    // reset appliance statuses if disconnected
    applianceStatuses.ac = false;
    applianceStatuses.ceilingFan = false;
    applianceStatuses.ceilingLight = false;
    applianceStatuses.oven = false;
    applianceStatuses.porchLight = false;
    applianceStatuses.refrigerator = false;
    applianceStatuses.tv = false;
    applianceStatuses.washerDryer = false;
  });
});

client.on("message", async (topic, payload) => {
  const data = JSON.parse(payload.toString());
  const status = data.status === "on";

  if (topic === acTopic) {
    applianceStatuses.ac = status;
  } else if (topic === refrigetorTopic) {
    applianceStatuses.refrigerator = status;
  } else if (topic === ceilingFanTopic) {
    applianceStatuses.ceilingFan = status;
  } else if (topic === ovenTopic) {
    applianceStatuses.oven = status;
  } else if (topic === tvTopic) {
    applianceStatuses.tv = status;
  } else if (topic === porchLightTopic) {
    applianceStatuses.porchLight = status;
  } else if (topic === washerDryerTopic) {
    applianceStatuses.washerDryer = status;
  } else if (topic === ceilingLightTopic) {
    applianceStatuses.ceilingLight = status;
  } else {
    console.error(`Unknown topic: ${topic}`);
  }

  io.emit("applianceStatuses", applianceStatuses);
  console.log(data);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
