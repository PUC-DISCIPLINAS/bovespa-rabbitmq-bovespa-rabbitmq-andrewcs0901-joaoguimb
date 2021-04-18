import { ReactNode } from "react";
import { FormContainer, InputsContainer, Button } from "./styles";

interface FormProps {
  submit: Function;
  children: ReactNode;
  formTitle: string;
  buttonText: string;
  height: string;
  styles?: {};
}

function Form({
  children,
  submit,
  formTitle,
  buttonText,
  height,
  styles,
}: FormProps) {
  return (
    <>
      <FormContainer onSubmit={(e) => submit(e)} style={{ height, ...styles }}>
        <h2 style={{ marginBottom: 5 }}>{formTitle}</h2>
        <InputsContainer>
          {children}
          <Button type="submit">{buttonText}</Button>
        </InputsContainer>
      </FormContainer>
    </>
  );
}

export default Form;
