import { ItemProps } from './ItemProps';
import {Styles} from './Styles'

export const Item = ({ stockName, brokerName, offer }: ItemProps) =>
(
    <Styles>
        <div>
            <h4>Ação: {stockName}</h4>
        </div>
        <div>
             Ofertante: {brokerName}
        </div>
        <div>
            Oferta: <span>Qnt: {offer.quant}</span> <span>$: {offer.price}</span>

        </div>
    </Styles>
)