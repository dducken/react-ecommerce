import { ArrowBackIos, ArrowLeft } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
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




const NavAdmin = () => {

  return (
    <Container>
        <Wrapper>
            <ArrowLeft></ArrowLeft>
            <MenuItem>
            <Link to="/" style={{ textDecoration: 'none',color:'gray' }}>VOLVER AL INICIO</Link>
            </MenuItem>
        </Wrapper>
    </Container>
  )
}

export default NavAdmin