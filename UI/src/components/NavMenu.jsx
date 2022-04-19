import React from 'react'
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

const NavMenu = () => {
  return (
    <Container>
        <Wrapper>
            <MenuItem>INICIO</MenuItem>
            <MenuItem>PRODUCTOS</MenuItem>
            <MenuItem>NOSOTROS</MenuItem>
            <MenuItem>CONTACTO</MenuItem>
        </Wrapper>
    </Container>
  )
}

export default NavMenu