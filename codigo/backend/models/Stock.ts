import Offer from '../interfaces/Offer'

export default class Stock {
    private offer: Offer;
    private stockName: string;

    constructor(offer: Offer, stockName: string) {
        this.offer = offer
        this.stockName = stockName
    }

   public getOffer() {
       return this.offer
   }
    
    public getStockName():string{
        return this.stockName;
    }
}


