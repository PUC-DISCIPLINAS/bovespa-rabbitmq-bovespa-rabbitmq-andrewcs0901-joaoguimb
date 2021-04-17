import { useState } from "react";
import Form from "./components/Form";
import Input from "./components/Input";
import { Container, InputRadioContainer, FormsContainer } from "./AppStyle";
import InputRadio from "./components/InputRadio";
import axios from "axios";

function App() {
  const [brokerName, setBrokerName] = useState("");
  const [price, setPrice] = useState(0);
  const [quant, setQuant] = useState(0);
  const [type, setType] = useState("");

  console.log(process.env.REACT_APP_CLOUDAMQP_HOST);

  function handleChangeBrokerName(e: any) {
    setBrokerName(e.target.value);
  }
  function handleChangeQuant(e: any) {
    setQuant(e.target.value);
  }
  function handleChangePrice(e: any) {
    setPrice(e.target.value);
  }

  async function createOffer(e: any) {
    e.preventDefault();
    const newOffer = {
      brokerName,
      price,
      quant,
    };
    const parseObj = JSON.stringify(newOffer);
    console.log(newOffer);
    await axios
      .post(
        `${process.env.REACT_APP_CLOUDAMQP_HOST}`,
        {
          properties: {
            delivery_mode: 2,
            content_type: "application/json",
          },
          routing_key: `asd${newOffer.brokerName}`,
          payload: Buffer.from(parseObj).toString("base64"),
          payload_encoding: "base64",
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          auth: {
            username: "guest",
            password: "guest",
          },
        }
      )
      .then((res) => {
        const { data } = res;
        console.log(data);
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
    const assignBroker = {
      brokerName,
    };
    console.log(assignBroker);
  }

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

      <div>Compras</div>
      <div>Vendas</div>
      <div>Transações</div>
    </Container>
  );
}

export default App;
