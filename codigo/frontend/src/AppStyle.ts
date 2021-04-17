import styled, { createGlobalStyle } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FormsContainer = styled.div`
  width: 30%;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const InputRadioContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GlobalStyle = createGlobalStyle`
  body{
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #2E3440;
  }
`