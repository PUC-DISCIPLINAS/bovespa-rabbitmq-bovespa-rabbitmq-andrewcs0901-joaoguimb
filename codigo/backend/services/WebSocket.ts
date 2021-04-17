import Stock from "../models/Stock";
import Transaction from "../models/Transactions";

import * as socketIo from "socket.io";
import * as http from "http";
import { Server, Socket } from "socket.io";

const httpServer = http.createServer();
const io = new Server(httpServer, {
  path: "/test",
});

httpServer.listen(5566);

export function sendTransaction(transaction: Transaction) {
  io.on("connection", (socket: Socket) => {
    console.log("Connection");

    socket.emit(transaction.getStockName(), transaction);
  });
}

export function sendOffer(offer: Stock) {
  console.log("executou");

  io.emit(offer.getStockName(), offer);
}
