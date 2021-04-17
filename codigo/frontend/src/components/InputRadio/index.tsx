import { Label, InputStyle } from "./styles";
interface InputRadioProps {
  labelText: string;
  inputName: string;
  changeInputRadio: Function;
}

function InputRadio({
  labelText,
  inputName,
  changeInputRadio,
}: InputRadioProps) {
  return (
    <Label onChange={(e) => changeInputRadio(e)}>
      <InputStyle
        required
        type={"radio"}
        name={"selectType"}
        value={inputName}
      />
      {labelText}
    </Label>
  );
}

export default InputRadio;
