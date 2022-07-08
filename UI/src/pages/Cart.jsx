//Modal
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// Others

import { Add, Delete, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavMenu from "../components/NavMenu";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { publicRequest } from "../requestMethods";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addProduct, addToCart, decreaseCart, removeAllProducts, removeFromCart, removeProduct } from "../redux/cartRedux";
import { Alert } from "@mui/material";
const KEY = process.env.REACT_APP_STRIPE;

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

  ${mobile({ padding: "15px" })}
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 500;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};

  ${mobile({ padding: "5px" })}
`;
const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;

  ${mobile({ fontSize: "13px" })}
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: "column" })}
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

  ${mobile({ width: "100px", height: "80px" })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  ${mobile({ padding: "10px", fontSize: "13px" })}
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};

  ${mobile({ width: "15px", height: "15px" })}
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

  ${mobile({ marginBotton: "10px" })}
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

  ${mobile({ fontSize: "18px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

  ${mobile({ fontSize: "19px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Summary = styled.div`
  flex: 1;
  // position:relative;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;

  ${mobile({ height: "40vh", padding: "15px", marginTop: "35px" })}
`;

const SummaryTitle = styled.h1`
  margin-top: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 200;

  ${mobile({ fontSize: "20px", fontWeight: "300" })}
`;

const SummaryItem = styled.div`
  margin: 45px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};

  ${mobile({ fontSize: "15px", margin: "20px 0px" })}
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  // position:absolute;
  // top:280px;
  // left:0;
  // margin-top: 30px;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: 0.5s ease;
    z-index:3;

  &:hover {
    background-color: #f0f0f0;
    color: black;
  }

  ${mobile({ marginTop: "5px", borderRadius: "5px" })}
