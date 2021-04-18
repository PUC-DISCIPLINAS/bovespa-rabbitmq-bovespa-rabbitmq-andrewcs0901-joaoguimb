import { Container } from "./styles";

interface SignedActionsProps {
  data: string[];
}

const SignedActions = ({ data }: SignedActionsProps) => {
  return (
    <Container>
      <h2>Minhas Ações</h2>
      {data.map((el) => `${el}, `)}
    </Container>
  );
};

export default SignedActions;
