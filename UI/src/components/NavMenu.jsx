import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Container = styled.div`
    height: 60px;
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
`
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




const NavMenu = () => {
  return (
    <Container>
        <Wrapper>
            <MenuItem><Link to="/" style={{ textDecoration: 'none',color:'black' }}>INICIO</Link></MenuItem>

           <NavbarDropdown>
            <MenuItem>
            <Link to="/products" style={{ textDecoration: 'none',color:'black' }}>PRODUCTOS</Link> 
            </MenuItem>
            <DropDownContent>
                <Ul>
                <Li><Link to="/products/racks-tv" style={{ textDecoration: 'none',color:'black' }}>Racks TV</Link></Li>
                <Li><Link to="/products/mesas-ratonas" style={{ textDecoration: 'none',color:'black' }}>Mesas ratonas</Link></Li>
                <Li><Link to="/products/estanterias" style={{ textDecoration: 'none',color:'black' }}>Estanterias</Link></Li>
                <Li><Link to="/products/bibliotecas" style={{ textDecoration: 'none',color:'black' }}>Bibliotecas</Link></Li>
                </Ul>
            </DropDownContent>
            </NavbarDropdown>
            
            <MenuItem><Link to="/" style={{ textDecoration: 'none',color:'black' }}>NOSOTROS</Link></MenuItem>
            <MenuItem><Link to="/" style={{ textDecoration: 'none',color:'black' }}>CONTACTO</Link></MenuItem>

        </Wrapper>
    </Container>
  )
}

export default NavMenu