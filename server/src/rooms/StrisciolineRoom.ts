import { Room, Client } from "colyseus";
import { State, Player } from "./schema/StrisciolineRoomState";
import { MapSchema } from "@colyseus/schema";

export class StrisciolineRoom extends Room<State> {
  maxClients = 7;

  onCreate(options: any) {
    console.log("StrisciolineRoom created!", options);
    this.setState(new State());

    this.onMessage("submit", (client, data) => {
      console.log("StrisciolineRoom received data from", client.sessionId);
      this.state.submitStory(client.sessionId, {
        qa: this.arr2DtoStr(data.qa),
        done: data.done,
      });
      const hasEveryoneFinished = [...this.state.players.values()].map(
        (x) => x.done
      );
      if (hasEveryoneFinished.every((x) => x)) {
        console.log("game finished!");
        const players = [...this.state.players.keys()];
        console.log(players);
        const reorderedPlayers = this.reorder(
          this.state.players,
          this.rotate(players, players.indexOf(client.sessionId))
        );
        console.log(...reorderedPlayers.keys());
        const finalStory = [...reorderedPlayers.values()].map((x) => x.qa);
        console.log(finalStory);
        const finalStory2DArr = finalStory.map((story) => this.formatQA(story));
        console.log(finalStory2DArr);
        const mixedStories = this.mixStories(finalStory2DArr);
        this.broadcast("all-players-done");
        this.onMessage("ready-to-read", (client) => {
          client.send("final-story", mixedStories.pop());
        });
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

  private arr2DtoStr(arr: any): any {
    // https://stackoverflow.com/a/59612775/1979665
    // https://stackoverflow.com/a/10865042/1979665
    const flattened = ([] as string[]).concat.apply([], [arr]);

    return flattened.join(",");
  }

  private formatQA(qaStr: string): string[][] {
    // convert string to array by commas (https://stackoverflow.com/a/2858130/1979665)
    // convert flat array to pair QA (https://stackoverflow.com/a/44996257/1979665)
    return qaStr.split(",").reduce((result, _, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []);
  }

  private reorder(map: MapSchema<Player>, keys: string[]): Map<string, Player> {
    return new Map(keys.map((k: any) => [k, map.get(k)]));
  }

  private rotate(ary: any, n: number) {
    return ary.slice(n).concat(ary.slice(0, n));
  }

  private mixStories(stories: string[][][]): string[][] {
    let newStory: string[][] = [];
    const numPlayers = stories.length;
    const numQA = stories[0].length;
    // https://stackoverflow.com/a/29715609/1979665
    let step = 1;
    let idx: number = 0;
    if (numPlayers !== 1) {
      [...Array(numQA).keys()].forEach((_, i) => {
        console.log(idx);
        if (idx >= numPlayers - 1) {
          step = -1;
        }
        if (idx <= 0) {
          step = +1;
        }
        newStory.push(stories[idx][i]);
        idx += step;
      });
    } else {
      newStory = stories[0];
    }

    return newStory;
  }
}
