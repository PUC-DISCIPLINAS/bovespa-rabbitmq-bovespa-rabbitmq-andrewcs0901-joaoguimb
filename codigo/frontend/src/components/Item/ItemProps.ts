export interface ItemProps {
    stockName: string;
    brokerName: string;
    offer:{
        quant: number;
        price: number;
    }
}