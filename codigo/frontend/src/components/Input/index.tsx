import { InputStyle } from "./styles";
interface InputProps {
  type: string;
  placeholder: string;
  changeInput: Function;
  value: string | number;
  maxLenght?: number;
}

function Input({ changeInput, placeholder, type, maxLenght, value }: InputProps) {
  return (
    <InputStyle
      required
      type={type}
      maxLength={maxLenght}
      placeholder={placeholder}
      style={{ width: type === "number" ? 120 : "" }}
      onChange={(e) => changeInput(e)}
      value={value}
    />
  );
}

export default Input;
