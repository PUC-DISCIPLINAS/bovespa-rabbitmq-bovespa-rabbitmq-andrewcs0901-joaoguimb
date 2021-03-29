import * as Amqp from 'amqp-ts'
import StockExchange from './services/StockExchange'
import Stock from './models/Stock'

const host = "amqps://audadgox:B0puktOZZBbZ3xW_jJ_oxm-Z0RXovzDF@jackal.rmq.cloudamqp.com/audadgox"

const connection = new Amqp.Connection(host);

const exchange = connection.declareExchange("test2",'topic', {durable: false});

const buyQueue = connection.declareQueue("buyQueue");
const sellQueue = connection.declareQueue("sellQueue")
const transactionQueue = connection.declareQueue("transactionQueue");


buyQueue.bind(exchange, 'compra.*');
buyQueue.activateConsumer((message) => {
  const stockName = message.fields.routingKey
  StockExchange.handleStock(stockName, message)
  console.log("Message received compra: " + message.getContent());
});

sellQueue.bind(exchange, 'venda.*');
sellQueue.activateConsumer((message) => {
  const stockName = message.fields.routingKey
  StockExchange.handleStock(stockName, message)

  console.log("Message received venda: " + message.getContent());
});

transactionQueue.bind(exchange, 'transacao.*');
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

