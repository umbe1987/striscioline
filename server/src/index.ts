import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";
// import socialRoutes from "@colyseus/social/express"
import path from 'path';

import { StrisciolineRoom } from "./rooms/StrisciolineRoom";

const port = Number(process.env.PORT || 2568);
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const gameServer = new Server({
  server,
});

// register your room handlers
gameServer.define("striscioline", StrisciolineRoom);

console.log(path.join(__dirname, "../../client/dist"));
app.use('/', express.static(path.join(__dirname, "../../client/dist/client")));
/**
 * Register @colyseus/social routes
 *
 * - uncomment if you want to use default authentication (https://docs.colyseus.io/server/authentication/)
 * - also uncomment the import statement
 */
// app.use("/", socialRoutes);

// register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", monitor());

gameServer.listen(port);
console.log(`Listening on http://localhost:${port}`);
