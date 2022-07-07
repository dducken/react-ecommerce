import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
    height: 30px;
    background-color: #0f0f0f;//teal
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;

  ${mobile({ height: "20px", fontSize: "12px"})}

`

const Announcement = () => {
  return (
    <Container>
        15% de descuento pagando en efectivo o transferencia bancaria!
    </Container>
  )
}

export default Announcement