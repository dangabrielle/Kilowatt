"use client";
import { io } from "socket.io-client";

// CHANGE TO THE BELOW ONCE IN PROD
// console.log(
//   "connecting to socket.io server at:",
//   process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_URL
// );

// export const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_URL, {
//   transports: ["websocket"],
// });

console.log("connecting to socket.io server at http://localhost:3001/");

export const socket = io("http://localhost:3001/", {
  transports: ["websocket"],
});