`;
//#endregion

const Cart = () => {

  const cart = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const actualUserId = useSelector((state) => state.user?.currentUser?._id);
  const [Active, setActive] = useState(false);
  const [Active2, setActive2] = useState(false);
  const actualUserEmail = useSelector(
    (state) => state.user?.currentUser?.email
  );
  const [stripeToken, setStripeToken] = useState(null);
  const loggedIn = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "1px solid #fff",
    boxShadow: 24,
    p: 4,
  };
  let navigate = useNavigate();

//#region Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if(cart.total > 0){
      setOpen(true);
    }else{
      Swal.fire({
        position: "mid",
        icon: "info",
        title: "Oops! Tu carrito esta vacío.",
        showConfirmButton: false,
        timer: 1900,
      });
    }
  }
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [values, setValues] = useState({
    address: "",
    cp: "",
    city: "",
    other: "",
  });

//#endregion

//#region Login
  const handleLogin = () => {
    Swal.fire({
      position: "mid",
      icon: "info",
      title: "Primero debes iniciar sesion",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/auth/login");
  };
//#endregion

// Tomar inputs 
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

// Stripe token
  const onToken = (token) => {
    setStripeToken(token);
  };

  const productData = cart.products.map((p)=>({
    productId: p._id,
    title: p.title,
    quantity: p.quantity,
  }));

//#region Pago con Tarjeta
  useEffect(() => {
    const makeRequest = async () => {
      const res = await publicRequest.post("/checkout/payment", {
        tokenId: stripeToken.id,
        StripeEmail: stripeToken.email,
        amount: cart.total * 100,
        products: cart.products,
      });
      
      
      const order = await publicRequest.post("/orders/add", {
        userId: actualUserId,
        userEmail: actualUserEmail,
        products: productData,
        paymentType: "Tarjeta",
        amount: cart.total * 100,
        address: res.data,
        status: "success",
      });

     

      if (res.status === 200) {
        Swal.fire({
          position: "mid",
          icon: "success",
          title: "Pagado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/user/profile");
        dispatch(removeAllProducts());
       
      } else {
        Swal.fire({
          position: "mid",
          icon: "info",
          title: "No se pudo procesar el pago",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };
    stripeToken && cart.total >= 1 && makeRequest();
  }, [
    stripeToken,
    cart.total,
    navigate,
    cart,
    actualUserEmail,
    dispatch,
    actualUserId,
    productData
  ]);

//#endregion

//#region Pago en efectivo

    const handlePagoEfectivo = async (e) => {
      e.preventDefault();

      try {
        const order = await publicRequest.post("/orders/add", {
          userId: actualUserId,
          userEmail: actualUserEmail,
          products: productData,
          paymentType: "Efectivo",
          amount: cart.total * 100,
          address: values,
          status: "pending",
        });
  
        if (order.status === 200) {
          Swal.fire({
            position: "mid",
            icon: "success",
            title: "Pedido creado correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
  
          navigate("/user/profile");
          dispatch(removeAllProducts());
         
        } else {
          Swal.fire({
            position: "mid",
            icon: "info",
            title: "No se pudo procesar el pedido",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.log("Error al crear pedido: " + error);
      }
    
    };
//#endregion
  
const handleDeleteAll = () => {
  dispatch(removeAllProducts());
  setActive2(true);
  setTimeout(function () {
   setActive2(false);
  }, 1500);
}

// Quantity
// const handleQuantity = (type) => {
//   if (type === "dec") {
//     // quantity > 1 && setQuantity(quantity - 1);
//     dispatch(decreaseCart(product));
//   } else {
//     // setQuantity(quantity + 1);
//     dispatch(addProduct(cart));

//   }
// };
// Esta funcionaba parcialmente
// const handleDecrease = (product) => {
//     dispatch(decreaseCart(product));
// };
// const handleIncrease = (product) => {
//   dispatch(addToCart(product));
// };

const handleRemoveFromCart = (product) => {
  dispatch(removeFromCart(product));
  setActive(true);
    setTimeout(function () {
     setActive(false);
    }, 1500);
  
}

  return (
    <Container>
      <Announcement />
      <Navbar />
      <NavMenu />
      <Wrapper id="wrapper">
        <Title>Carrito de compras</Title>
        <Top>
        <Link to="/products"><TopButton>VER MÁS PRODUCTOS</TopButton></Link>
          <TopTexts>
            <TopText>Tu carrito ({cart.quantity})</TopText>
            <TopText onClick={handleDeleteAll}>Eliminar </TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                       {product.title}
                    </ProductName>
                    <ProductId>
                       {product.width}cm x {product.height}cm x{" "}
                      {product.depth}cm
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductName>
                      <Delete style={{cursor: 'pointer', color:'#0f0f0f',fontSize:'18px'}} onClick={() => handleRemoveFromCart(product)}/>
                    </ProductName>
                    
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    {/* <Remove style={{cursor: 'pointer'}} onClick={() => handleDecrease(product)} /> */}
                    <ProductName> Cantidad:
                    </ProductName>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    {/* <Add style={{cursor: 'pointer'}} onClick={() => handleIncrease(product)} /> */}
                    
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
            {
              Active && <Alert style={{marginTop: '10px'}} severity="success">Eliminado del carrito </Alert>
            }
              {
              Active2 && <Alert style={{marginTop: '10px'}} severity="success">Productos eliminados </Alert>
            }
          </Info>
          <Summary>
            
            <SummaryTitle>RESUMEN DEL PEDIDO</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            {loggedIn ? <Button onClick={handleOpen}>INICIAR COMPRA</Button> : <Button onClick={handleLogin}>INICIAR COMPRA</Button>}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Seleccione método de pago
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Button onClick={handleOpen2}>Efectivo</Button>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <StripeCheckout
                name="Carpinteria Rulo"
                image="https://firebasestorage.googleapis.com/v0/b/rulo-ecommerce.appspot.com/o/logo_rulo.jpeg?alt=media&token=2f016d66-15a7-4880-b85c-63681b8cf6f7"
                billingAddress
                shippingAddress
                description={`Total a pagar $${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <Button onClick={handleClose}>Tarjeta</Button>
              </StripeCheckout>
                </Typography>
              </Box>
            </Modal>
            {/* Modal pago en efectivo */}
            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Pagar al momento de la entrega 
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <label>Total a pagar ${cart.total}</label>
                {/* {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Producto:</b> {product.title}
                    </ProductName>
                    </Details>
                   </ProductDetail>
                   <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                   </Product>
                ))} */}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Input  name="address" type="text" placeholder="Direccion" onChange={onChange}/>
                <Input name="cp" type="text" placeholder="CP" onChange={onChange}/>
                <Input name="city" type="text" placeholder="Ciudad" onChange={onChange}/>
                <Input name="other" type="text" placeholder="Indicaciones" onChange={onChange}/>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Button onClick={handlePagoEfectivo}>Crear pedido</Button>
                </Typography>
              </Box>
            </Modal>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
