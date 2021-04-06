import { off } from "process";
import Offer from "../interfaces/Offer";
import Stock from "./Stock";

class OfferBook {
  static buyOffers: Object = {};
  static sellOffers: Object = {};

  static createBuyOffer(offer: Stock) {
    const sellOffer = this.checkTransaction(offer, "compra");
    if (sellOffer && sellOffer.length) {
      const remainingOffer = this.transaction(
        this.sellOffers,
        offer,
        sellOffer
      );
      if (remainingOffer.getOfferQuant() > 0) {
        this.updateOffer(remainingOffer, "compra");
        this.checkTransaction(remainingOffer, "compra");
      }
    } else {
      this.buyOffers = this.createOffer(this.buyOffers, offer);
    }
  }

  static createSellOffer(offer: Stock) {
    const buyOffers = this.checkTransaction(offer, "venda");
    if (buyOffers && buyOffers.length) {
      console.log(buyOffers);
      const remainingOffer = this.transaction(this.buyOffers, offer, buyOffers);
      if (remainingOffer.getOfferQuant() > 0) {
        this.updateOffer(remainingOffer, "venda");
        this.checkTransaction(remainingOffer, "venda");
      }
    } else {
      this.sellOffers = this.createOffer(this.sellOffers, offer);
    }
  }

  private static updateOffer(offer: Stock, transactionType: string) {
    const offers =
      transactionType === "venda" ? this.sellOffers : this.buyOffers;
    let newObj = {};
    newObj[offer.getBrokerName()] = {
      price: offer.getOfferPrice(),
      quant: offer.getOfferQuant(),
    };
    offers[offer.getStockName()] = newObj;
  }

  private static checkTransaction(offer: Stock, transactionType: string) {
    const offers =
      transactionType === "compra" ? this.sellOffers : this.buyOffers;
    if (!offers || !offers[offer.getStockName()]) return false;
    if (transactionType === "compra")
      return Object.keys(offers?.[offer.getStockName()])?.filter(
        (broker: string) =>
          offers[offer.getStockName()][broker].price <= offer.getOfferPrice()
      );
    return Object.keys(offers?.[offer.getStockName()])?.filter(
      (broker: string) =>
        offers[offer.getStockName()][broker].price >= offer.getOfferPrice()
    );
  }

  private static createOffer(offerObj: Object, offer: Stock): Object {
    if (!offerObj || !offerObj[offer.getStockName()]) {
      offerObj = {
        ...offerObj,
        [offer.getStockName()]: {
          [offer.getBrokerName()]: {
            price: offer.getOfferPrice(),
            quant: offer.getOfferQuant(),
          },
        },
      };
    } else {
      offerObj[offer.getStockName()][offer.getBrokerName()] = {
        price: offer.getOfferPrice(),
        quant: offer.getOfferQuant(),
      };
    }
    return offerObj;
  }

  static transaction(
    offersObj: Object,
    offer: Stock,
    sellOffer: string[]
  ): Stock {
    let buyerOffer = offer.getOfferQuant(); // 30 -> [10]
    for (let i = 0; buyerOffer > 0 && i < sellOffer.length; i++) {
      const sell = sellOffer[i];
      const buyerOffer2 = buyerOffer;
      buyerOffer = buyerOffer - offersObj[offer.getStockName()][sell].quant;
      if (buyerOffer >= 0) delete offersObj[offer.getStockName()][sell];
      else offersObj[offer.getStockName()][sell].quant -= buyerOffer2;
    }

    const newOffer: Offer = {
      price: offer.getOfferPrice(),
      quant: buyerOffer,
    };
    return new Stock(newOffer, offer.getStockName(), offer.getBrokerName());
  }
}

export default OfferBook;
