import { Room, Client } from "colyseus";
import { State } from "./schema/StrisciolineRoomState";

export class StrisciolineRoom extends Room<State> {
  maxClients = 7;

  onCreate(options: any) {
    console.log("StrisciolineRoom created!", options);
    this.setState(new State());

    this.onMessage("submit", (client, data) => {
      console.log(
        "StrisciolineRoom received data from",
        client.sessionId,
        ":",
        data
      );
      this.state.submitPlayer(client.sessionId, data);
      client.send("Questions submitted. Waiting for other clients to finish.");
    });

    this.onMessage("*", (client, type, message) => {
      console.log(
        "StrisciolineRoom received message from",
        client.sessionId,
        ":",
        message
      );
    });
  }

  onJoin(client: Client, options: any) {
    client.send("join", `Hello ${client.sessionId}`);
    this.state.createPlayer(client.sessionId);
  }

  onLeave(client: Client, consented: boolean) {
    this.state.removePlayer(client.sessionId);
  }

  onDispose() {
    console.log("Dispose StrisciolineRoom");
  }
}
