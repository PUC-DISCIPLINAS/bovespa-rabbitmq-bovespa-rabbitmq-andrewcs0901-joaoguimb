import * as Amqp from "amqp-ts";
import Stock from "../models/Stock";
import OfferBook from "../models/OfferBook";
import Offer from "../interfaces/Offer";

export default class StockExchange {
  static handleStock(routingKey: string, message: Amqp.Message) {
    const splitedRoutingKey = routingKey.split(".");

    const { quant, price, brokerName } = JSON.parse(message.getContent());
    const newStock = new Stock(
      { quant, price },
      splitedRoutingKey[1],
      brokerName
    );
    if (splitedRoutingKey[0] === "compra") OfferBook.createBuyOffer(newStock);
    else OfferBook.createSellOffer(newStock);
  }

  static transaction() {}
}
