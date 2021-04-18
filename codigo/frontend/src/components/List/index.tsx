import { Item } from '../Item'
import { ItemProps } from '../Item/ItemProps'
import ListProps from './ListProps'
import { Styles } from './Style'

export const List = ({ items, title }: ListProps) => (<Styles>
    <div>
        <h2>{title}</h2>
    </div>
    <div className="items">
        {items.map((item: ItemProps, index: number) => <Item {...item} key={`${title}${item.brokerName}${item.offer}${index}`} />)}
    </div>
</Styles>
)