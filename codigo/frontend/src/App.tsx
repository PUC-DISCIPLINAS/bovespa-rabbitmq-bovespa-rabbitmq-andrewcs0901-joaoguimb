import Form from "./components/Form";
import { Container } from "./AppStyle";
import {FlexListContainer} from './components/FlexContainer'
function App() {

  const lists = [
    {
      title: "Compras",
      items: [
        {
          stockName: "Test",
          brokerName: "BROK1",

          offer: {
            quant: 10,
            price: 10
          },
        },
        {
          stockName: "Test2",
          brokerName: "BROK3",

          offer: {
            quant: 10,
            price: 10
          },
        },
        {
          stockName: "Test3",
          brokerName: "BROK2",

          offer: {
            quant: 10,
            price: 10
          },
        },
        {
          stockName: "Test5",
          brokerName: "BROK6",

          offer: {
            quant: 10,
            price: 10
          },
        },
        {
          stockName: "Test8",
          brokerName: "BROK7",

          offer: {
            quant: 10,
            price: 10
          },
        },
      ],
    },
    {
      title: "Vendas",
      items: [],
    },
    {
      title: "Transações",
      items: [],
    }

  ]



  return (
    <Container>
      <Form></Form>
      <FlexListContainer lists={lists}/>
    </Container>
  );
}

export default App;
