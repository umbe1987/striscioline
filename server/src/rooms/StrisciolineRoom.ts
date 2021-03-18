import { Room, Client } from "colyseus";
import { State } from "./schema/StrisciolineRoomState";

export class StrisciolineRoom extends Room<State> {
  maxClients = 7;

  onCreate(options: any) {
    console.log("StrisciolineRoom created!", options);
    this.setState(new State());

    this.onMessage("submit", (client, data) => {
      console.log("StrisciolineRoom received data from", client.sessionId);
      this.state.submitStory(client.sessionId, data);
      const hasEveryoneFinished = [ ...this.state.players.values()].map(x => x.done);
      if (hasEveryoneFinished.every(x => x)) {
        console.log('game finished!');
      }
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
    const joinMessage = `${client.sessionId} joined the room!`;
    console.log(joinMessage);
    client.send("join", joinMessage);
    this.state.createPlayer(client.sessionId);
  }

  onLeave(client: Client, consented: boolean) {
    this.state.removePlayer(client.sessionId);
  }

  onDispose() {
    console.log("Dispose StrisciolineRoom");
  }
}
