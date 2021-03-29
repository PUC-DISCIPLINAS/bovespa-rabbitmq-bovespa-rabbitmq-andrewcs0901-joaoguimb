import Stock from "./Stock";

class OfferBook {

    static buyOffers: Object;
    static sellOffers: Object;

    static createBuyOffer(offer: Stock) {
        if(this.checkTransaction(offer)) {

        } else {
            this.buyOffers[offer.getStockName()] = [...this.buyOffers[offer.getStockName()], offer];
        }
    }

    static createSellOffer(offer: Stock){
        this.sellOffers[offer.getStockName()] = [...this.sellOffers[offer.getStockName()], offer];
    }

    static checkTransaction(offer: Stock) {
        this.sellOffers[offer.getStockName()]
        return true //<------
    }

}


export default OfferBook