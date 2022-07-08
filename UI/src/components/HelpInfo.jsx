import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 45px 180px 80px 180px;
  display: flex;
  flex-wrap: wrap;
  // justify-content: inline-block;
`;
const TitleContainer = styled.div`
  text-align: center;
  margin: 20px 0;
  float: left;
  width: 100%;
`;
const Title = styled.h1`
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
const TitleLine = styled.hr`
  display: block;
  overflow: hidden;
  margin: -31px 190px 5px 190px; //estaba en -28px
  border-top: 1px solid #040404;
  opacity: 1;
`;
const Subtitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
  // padding: 15px 25px 0 186px;
  font-weight: normal;
  // display: inline-block;
`;
const Subtitle2 = styled.div`
  width: 100%;
  margin-top: 30px;
  font-size: 20px;
  font-weight: 500;
  font-weight: normal;
  justify-content: center;
`;
const P = styled.p`
  font-size: 16px;
`;
const Em = styled.em``;
const TextContainer = styled.div``;

const HelpInfo = () => {
  return (
    <div>
      <TitleContainer>
        <Title>FAQ</Title>
        <TitleLine />
      </TitleContainer>
      {/* <Subtitle>PREGUNTAS Y RESPUESTAS! ✨</Subtitle> */}
      {/* <Container> */}
      {/* Pregunta 1 */}
      {/* <Subtitle2><strong>1. Como realizar una compra</strong></Subtitle2> */}
      {/* <TextContainer>
        <P>
            <Em>Primero debes seleccionar el producto que quieras comprar y añadirlo a tu carrito de compras.</Em>
        </P>
        <P>
            <Em>Una vez tengas los productos que quieras compras en tu carrito, al dar click en el boton <b>Iniciar Compra</b>, te llevara a iniciar sesion si es que no iniciaste sesión todavia.</Em>
        </P>
        <P>
            <Em>Cuando hayas iniciado sesion o registrado tu usuario, ya podras seleccionar un metodo de pago para llevar a cabo la compra. </Em>
        </P>
        <P>
            <Em>Selecciona tu metodo de pago de preferencia para proceder con el registro del pedido. </Em>
        </P>
        <P>
            <Em>Una vez que hayas registrado el pedido, tu compra se estara preparando para ser entregada! ✨  </Em>
        </P>
        </TextContainer> */}

      {/* Pregunta 2 */}

      {/* <Subtitle2><strong>2. Como contactar con nosotros</strong></Subtitle2>
        <TextContainer>
        <P>
            <Em>Podes hacerlo por nuestro instagram <strong>@carpinteriarulo</strong> o por gmail <strong>carpinteriarulo@gmail.com</strong>.</Em>
        </P>
        <P>
            <Em>Hablanos!</Em>
        </P>
        
        </TextContainer> */}

      {/* Pregunta 3 */}

      {/* <Subtitle2><strong>3. Puedo pedir un presupuesto?</strong></Subtitle2>
        <TextContainer>
        <P>
            <Em>Claro que si! consultanos sin cargo por nuestras redes. 😊​</Em>
        </P>
        
        </TextContainer> */}

      {/* Pregunta 4 */}

      {/* <Subtitle2><strong>4. Puedo cancelar mi compra?</strong></Subtitle2>
        <TextContainer>
        <P>
            <Em>Por supuesto, siempre que el pedido haya sido realizado mediante el pago en efectivo, en tu perfil podras realizar dicha acción. ​</Em>
        </P>
        
        </TextContainer> */}
      {/* </Container> */}
      <div className="container col-lg-12 py-5">
        <div className="row">
          <div className="col-sm-2 col-md-2 col-lg-1"></div>
          <div className="col-sm-9 col-md-9 col-lg-5 mt-3">
            <Subtitle>PREGUNTAS Y RESPUESTAS! ✨</Subtitle>
          </div>
          <div className="col-sm-1 col-md-1 col-lg-7"></div>
        </div>
        {/* Primero */}
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10 mt-3">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    <strong>1. Como realizar una compra</strong>
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body">
                    <P>
                      <Em>
                        Primero debes seleccionar el producto que quieras
                        comprar y añadirlo a tu carrito de compras.
                      </Em>
                    </P>
                    <P>
                      <Em>
                        Una vez tengas los productos que quieras compras en tu
                        carrito, al dar click en el boton <b>Iniciar Compra</b>,
                        te llevara a iniciar sesion si es que no iniciaste
                        sesión todavia.
                      </Em>
                    </P>
                    <P>
                      <Em>
                        Cuando hayas iniciado sesion o registrado tu usuario, ya
                        podras seleccionar un metodo de pago para llevar a cabo
                        la compra.{" "}
                      </Em>
                    </P>
                    <P>
                      <Em>
                        Selecciona tu metodo de pago de preferencia para
                        proceder con el registro del pedido.{" "}
                      </Em>
                    </P>
                    <P>
                      <Em>
                        Una vez que hayas registrado el pedido, tu compra se
                        estara preparando para ser entregada! ✨{" "}
                      </Em>
                    </P>
                  </div>
                </div>
              </div>

              {/* Pregunta 2 */}

              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingTwo">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    <strong>2. Como contactar con nosotros</strong>
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body">
                    <P>
                      <Em>
                        Podes hacerlo por nuestro instagram{" "}
                        <strong>@carpinteriarulo</strong> o por gmail{" "}
                        <strong>carpinteriarulo@gmail.com</strong>.
                      </Em>
                    </P>
                    <P>
                      <Em>Hablanos!</Em>
                    </P>
                  </div>
                </div>
              </div>

              {/* Pregunta 3 */}

              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingThree">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    <strong>3. Puedo pedir un presupuesto?</strong>
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body">
                    <P>
                      <Em>
                        Claro que si! consultanos sin cargo por nuestras redes.
                        😊​
                      </Em>
                    </P>
                  </div>
                </div>
              </div>
              {/* Pregunta 4 */}
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingFour">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    <strong>4. Puedo cancelar mi compra?</strong>
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-headingFour"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body">
                    <P>
                      <Em>
                        Por supuesto, siempre que el pedido haya sido realizado
                        mediante el pago en efectivo, en tu perfil podras
                        realizar dicha acción. ​
                      </Em>
                    </P>
                  </div>
                </div>
              </div>
             
            </div>
          </div>
          <div className="col-1"></div>
        </div>
        {/* Segundo */}
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10 mt-3">
            <div class="accordion accordion-flush" id="accordion2">

              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-primerHead">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-ask-1"
                    aria-expanded="false"
                    aria-controls="flush-ask-1"
                  >
                    <strong>5. Es necesaria la creacion de una cuenta?</strong>
                  </button>
                </h2>
                <div
                  id="flush-ask-1"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-primerHead"
                  data-bs-parent="#accordion2"
                >
                  <div class="accordion-body">
                    <P>
                      <Em>
                        Si tu objetivo es adquirir productos desde esta página web, el tener una cuenta va a ser fundamental para poder saber quien realizo la compra y guardar tu historial de compras.
                      </Em>
                    </P>
                    
                  </div>
                </div>
              </div>
              
              {/* Pregunta 2 */}

              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-segundoHead">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-ask-2"
                    aria-expanded="false"
                    aria-controls="flush-ask-2"
                  >
                    <strong>6. Qué metodos de pagos tienen?</strong>
                  </button>
                </h2>
                <div
                  id="flush-ask-2"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-segundoHead"
                  data-bs-parent="#accordion2"
                >
                  <div class="accordion-body">
                    <P>
                      <Em>
                        Los métodos de pago disponibles actualmente son: <b>efectivo</b> al momento de la entrega o por <b>tarjeta</b> de débito o crédito.
                      </Em>
                    </P>
      
                  </div>
                </div>
              </div>

              {/* Pregunta 3 */}

              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-tercerHead">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-ask-3"
                    aria-expanded="false"
                    aria-controls="flush-ask-3"
                  >
                    <strong>7. Hacen envíos a domicilio?</strong>
                  </button>
                </h2>
                <div
                  id="flush-ask-3"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-tercerHead"
                  data-bs-parent="#accordion2"
                >
                  <div class="accordion-body">
                    <P>
                      <Em>
                        Por supuesto! consultanos sin cargo por nuestras redes.
                        😊​
                      </Em>
                    </P>
                  </div>
                </div>
              </div>
              {/* Pregunta 4 */}
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-cuartoHead">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-ask-4"
                    aria-expanded="false"
                    aria-controls="flush-ask-4"
                  >
                    <strong>8. Que precio tiene el envio a domicilio?</strong>
                  </button>
                </h2>
                <div
                  id="flush-ask-4"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-ask-4"
                  data-bs-parent="#accordion2"
                >
                  <div class="accordion-body">
                    <P>
                      <Em>
                        El precio varia segun tu localidad, por el momento comunicate con nosotros via <b>WhatsApp</b> 351999999 o por <b>Instagram</b> @carpinteriarulo
                      </Em>
                    </P>
                  </div>
                </div>
              </div>
            
            </div>
          </div>
          <div className="col-1"></div>
        </div>

      </div>
    </div>
  );
};

export default HelpInfo;
