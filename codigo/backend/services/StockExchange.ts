import * as Amqp from "amqp-ts";
import Stock from "../models/Stock";
import OfferBook from "../models/OfferBook";
import Offer from "../interfaces/Offer";
import Transaction from "../models/Transactions";

export default class StockExchange {
  static handleStock(
    routingKey: string,
    message: Amqp.Message
  ): Transaction | Stock {
    const splitedRoutingKey = routingKey.split(".");

    const { quant, price, brokerName } = JSON.parse(message.getContent());
    const newStock = new Stock(
      { quant, price },
      splitedRoutingKey[1],
      brokerName
    );
    if (splitedRoutingKey[0] === "compra")
      return OfferBook.createBuyOffer(newStock);
    else return OfferBook.createSellOffer(newStock);
  }
}
