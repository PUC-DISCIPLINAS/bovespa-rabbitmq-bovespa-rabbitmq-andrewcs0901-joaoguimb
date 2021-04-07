import Offer from "../interfaces/Offer";

export default class Transaction {
  private offer: Offer;
  private date: string;
  private buyerBrokerName: string;
  private sellerBrokerName: string;
  private stockName: string;

  constructor(
    date: string,
    offer: Offer,
    stockName: string,
    buyerBrokerName: string,
    sellerBrokerName: string
  ) {
    this.date = date;
    this.offer = offer;
    this.stockName = stockName;
    this.buyerBrokerName = buyerBrokerName;
    this.sellerBrokerName = sellerBrokerName;
  }

  public getOfferPrice() {
    return this.offer.price;
  }

  public getOfferQuant() {
    return this.offer.quant;
  }

  public getStockName() {
    return this.stockName;
  }

  public getBuyerBrokerName(): string {
    return this.buyerBrokerName;
  }
  public getSellerBrokerName(): string {
    return this.sellerBrokerName;
  }
}
