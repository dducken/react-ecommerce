import { Add, Remove } from "@material-ui/icons";
import "./single/productColor.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavMenu from "../components/NavMenu";
import { addProduct, addToCart } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";
import Swal from "sweetalert2";
import { Alert } from "@mui/material";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;

  ${mobile({ flexDirection:"column", padding:"35px"})}

`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;

  ${mobile({ height:"50vh"})}

`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;
const Title = styled.h1`
  font-weight: 200;

  ${mobile({ marginTop:"20px"})}

`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 35px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 0.5px solid gray;
  margin: 0px 5px;
  cursor: pointer;

  // &:hover {
  //   border: 1px solid black;
  // }
`;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mobile({ width:"210px"})}
  

`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }

  ${mobile({ padding:"8px",fontSize:"12px"})}
`;
const AddRemoveBtn = styled.span`
  cursor: pointer;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [Active, setActive] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/get/" + id);
        setProduct(res.data.product);
      } catch (err) {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

//   price:product.price*quantity multiplicador del precio segun la cantidad
  const handleClick = (product) => {
  //Update cart
    dispatch(
      addProduct({ ...product, quantity, color })
    );
    // dispatch(
    //   addToCart({ ...product, quantity, color })
    // );
    
    // dispatch(addToCart({...product, quantity, color}));
    setActive(true);
    setTimeout(function () {
     setActive(false);
    }, 1500);
 
  };

  const COLOR_BTNS = document.querySelectorAll('.color');

 COLOR_BTNS.forEach(color => {
    color.addEventListener('click', () => {
      if(!color.classList.contains('active-color')){
        resetActiveColor();
        color.classList.add('active-color');
      }
    });
    
  })

  //Resetear color
  const resetActiveColor = () => {
    COLOR_BTNS.forEach(color => {
      color.classList.remove('active-color')
    })
  }

  return (
    <Container>
      <Announcement />
      <Navbar />
      <NavMenu />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <div className="color">
                  <FilterColor color={c} key={c} onClick={() => setColor(c)}/>
                  </div>
              ))}
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <AddRemoveBtn><Remove onClick={()=>handleQuantity("dec")}/></AddRemoveBtn>
              <Amount>{quantity}</Amount>
              <AddRemoveBtn><Add onClick={()=>handleQuantity("inc")}/></AddRemoveBtn>
            </AmountContainer>
            <Button onClick={() => handleClick(product)}>Agregar al carrito</Button>
          </AddContainer>
            {
              Active && <Alert style={{marginTop: '10px'}} severity="success">Agregado al carrito </Alert>
            }
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;
