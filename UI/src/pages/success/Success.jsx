import { Add, Remove } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../../components/Announcement";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import NavMenu from "../../components/NavMenu";
import { mobile } from "../../responsive";
import { useLocation, useNavigate } from "react-router-dom";


//#region CSS
const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mobile({ padding: "15px"})}

`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 500;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};

  ${mobile({ padding: "5px"})}


`;
const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;

  ${mobile({ fontSize:"13px"})}

`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection:"column"})}
`;
const Info = styled.div`
  flex: 3;

`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;



`;

const Image = styled.img`
  width: 150px;
  height: 100px;
  object-fit: cover;

  ${mobile({ width: "100px", height: "80px"})}

`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  ${mobile({ padding: "10px",fontSize:"13px"})}

`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};

  ${mobile({ width: "15px", height: "15px"})}

`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  ${mobile({ marginBotton:"10px"})}

`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

  ${mobile({ fontSize:"18px"})}

`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

  ${mobile({ fontSize:"19px"})}

`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

//#endregion

const Success = () => {
    // const location = useLocation();
    // const data = location.state.stripeData;
    // const cart = location.state.cart;
    const { order } = this.props.location.state;
    // console.log(data);

  return (
    <Container>
      <Announcement />
      <Navbar />
      <NavMenu />
      <Wrapper id="wrapper">
        <Title>Orden de compra</Title>
        <Top>
          <TopButton>VER MIS COMPRAS</TopButton>
        </Top>
        <Bottom>
          <Info>
            <label>Orden No.</label>
            <input value={order?._id}/>
            <label>Productos</label>
            {order?.products.map((product)=>{
            <input value={product?.productId}/>
            })}
            <Hr />
            
          </Info>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Success;
