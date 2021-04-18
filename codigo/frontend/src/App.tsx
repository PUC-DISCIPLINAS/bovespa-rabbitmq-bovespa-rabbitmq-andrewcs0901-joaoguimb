import Form from "./components/Form";
import { FlexListContainer } from "./components/FlexContainer";
import Input from "./components/Input";
import { Container, InputRadioContainer, FormsContainer } from "./AppStyle";
import InputRadio from "./components/InputRadio";
import axios from "axios";
import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

function App() {
  const [brokerName, setBrokerName] = useState("");
  const [stockName, setStockName] = useState("");
  const [assignStockName, setAssignStockName] = useState("");
  const [price, setPrice] = useState(0);
  const [quant, setQuant] = useState(0);
  const [type, setType] = useState("");
  const [assignedStocks, setAssignedStock] = useState<string[]>([]);

  useEffect(() => {
    console.log("fora");

    const socket = socketIOClient(`${process.env.REACT_APP_WEBSOCKET}`);
    assignedStocks.forEach(stock => {
      socket.on(stock, (data: any) => {
        console.log("aqui");
        console.log(data);
      });
    })
  }, [assignedStocks]);

  function handleStockName(e: any) {
    setStockName(e.target.value);
  }
  function handleChangeBrokerName(e: any) {
    setBrokerName(e.target.value);
  }
  function handleAssignStockName(e: any) {
    setAssignStockName(e.target.value);
  }
  function handleChangeQuant(e: any) {
    if (e.target.value === "") {
      setQuant(0);
      return;
    }
    const qnt = parseInt(e.target.value);
    if (isNaN(qnt) || negativeNumber(qnt)) return;
    setQuant(qnt);
  }
  function handleChangePrice(e: any) {
    if (e.target.value === "") {
      setPrice(0);
      return;
    }
    const price = parseFloat(e.target.value);
    if (isNaN(price) || negativeNumber(price)) return;
    setPrice(price);
  }
  console.log(assignedStocks);
  async function createOffer(e: any) {
    e.preventDefault();
    const routingKey = `${type}.${stockName}`;
    const newOffer = {
      stockName,
      brokerName,
      price,
      quant,
      routingKey,
    };

    console.log(newOffer);
    await axios
      .post(`${process.env.REACT_APP_CLOUDAMQP_HOST}/publishMessage`, newOffer)
      .then((res) => {
        const { data } = res;
        console.log(data);
        if (!assignedStocks.includes(newOffer.stockName))
          setAssignedStock([...assignedStocks, newOffer.stockName]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleChangeInputRadio(e: any) {
    setType(e.target.value);
  }

  function handleSignInBroker(e: any) {
    e.preventDefault();
    if (!assignedStocks.includes(assignStockName))
      setAssignedStock([...assignedStocks, assignStockName]);
  }

  const negativeNumber = (n: number) => n < 0;

  const lists = [
    {
      title: "Compras",
      items: [
        {
          stockName: "Test",
          brokerName: "BROK1",

          offer: {
            quant: 10,
            price: 10,
          },
        },
        {
          stockName: "Test2",
          brokerName: "BROK3",

          offer: {
            quant: 10,
            price: 10,
          },
        },
        {
          stockName: "Test3",
          brokerName: "BROK2",

          offer: {
            quant: 10,
            price: 10,
          },
        },
        {
          stockName: "Test5",
          brokerName: "BROK6",

          offer: {
            quant: 10,
            price: 10,
          },
        },
        {
          stockName: "Test8",
          brokerName: "BROK7",

          offer: {
            quant: 10,
            price: 10,
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
    },
  ];

  return (
    <Container>
      <FormsContainer>
        <Form
          submit={createOffer}
          formTitle="Fazer oferta"
          buttonText="Cadastrar Oferta"
          height="40%"
        >
          <Input
            type="text"
            placeholder="Corretora"
            maxLenght={4}
            value={brokerName}
            changeInput={handleChangeBrokerName}
          />
          <Input
            type="text"
            placeholder="Ativo"
            maxLenght={4}
            value={stockName}
            changeInput={handleStockName}
          />
          <Input
            type="number"
            placeholder="Quantidade"
            value={quant}
            changeInput={handleChangeQuant}
          />
          <Input
            type="number"
            placeholder="Preço"
            value={price}
            changeInput={handleChangePrice}
          />
          <InputRadioContainer>
            <InputRadio
              labelText="Comprar"
              inputName="compra"
              changeInputRadio={handleChangeInputRadio}
            />
            <InputRadio
              labelText="Vender"
              inputName="venda"
              changeInputRadio={handleChangeInputRadio}
            />
          </InputRadioContainer>
        </Form>
        <Form
          submit={handleSignInBroker}
          formTitle="Assinar ação"
          buttonText="Assinar ação"
          height="20%"
        >
          <Input
            type="text"
            placeholder="Ação"
            maxLenght={4}
            value={assignStockName}
            changeInput={handleAssignStockName}
          />
        </Form>
      </FormsContainer>
      <FlexListContainer lists={lists} />
    </Container>
  );
}

export default App;
