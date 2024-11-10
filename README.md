# KILOWATT ISLAND SURGE

HAWAI'I HACKATHON 2024 <br />
<em>Gabrielle Dang</em>

## Hawai'i Keiki Museum Energy Playhouse

Kilowatt Island Surge is an arduino compatible web application designed to educate Hawai'i keiki about energy conservation. In this prototype, children (ages 0-10) are immersed in a tropical island with one ultimate goal: <u>**_keep the island afloat!_**<u>

Within the playhouse, keiki can switch appliances (TV, AC, ceiling fan, electric oven, etc.) <u>**_on or off_**<u> to visualize how much energy is consumed per second for each appliance. <u>**_But here's the catch_**<u> -- if they leave the appliances on for too long (once maximum capacity is reached for the day), the island will <u>**_sink_**<u>. From there, they are prompted to turn the appliances off to conserve energy and bring their island back afloat. This encourages children to not only learn about the concept of energy and power, but to also be mindful of the impact overconsumption can have to our environment.

## Technology Stack

### Client: Next.js hosted on Vercel

For a keiki friendly user interface, free 3D models were utilized from [Sketchfab](https://sketchfab.com/feed) under License CC-BY-4.0, allowing rights to redistribute and transform these models with credit granted in the source code.

React Spring Three, React Three Drei, React Three Fiber, Tailwind CSS, CSS, Framer Motion, Typescript, Javascript, SocketIO Client, Auth0 Next.js SDK, Vercel

### Server: Node.js hosted on Heroku

To integrate with an arduino system, MQTT (Message Queuing Telemetry Transport) and HiveMQ Public Broker were used to receive signal input from an appliance and render the status to the client side in real-time using Websocket IO. As this is a proof-of-concept prototype, MQTTX is used to simulate a client (appliance) publishing to the HiveMQ Public Broker, and transmitting the message to the server.

Javascript, Node.js, Express, Websocket IO, MQTT, MQTTX, HiveMQ Public Broker, Heroku

## Installation

System Requirements:
Node.js 18.17 or later.

`git clone https://github.com/HACC2024/Kilowatt.git`

### Client (Next.js, Vercel)

- Navigate to client directory: `cd client` <br />
- Install dependencies: `npm install` or `yarn install` <br />
- Authentication: Auth0 Next.js SDK
- In `.env.example`, attain application keys after setting up Auth0. Note: `.env.local` and `.env.production` files are required when testing in development and production environments.
  ```
  AUTH0_SECRET=''
  AUTH0_BASE_URL=''
  AUTH0_ISSUER_BASE_URL=''
  AUTH0_CLIENT_ID=''
  AUTH0_CLIENT_SECRET=''
  LOGIN_REDIRECT_URL=''
  LOGOUT_REDIRECT_URL=''
  NEXT_PUBLIC_WEBSOCKET_SERVER_URL='<url of server>'
  ```
- Start development server: `npm run dev` <br />
- Start production server: `npm run start`
- Open browser to `http://localhost:3000`

### Server (Node.js, Heroku)

- Navigate to server directory `cd server` <br />
- Install dependencies: `npm install` or `yarn install` <br />
  - If needed, install nodemon: <br />
    - Globally: `npm install -g nodemon` <br />
    - Locally: `npm install nodemon --save-dev` <br />
- In `.env.example`, add respective appliance MQTT topics
  ```
  AC_TOPIC=
  REF_TOPIC=
  CEIL_FAN_TOPIC=
  OVEN_TOPIC=
  TV_TOPIC=
  WASHER_DRY_TOPIC=
  PORCH_LIGHT_TOPIC=
  CEIL_LIGHT_TOPIC=
  ```
- Start development server (with nodemon): `npm run dev` <br />
- Open browser to `http://localhost:3001`
- Hosted Node.js server on Heroku: [click here!](https://kilowatt-fe71e37c0622.herokuapp.com/)
