import { Schema, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
  @type("boolean")
  done: boolean = false;
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

  submitPlayer(sessionId: string, status: any) {
    if (status.done) {
      this.players.get(sessionId).done = true;
    }
  }
}
