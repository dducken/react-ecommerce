import { useEffect, useState } from "react";
import styledComponents from "styled-components";
import Product from "./Product";
import axios from "axios";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";

const Container = styledComponents.div`
    padding: 45px 180px 80px 180px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

  ${mobile({ padding: '45px 0 0 1px' })}

`;
const TitleContainer = styledComponents.div`
  text-align: center;
  margin: 20px 0;
  float: left;
  width: 100%;
`;
const Title = styledComponents.h1`
    font-size: 30px;
    font-weight: 500;
    border: 1px solid;
    padding: 10px 25px;
    font-size: 18px;
    font-weight: normal;
    display: inline-block;
    border-color: #040404;
    background-color: #fff;

`;
const TitleLine = styledComponents.hr`
  display: block;
  overflow: hidden;
  margin: -31px 190px 5px 190px;
  border-top: 1px solid #040404;
  opacity:1;

`;
const Button = styledComponents.button`
  width: 220px;
  margin-top: 15px;
  padding: 15px 25px;
  background-color: white;
  color: black;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid;
  transition: 0.5s ease;

  &:hover {
    background-color: #0f0f0f;
    color: white;
  }

  ${mobile({ marginTop: "5px", borderRadius: "5px" })}
`;
const ButtonContainer = styledComponents.div`
 width: 100%;
 display:flex;
 align-items: center;
 justify-content:center;
 margin-bottom: 120px;
`;
const LinkTo = styledComponents.a`
  

`;

const HomeProducts = ({ cat }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  

  // Filtrar por categoria
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );

        setProducts(res.data.products);
        setFilteredProducts(res.data.products);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);



  return (
    <div>
      <TitleContainer>
        <Title>Productos destacados</Title>
        <TitleLine />
      </TitleContainer>
      <Container>
        {cat
          ? filteredProducts.map((item) => (
              <Product item={item} key={item.id} />
            ))
          : products
              .slice(0, 10)
              .map((item) => <Product item={item} key={item.id} />)}
      </Container>
      <ButtonContainer>
        <LinkTo href="/products#all">
        <Button>Ver todos los productos</Button>
        </LinkTo>
      
      </ButtonContainer>
    </div>
  );
};

export default HomeProducts;
