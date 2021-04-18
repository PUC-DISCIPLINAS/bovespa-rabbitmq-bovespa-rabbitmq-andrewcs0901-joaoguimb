import Form from "./components/Form";
import { FlexListContainer } from "./components/FlexContainer";
import Input from "./components/Input";
import { Container, InputRadioContainer, FormsContainer } from "./AppStyle";
import InputRadio from "./components/InputRadio";
import axios from "axios";
import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { ItemProps } from "./components/Item/ItemProps";
import { toast } from "react-toastify";
import SignedActions from "./components/SignedActions";

interface BrokerList {
  [compra: string]: {
    items: ItemProps[]
  }
}


function App() {
  const [brokerName, setBrokerName] = useState("");
  const [stockName, setStockName] = useState("");
  const [assignStockName, setAssignStockName] = useState("");
  const [price, setPrice] = useState(0);
  const [quant, setQuant] = useState(0);
  const [type, setType] = useState("");
  const [assignedStocks, setAssignedStock] = useState<string[]>([]);
  const [lists, setList] = useState<BrokerList>(
    {
      "compra": {
        items: [],
      },
      "venda": {
        items: [],
      },
      "transacao": {
        items: [],
      }
    }
  )

  useEffect(() => {
    const socket = socketIOClient(`${process.env.REACT_APP_WEBSOCKET}`, { transports: ['websocket'] });
    assignedStocks.forEach((stock) => {

      socket.on(stock, (data: any) => {
        if (data.type !== 'transacao') {
          setList((oldlist) =>
          ({
            ...oldlist, [data.type]: {
              items: !oldlist[data.type].items.filter(item => item.brokerName === data.brokerName).find(item => item.stockName === data.brokeName) ?
                [data, ...oldlist[data.type].items] :
                oldlist[data.type]
                  .items.map(item => item.brokerName === data.brokerName && item.stockName === data.brokeName ? data : item)
            }
          }))
        }
        else
          setList((oldlist) => (
            {
              "compra": {
                items: oldlist.compra.items.filter(item => item.brokerName !== data.buyerBrokerName || item.stockName !== data.stockName)
              },
              "venda": {
                items: oldlist.venda.items.filter(item => item.brokerName !== data.sellerBrokerName || item.stockName !== data.stockName),
              },
              "transacao": {
                items: [data, ...oldlist.transacao.items],
              }
            }
          ))
      });

    })
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

  function createOffer(e: any) {
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
      return toast.warning(`😓 O campo do ativo deve ter 4 caracteres`, {
        position: "top-right",
      });
    } if (!assignedStocks.includes(stockName))
      setAssignedStock((currentStocks) => [...currentStocks, stockName]);
    else if (brokerName.length !== 4) {
      toast.warning(`😓 O campo da corretora deve ter 4 caracteres`, {
        position: "top-right",
      });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_CLOUDAMQP_HOST}/publishMessage`,
          newOffer
        )
        .then((res) => {
          const { data } = res;
          toast.success(`🥳 ${data.message}`, {
            position: "top-right",
            autoClose: 5000,
          });
        })
        .catch((err) => {
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

  const list = () => Object.keys(lists).map((list: string) => (
    { title: list, items: lists[list].items }))

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
        <FlexListContainer lists={list()} />
      </Container>
      <SignedActions data={assignedStocks} />
    </>
  );
}

export default App;
