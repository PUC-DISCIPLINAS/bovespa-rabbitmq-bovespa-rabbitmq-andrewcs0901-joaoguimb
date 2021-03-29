import * as Amqp from 'amqp-ts'
import Stock from '../models/Stock'
import OfferBook from '../models/OfferBook'
import Offer from '../interfaces/Offer'

export default class StockExchange {

    static handleStock(routingKey: string, message: Amqp.Message) {
        const splitedRoutingKey = routingKey.split(".")[0]
        
        const { quant, price, brokerName } = message.getContent()
        const newStock = new Stock( { quant, price, brokerName }, splitedRoutingKey[1])
        if(splitedRoutingKey[0] === "compra") 
            OfferBook.createBuyOffer(newStock)
        else
            OfferBook.createSellOffer(newStock)
    }

    static transaction() {

    }

    
}