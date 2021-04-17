import { ReactNode } from "react";
import { FormContainer, InputsContainer, Button } from "./styles";

interface FormProps {
  submit: Function;
  children: ReactNode;
  formTitle: string;
  buttonText: string;
  height: string;
}

function Form({ children, submit, formTitle, buttonText, height }: FormProps) {
  return (
    <FormContainer onSubmit={(e) => submit(e)} style={{ height }}>
      <h2>{formTitle}</h2>
      <InputsContainer>{children}</InputsContainer>
      <Button>{buttonText}</Button>
    </FormContainer>
  );
}

export default Form;
