import { InputStyle } from "./styles";
interface InputProps {
  type: string;
  placeholder: string;
  changeInput: Function;
  maxLenght?: number;
}

function Input({ changeInput, placeholder, type, maxLenght }: InputProps) {
  return (
    <InputStyle
      required
      type={type}
      maxLength={maxLenght}
      placeholder={placeholder}
      style={{ width: type === "number" ? 120 : "" }}
      onChange={(e) => changeInput(e)}
    />
  );
}

export default Input;
