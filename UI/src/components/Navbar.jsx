import { PersonOutline, Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/UserRedux";

const Container = styled.div`
  height: 60px;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Phone = styled.span`
  font-size: 14px;
  margin-right: 5px;
`;
const Email = styled.span`
  font-size: 14px;
  cursor: pointer;
  margin-left: 5px;
`;
const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-weight: bold;
`;
// const Logo = styled.img`
//     width: 25px;
// `
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;
const Button = styled.button`
  padding: 4px;
  font-size: 13px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
//#region DropDownMenu
const DropDownContent = styled.div`
    display: none;
    position: absolute;
    background-color: #f9f9f9; //#f9f9f9
    min-width: 110px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0, 2);
    padding: 12px 16px;
    z-index: 1;
`
const NavbarDropdown = styled.div`
    position: relative;
    display: inline-block;
    &:hover ${DropDownContent} {
      display: block;
    }
  `;
const Li = styled.li`
  margin-top: 5px;
  font-size: 13px;
  `;
  const Ul = styled.ul`
  list-style-type: none;
    margin: 0;
    overflow: hidden;
    padding: 0px;
    color: black;
  `;

  //#endregion


const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const loggedIn = useSelector((state) => state.user.currentUser);
  const userName = useSelector((state) => state.user?.currentUser?.username);
  const dispatch = useDispatch();


  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
    window.location.href = "/";
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Phone>351999999</Phone> |<Email>carpinteriarulo@gmail.com</Email>
          <SearchContainer>
            <Input />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>RULO.</Logo>
        </Center>
        <Right>
          <NavbarDropdown>
          <MenuItem>
            {loggedIn ? `Hola, ${userName}  !` : <Link to="/register" style={{ textDecoration: 'none',color:'black' }}>REGISTRARSE</Link>}
          </MenuItem>
          {loggedIn && <DropDownContent>
            <Ul>
              <Li><Link to="/" style={{ textDecoration: 'none',color:'black' }}>Mi Perfil</Link></Li>
              <Li><Button onClick={(e) => handleLogout(e)}>Cerrar sesion</Button></Li>
              {/* <Li><Link to="/logout" style={{ textDecoration: 'none',color:'gray' }}>Cerrar sesion</Link></Li> */}
            </Ul>
          </DropDownContent>}
          </NavbarDropdown>
          <MenuItem>
            {loggedIn ?  <Link to='/' style={{ display:'none' }}>Cerrar sesion</Link>  
            : <Link to="/login" style={{ textDecoration: 'none',color:'black' }}>INICIAR SESIÓN</Link>}
          </MenuItem>
          <Link to="/cart" style={{ textDecoration: 'none',color:'black' }}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary"></Badge>
              <ShoppingCartOutlined></ShoppingCartOutlined>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
