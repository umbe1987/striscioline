import { Schema, type, MapSchema } from "@colyseus/schema";

class Player extends Schema {
  @type("string")
  qa = "";

  @type("boolean")
  done = false;
}

export class State extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();

  createPlayer(sessionId: string) {
    this.players.set(sessionId, new Player());
  }
  removePlayer(sessionId: string) {
    this.players.delete(sessionId);
  }

  submitStory(sessionId: string, status: any) {
    this.players.get(sessionId).qa = status.qa;
    this.players.get(sessionId).done = status.done;
    console.log(status);
  }
}
