import { Item } from '../Item'
import { ItemProps } from '../Item/ItemProps'
import ListProps from './ListProps'
import { Styles } from './Style'

export const List = ({ items, title }: ListProps) =>
(
    <Styles>
        <div>
            <h2>{title}</h2>
        </div>
        <div className="items">
            {items.map((item: ItemProps) => <Item {...item} key={`${title}${item.brokerName}`} />)}
        </div>
    </Styles>
)