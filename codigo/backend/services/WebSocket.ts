import Stock from "../models/Stock";
import Transaction from "../models/Transactions";

import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  console.log("Usuário conectado");
});

console.log("Starting web-socket");

httpServer.listen(process.env.WEBSOCKET_PORT || 6789);

export function sendTransaction(transaction: Transaction) {
  console.log("Send Transaction");
  io.emit(transaction.getStockName(), { ...transaction, type: "transacao" });
}

export function sendOffer(offer: Stock, type: string) {
  console.log("Send offer");
  console.log(offer.getStockName());
  const response = {
    ...offer,
    type,
  };
  io.emit(offer.getStockName(), response);
}
