import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: white
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #b93d3d;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Criar conta</Title>
        <Form>
          <Input placeholder="nome" />
          <Input placeholder="sobrenome" />
          <Input placeholder="nome de usuário" />
          <Input placeholder="email" />
          <Input placeholder="senha" type="password" />
          <Input placeholder="confirmar senha" type="password" />
          <Agreement>
            Eu concordo com os termos de política de privacidade            <b>POLÍTICA DE PRIVACIDADE</b><br/>
          </Agreement>
          <Button>CRIAR</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
