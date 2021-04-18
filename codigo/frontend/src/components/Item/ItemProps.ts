export interface ItemProps {
    stockName: string;
    brokerName: string;
    buyerBrokerName?: string;
    sellerBrokerName?: string;
    offer:{
        quant: number;
        price: number;
    }
}