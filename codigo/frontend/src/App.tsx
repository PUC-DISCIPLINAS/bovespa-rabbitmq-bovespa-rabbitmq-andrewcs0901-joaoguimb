import Form from "./components/Form";
import { FlexListContainer } from "./components/FlexContainer";
import Input from "./components/Input";
import { Container, InputRadioContainer, FormsContainer } from "./AppStyle";
import InputRadio from "./components/InputRadio";
import axios from "axios";
import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { toast } from "react-toastify";
import SignedActions from "./components/SignedActions";

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
    assignedStocks.forEach((stock) => {
      socket.on(stock, (data: any) => {
        console.log("aqui");
        console.log(data);
      });
    });
  }, [assignedStocks]);

  function handleStockName(e: any) {
    setStockName(e.target.value.toUpperCase());
  }
  function handleChangeBrokerName(e: any) {
    setBrokerName(e.target.value.toUpperCase());
  }
  function handleAssignStockName(e: any) {
    setAssignStockName(e.target.value.toUpperCase());
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

    if (stockName.length !== 4) {
      toast.warning(`😓 O campo do ativo deve ter 4 caracteres`, {
        position: "top-right",
      });
    } else if (brokerName.length !== 4) {
      toast.warning(`😓 O campo da corretora deve ter 4 caracteres`, {
        position: "top-right",
      });
    } else {
      await axios
        .post(
          `${process.env.REACT_APP_CLOUDAMQP_HOST}/publishMessage`,
          newOffer
        )
        .then((res) => {
          const { data } = res;
          console.log(data);
          if (!assignedStocks.includes(newOffer.stockName))
            setAssignedStock([...assignedStocks, newOffer.stockName]);
          toast.success(`🥳 ${data.message}`, {
            position: "top-right",
            autoClose: 5000,
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error(`😓${err.message}`, {
            position: "top-right",
          });
        });
    }
  }

  function handleChangeInputRadio(e: any) {
    setType(e.target.value);
  }

  function handleSignInBroker(e: any) {
    e.preventDefault();
    if (assignStockName.length !== 4) {
      toast.warning(`😓 O campo do ativo deve ter 4 caracteres`, {
        position: "top-right",
      });
    } else if (!assignedStocks.includes(assignStockName)) {
      setAssignedStock([...assignedStocks, assignStockName]);
      toast.success(`🥳 Ação assinada com sucesso`, {
        position: "top-right",
        autoClose: 5000,
      });
    } else {
      toast.warning(`🧐 Ação já assinada `, {
        position: "top-right",
        autoClose: 5000,
      });
    }
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
    <>
      <Container>
        <FormsContainer>
          <Form
            submit={createOffer}
            formTitle="Fazer oferta"
            buttonText="Cadastrar Oferta"
            height="52%"
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
            <label>Quantidade</label>
            <Input
              type="number"
              placeholder="Quantidade"
              value={quant}
              changeInput={handleChangeQuant}
            />
            <label>Preço</label>
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
            styles={{ marginTop: "20px" }}
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
      <SignedActions data={assignedStocks} />
    </>
  );
}

export default App;
