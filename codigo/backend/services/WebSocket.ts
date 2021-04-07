import Stock from "../models/Stock";
import Transaction from "../models/Transactions";

import { createServer, Server } from "http";
import * as socketIo from "socket.io";

class App {
  public server: Server;
  private io: SocketIO.Server;
  public PORT: number = 8100;

  constructor() {
    this.sockets();
    this.listen();
  }

  private sockets(): void {
    this.server = createServer(this.app);
    this.io = socketIo(this.server);
  }

  private listen(): void {
    this.io.on("connection", (socket: any) => {
      console.log("a user connected");

      socket.on("chat message", function (msg) {
        console.log("message: " + msg);
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }
}

export default new App();
