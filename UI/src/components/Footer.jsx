import { Instagram, MailOutline, Phone, Room } from "@material-ui/icons"
import styledComponents from "styled-components"


const Container = styledComponents.div`
    display: flex;
`
const Left = styledComponents.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`
const Logo = styledComponents.h1`
    
`
const Desc = styledComponents.span`
    margin: 20px 0px;
`
const SocialContainer = styledComponents.h1`
    display: flex;
`
const SocialIcon = styledComponents.h1`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #E4405F;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Center = styledComponents.div`
    flex: 1;
    padding: 20px;
`
const Title = styledComponents.h3`
   margin-bottom: 30px;

`
const List = styledComponents.ul`
   margin: 0;
   padding: 0;
   list-style: none;
   display: flex;
   flex-wrap: wrap;

`
const ListItem = styledComponents.li`
    width: 50%;
    margin-bottom: 10px;
`
const Right = styledComponents.div`
    flex: 1;
    padding: 20px;

    `
const ContactItem = styledComponents.div`
    margin-bottom: 10px;
    display: flex;
    align-items: center;

`
const Payment = styledComponents.img`
   width: 15%;

`


const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>RULO.</Logo>
            <Desc>
                #Trabajos a domicilio y personalizados
                #Excelente calidad
                #Hacemos envios
                #Presupuesto sin cargo
                #Su consulta no molesta
            </Desc>
            <SocialContainer>
                <SocialIcon>
                    <Instagram/>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Links que podrian interesarte!</Title>
                <List>
                    <ListItem>Inicio</ListItem>
                    <ListItem>Carrito</ListItem>
                    <ListItem>Mesas</ListItem>
                    <ListItem>Estanterias</ListItem>
                    <ListItem>Roperos</ListItem>
                    <ListItem>Nosotros</ListItem>
                </List>
        </Center>
        <Right>
            <Title>Contactanos</Title>
            <ContactItem><Room style={{marginRight:"10px"}}/> Picaflor 567, Arenales</ContactItem>
            <ContactItem><Phone style={{marginRight:"10px"}}/> +54 9 351 999 999</ContactItem>
            <ContactItem><MailOutline style={{marginRight:"10px"}}/> ejemplo@gmail.com</ContactItem>
            <Payment src="data:image/png;base64,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"/>
        </Right>
    </Container>
  )
}

export default Footer