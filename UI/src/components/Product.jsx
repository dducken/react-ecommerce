import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons"
import { Link, useNavigate } from "react-router-dom"
import styledComponents from "styled-components"

const Info = styledComponents.div`
     opacity: 0;
     width: 100%;
     height: 100%;
     position: absolute;
     top: 0;
     left: 0;
     background-color: rgba(0,0,0,0.2);
     z-index: 3;
     display: flex;
     align-items: center;
     justify-content: center;
     transition: all 0.3s ease;
     cursor: pointer;
`
const Info2 = styledComponents.div`
     opacity: 0.8;
     width: 90%;
     height: 50px;
     position: absolute;
     top: 70%;
     left: 0;
    //  background-color: rgba(0,0,0,0.2);
     

     z-index: 3;
     display: flex;
     align-items: center;
     justify-content: center;
     transition: all 0.3s ease;
     cursor: pointer;
     padding: 0 2px 0 20px;

     &:hover{
        opacity: 1;
        }
`
const Container = styledComponents.div`
     flex: 1;
     margin: 5px;
     min-width: 280px;
     height:  350px;
     display: flex;
     align-items: center;
     justify-content: center;
     background-color: #f5fbfd; //f5fbfd
     position: relative;
     cursor: pointer;

    //  &:hover ${Info}{
    //     opacity: 1;
    //  }
    &:hover{
        // background-color: #e9f5f5;
        border: 1px solid black;
        // transform: scale(1.1);
        }
`
const Circle = styledComponents.div`
     
`
const Image = styledComponents.img`
     max-width: 75%;
     height: 75%;
     object-fit: cover;
     z-index: 2;
`

const Icon = styledComponents.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.1s ease-out;

    &:hover{
    background-color: #e9f5f5;
    transform: scale(1.1);
    }
`
const TextContainer = styledComponents.div`
    width: 100%;
    height: 40px;
    // border-radius: 50%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    // margin: 10px;
    transition: all 0.1s ease-out;
    text-align: center;

    // &:hover{
    // background-color: #e9f5f5;
    // transform: scale(1.1);
    // }
`
const Linkto = styledComponents.a`
  
   text-decoration: none;
`
// const Title = styledComponents.span`
//     font-size: 12px;
//     font-weight: 300;
//     border: 1px solid;
//     font-weight: normal;
    
// `;
// const Link = styledComponents.a`
//   text-decoration : none;
//   color: black;
// `



const Product = ({item}) => {

    const handleRedirect = () => {
       window.location.assign(`/product/${item._id}`);
    }
   
  return (
      <Container id="all" onClick={handleRedirect}>
        {/* <Circle/> */}
        {/* <Linkto href={`/product/${item._id}`}> */}
        <Image src={item.img}/>
        {/* </Linkto> */}
        {/* <Title>{item.title}</Title> */}
        <Info2>
            {/* <Icon>
                <ShoppingCartOutlined/>
            </Icon>
            <Icon>
                <Link to={`/product/${item._id}`}>
                <SearchOutlined/>
                </Link>
            </Icon>
            <Icon>
                <FavoriteBorderOutlined/>
            </Icon> */}
            <TextContainer>
                {item.title}  ${item.price}
            </TextContainer>
        </Info2>
    
    </Container>
  )
}

export default Product