import { CreditCard, Instagram, LocalShipping, Lock, MailOutline, Phone, Room } from "@material-ui/icons"
import styledComponents from "styled-components"
import { mobile } from "../responsive"


const Container = styledComponents.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;

   ${mobile({ flexDirection: "column"})}

`


const ListContainer = styledComponents.div`
    width: 100%;
    display: flex;
    text-align:center;
    // align-items:center;
    justify-content: center;
    margin-top:40px;

    ${mobile({ display: "inline"})}

`
const ListItem = styledComponents.div`
    
    // margin: 0px 20px;
    padding: 30px 150px 30px 150px;
    border-radius: 10px;
   
  
`
 
const P = styledComponents.p`
   margin-top:5px;
   color: gray;

`
const Icon = styledComponents.span`
display: inline-block;
width: 20px;
margin-right: 4px;
vertical-align: middle;

`


const PrevFooter = () => {
  return (
    // <Container>
      
            
    //             <ListContainer>
                  
    //                 <ListItem><Icon><LocalShipping/></Icon> ENVIAMOS TU COMPRA
    //                 <P>A todo el pais!</P>
    //                 </ListItem>
    //                 <ListItem><Icon><CreditCard/></Icon> PAGÁ COMO QUIERAS
    //                 <P>Hasta 12 cuotas sin interés!</P>
    //                 </ListItem>
    //                 <ListItem><Icon><Lock/> </Icon>COMPRA CON SEGURIDAD
    //                 <P>Tus datos siempre protegidos</P>
    //                 </ListItem>
                

    //             </ListContainer>
        
    // </Container>
    <div className="container mt-5">
        <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-sm-12 col-md-3 col-lg-3">
            <Icon><LocalShipping/></Icon> ENVIAMOS TU COMPRA
                    <P>A todo el pais!</P>
            </div>
            <div className="col-sm-12 col-md-3 col-lg-3">
            <Icon><CreditCard/></Icon> PAGÁ COMO QUIERAS
                     <P>Hasta 12 cuotas sin interés!</P>
            </div>
            <div className="col-sm-12 col-md-3 col-lg-3">
            <Icon><Lock/> </Icon>COMPRA CON SEGURIDAD
                     <P>Tus datos siempre protegidos</P>
            </div>
            <div className="col-lg-1"></div>


        </div>
    </div>
  )
}

export default PrevFooter