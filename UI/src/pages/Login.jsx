import { Alert } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavMenu from "../components/NavMenu";
import PrevFooter from "../components/PrevFooter";
import { login } from "../redux/apiCalls";
import { loginFailure, loginSuccess } from "../redux/UserRedux";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";

//#region CSS
const FirstContainer = styled.div``;

const Container = styled.div`
  width: 100vw;
  height: 85vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/4665034/pexels-photo-4665034.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;

  ${mobile({ width: "70%"})}

`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;

  ${mobile({ fontSize: "20px"})}

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;
const ButtonContainer = styled.span`
  position: relative;
  width: 100%;
  height: 8vh;

  
`;
const Buttons = styled.button`
  width: 40%;
  border: none;
  padding: 13px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 30%;
  transition: 0.5s ease;
  // margin-bottom: 10px;

  &:hover {
    background-color: #e1f5f5;
    transform: scale(1.05);
    color: teal;
  }

  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 10px 0px;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  color: gray;
`;
const Subtitle = styled.span`
  font-size: 14px;
`;
const Error = styled.span`
  font-size: 14px;
  color: red;
`;
//#endregion

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [errMsg, setErrMsg] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(true);

  const handleClick = async (e) => {
    e.preventDefault();

    login(dispatch, { email, password });

    // if (loginFailure() != null) {
    //   setErrMsg(true);
    // }
    setTimeout(() => {
      setErrMsg(true);
    }, 1000);

  };

  return (
    <FirstContainer>
      <Announcement />
      <Navbar />
      <NavMenu />
      <Container>
        <Wrapper>
          <Title>INICIAR SESI??N</Title>
          <Form>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Contrase??a"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonContainer>
              <Buttons onClick={handleClick} disabled={isFetching}>
                ENTRAR
              </Buttons>
            </ButtonContainer>
            {errMsg && <ButtonContainer><Alert severity="error">Ups! Email o contrase??a incorrectos!</Alert></ButtonContainer>}

            <Link>Olvidaste la contrase??a?</Link>
            <Subtitle>
              No tenes una cuenta? <Link href="/register">Crear Cuenta</Link>
            </Subtitle>
          </Form>
        </Wrapper>
      </Container>
      <PrevFooter/>
      <Footer />
    </FirstContainer>
  );
};

export default Login;
