const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

const mqtt = require("mqtt");

app.use(cors());

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

const acTopic = "/hawaiihac/ac";
const refrigetorTopic = "/hawaiihac/refrigerator";
const ceilingFanTopic = "/hawaiihac/ceilingFan";
const ovenTopic = "/hawaiihac/oven";
const tvTopic = "/hawaiihac/tv";
const washerDryerTopic = "/hawaiihac/washerDryer";
const porchLightTopic = "/hawaiihac/porchLight";
const ceilingLightTopic = "/hawaiihac/ceilingLight";

// monthly kWh
const energyConsumedPerMonth = {
  ac: 302.67,
  refrigerator: 45.5,
  ceilingFan: 2.67,
  oven: 28.08,
  tv: 17.25,
  washerDryer: 64.08,
  porchLight: 18.25,
  ceilingLight: 58.17,
};

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
    origin: "http://localhost:3000/",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

io.on("connection", (socket) => {
  console.log("Websocket client connected");
  // SEND DATA POINTS HERE --> sample ac unit message as string, able to adjust
  // object as you see fit
  // to receive messages, use socket.on
  // to send messages, use socket.emit
  // Navigate to client/src/app/page.tsx to view where the message is received

  socket.on("disconnect", () => {
    console.log("Websocket client disconnected");
  });
});

client.on("message", async (topic, payload) => {
  const data = JSON.parse(payload.toString());
  const status = data.status === "on";

  if (topic === "/hawaiihac/ac") {
    applianceStatuses.ac = status;
  } else if (topic === "/hawaiihac/refrigerator") {
    applianceStatuses.refrigerator = status;
  } else if (topic === "/hawaiihac/ceilingFan") {
    applianceStatuses.ceilingFan = status;
  } else if (topic === "/hawaiihac/oven") {
    applianceStatuses.oven = status;
  } else if (topic === "/hawaiihac/tv") {
    applianceStatuses.tv = status;
  } else if (topic === "/hawaiihac/porchLight") {
    applianceStatuses.porchLight = status;
    applianceStatuses.washerDryer = status;
  } else if (topic === "/hawaiihac/washerDryer") {
  } else {
    applianceStatuses.ceilingLight = status;
  }

  io.emit("applianceStatuses", applianceStatuses);
  console.log(data);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
