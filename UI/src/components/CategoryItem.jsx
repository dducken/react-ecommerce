import { Link } from "react-router-dom"
import styledComponents from "styled-components"
import { mobile } from "../responsive"

const Container = styledComponents.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
    transition: all 0.1s ease-out;

    &:hover{
        // border: 1px solid black;
        transform: scale(1.01);
    }
`
const Image = styledComponents.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

  ${mobile({ height:"30vh"})}
    
`
const Info = styledComponents.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Title = styledComponents.h1`
    color: white;
    margin-bottom: 20px;
`
const Button = styledComponents.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: gray;
    cursor: pointer;
    font-weight: 600;
`
const LinkTo = styledComponents.a`
  

`;

const CategoryItem = ({item}) => {
  return (
    <Container>
        <LinkTo href={`/products/${item.cat}#all`}>
        <Image src={item.img}/>
        <Info>
            <Title>{item.title}</Title>
            {/* <Button>VER</Button> */}
        </Info>
        </LinkTo>
    </Container>
  )
}

export default CategoryItem