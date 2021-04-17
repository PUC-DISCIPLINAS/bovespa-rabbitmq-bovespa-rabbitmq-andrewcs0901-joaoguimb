import { useState } from "react";
import Form from "./components/Form";
import { FlexListContainer } from './components/FlexContainer'
import Input from "./components/Input";
import { Container, InputRadioContainer, FormsContainer } from "./AppStyle";
import InputRadio from "./components/InputRadio";
function App() {
  const [brokerName, setBrokerName] = useState("");
  const [price, setPrice] = useState(0);
  const [quant, setQuant] = useState(0);
  const [type, setType] = useState("");

  function handleChangeBrokerName(e: any) {
    setBrokerName(e.target.value);
  }
  function handleChangeQuant(e: any) {
    setQuant(e.target.value);
  }
  function handleChangePrice(e: any) {
    setPrice(e.target.value);
  }

  function createOffer(e: any) {
    e.preventDefault();
    const newOffer = {
      brokerName,
      price,
      quant,
      type,
    };

    console.log(newOffer);
  }

  function handleChangeInputRadio(e: any) {
    setType(e.target.value);
  }

  function handleSignInBroker(e: any) {
    e.preventDefault();
    const assignBroker = {
      brokerName,
    };
    console.log(assignBroker);
  }

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
              changeInput={handleChangeBrokerName}
            />
            <Input
              type="number"
              placeholder="Quantidade"
              changeInput={handleChangeQuant}
            />
            <Input
              type="number"
              placeholder="Preço"
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
              placeholder="Corretora"
              maxLenght={4}
              changeInput={handleChangeBrokerName}
            />
          </Form>
        </FormsContainer>
        <FlexListContainer lists={lists} />
      </Container>
  );
}

export default App;
