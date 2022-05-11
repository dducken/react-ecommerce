import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavMenu from "../components/NavMenu";
import { register } from "../redux/apiCalls";

//#region CSS
const FirstContainer = styled.div``;
const Container = styled.div`
  widht: 100vw;
  height: 85vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
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
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
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
const ButtonContainer = styled.span`
  position: relative;
  width: 100%;
  height: 8vh;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 0;
  position: absolute;
  top: 0;
  left: 30%;
  transition: 0.5s ease;

  &:hover{
    background-color: #e1f5f5;
    transform: scale(1.05);
    color: teal;
  }
`;
const Link = styled.a`
  text-decoration : underline;
  color: gray;
`
const Subtitle = styled.span`
  font-size: 14px;
  margin: 20px 0px;

`;
//#endregion

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching, error} = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, { name, email, password });
  };

  return (
    <FirstContainer>
      <Announcement />
      <Navbar />
      <NavMenu />
      <Container>
        <Wrapper>
          <Title>CREAR UNA CUENTA</Title>
          <Form>
            <Input placeholder="Nombre" type="text" onChange={(e) => setName(e.target.value)}/>
            <Input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder="Contraseña" type="password" onChange={(e) => setPassword(e.target.value)}/>
            <Input placeholder="Confirmar Contraseña" type="password" onChange={(e) => setPassword(e.target.value)}/>
            <Agreement>
              Al crear una cuenta declaras que has leido los <b>terminos y
              condiciones</b>
            </Agreement>
            <ButtonContainer>
              <Button onClick={handleClick}>CREAR</Button>
            </ButtonContainer>
              <Subtitle>Ya tenes cuenta? <Link href="/login">Iniciar Sesión</Link></Subtitle>
          </Form>
        </Wrapper>
      </Container>
      <Footer/>
    </FirstContainer>
  );
};

export default Register;
