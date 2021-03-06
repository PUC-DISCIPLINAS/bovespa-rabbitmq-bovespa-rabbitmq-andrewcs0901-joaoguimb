import styled from "styled-components";

export const FormContainer = styled.form`
  width: 90%;
  color: white;
  padding: 10px;
  max-width: 1000px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #4c566a;
  border-radius: 12px;
  @media (min-width: 2300px) {
    width: 50%;
    height: 20%;
  }
  h2 {
    color: white;
    margin-top: 40px;
  }
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  width: 240px;
  border: none;
  border-radius: 6px;
  background-color: #eceff4;
  color: #4c566a;
  margin-bottom: 40px;
  height: 30px;
  &:hover {
    cursor: pointer;
    background-color: #d8dee9;
  }
`;
