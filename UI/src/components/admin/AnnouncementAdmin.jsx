import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 30px;
    background-color: #800040;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`

const AnnouncementAdmin = () => {
  return (
    <Container>
        Modo Administrador
    </Container>
  )
}

export default AnnouncementAdmin