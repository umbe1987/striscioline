import { Schema, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
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

  submitStory(sessionId: string, data: { qa: string, done: boolean }) {
    this.players.get(sessionId).qa = data.qa;
    this.players.get(sessionId).done = data.done;
    console.log(data);
  }
}
