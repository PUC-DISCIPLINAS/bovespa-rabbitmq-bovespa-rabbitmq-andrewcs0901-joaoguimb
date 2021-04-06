import * as dotenv from "dotenv";
import * as Amqp from "amqp-ts";
import StockExchange from "./services/StockExchange";
import Stock from "./models/Stock";

console.log("Starting server...");
dotenv.config({ path: __dirname + "/.env" });

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

var msg = new Amqp.Message("t");
exchange.send(msg);

connection.completeConfiguration().then(() => {
  // the following message will be received because
  // everything you defined earlier for this connection now exists
  var msg2 = new Amqp.Message("Test2");
  exchange.send(msg2);
});
