import Offer from "../interfaces/Offer";

export default class Stock {
  private offer: Offer;
  private stockName: string;
  private brokerName: string;

  constructor(offer: Offer, stockName: string, brokerName: string) {
    this.offer = offer;
    this.stockName = stockName;
    this.brokerName = brokerName;
  }

  public getOfferPrice() {
    return this.offer.price;
  }

  public getOfferQuant() {
    return this.offer.quant;
  }

  public getStockName(): string {
    return this.stockName;
  }

  public getBrokerName(): string {
    return this.brokerName;
  }
}
