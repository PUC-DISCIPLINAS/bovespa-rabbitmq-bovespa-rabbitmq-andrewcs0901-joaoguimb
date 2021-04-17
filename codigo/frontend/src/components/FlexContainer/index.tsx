import { List } from "../List";
import { FlexListContainerProps } from './FlexListContainerProps'
import { Styles } from './Style';

export const FlexListContainer = ({ lists }: FlexListContainerProps) => (<Styles>{lists.map(list => <List {...list} key={list.title}/>)}</Styles>)