import * as dotenv from "dotenv";
import * as Amqp from "amqp-ts";
import StockExchange from "./services/StockExchange";

import Transaction from "./models/Transactions";
import * as express from "express";
import * as cors from "cors";
dotenv.config({ path: __dirname + "/.env" });

console.log("Starting server...");

const app = express();
app.use(express.json());
app.use(cors());

const host = process.env.CLOUDAMQP_HOST;

const connection = new Amqp.Connection(host);

const exchange = connection.declareExchange("BovespaExchange", "topic", {
  durable: false,
});

const buyQueue = connection.declareQueue("buyQueue");
const sellQueue = connection.declareQueue("sellQueue");
const transactionQueue = connection.declareQueue("transactionQueue");

buyQueue.bind(exchange, "compra.*");
buyQueue.activateConsumer((message) => {
  try {
    const stockName = message.fields.routingKey;
    StockExchange.handleStock(stockName, message);
    console.log("Message received compra: " + message.getContent());
  } catch (error) {
    console.log(error.message);
  }
});

sellQueue.bind(exchange, "venda.*");
sellQueue.activateConsumer((message) => {
  const stockName = message.fields.routingKey;
  StockExchange.handleStock(stockName, message);

  console.log("Message received venda: " + message.getContent());
});

transactionQueue.bind(exchange, "transacao.*");
transactionQueue.activateConsumer((message) => {
  console.log("Message received transação: " + message.getContent());
});

app.post("/publishMessage", (req, res) => {
  console.log(req.body);
  const { brokerName, quant, price, routingKey } = req.body;
  const message = {
    brokerName,
    quant,
    price,
  };
  exchange.send(new Amqp.Message(message, { persistency: false }), routingKey);

  return res.json({ heloo: "world" });
});

app.listen(process.env.SERVER_PORT);
