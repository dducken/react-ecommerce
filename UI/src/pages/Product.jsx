import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavMenu from "../components/NavMenu";
import { addProduct } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;
const Title = styled.h1`
  font-weight: 200;
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
`;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});

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
  const handleClick = () => {
      //update cart
    dispatch(
      addProduct({ ...product, quantity, color })
    );
  };

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
                <FilterColor color={c} key={c} onClick={() => setColor(c)}/>
              ))}
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={()=>handleQuantity("dec")}/>
              <Amount>{quantity}</Amount>
              <Add onClick={()=>handleQuantity("inc")}/>
            </AmountContainer>
            <Button onClick={handleClick}>Agregar al carrito</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;