import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 45px 180px 80px 180px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
  margin: -31px 190px 5px 190px;
  border-top: 1px solid #040404;
  opacity:1;
`;
const Subtitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
  // padding: 15px 25px 0 186px;
  font-weight: normal;
  display: inline-block;
 
`;
const P = styled.p`
  font-size: 16px;
  
 
 
`;
const Em = styled.em`
 
 
`;

const AboutInfo = () => {
  return (
    <div>
      <TitleContainer>
        <Title>Nosotros</Title>
        <TitleLine />
      </TitleContainer>
        {/* <Subtitle>
        ¡BIENVENIDOS! 🤩
        </Subtitle>
      <Container>
        <P>
            <Em>Somos Paulino, Tamara, Marta y Paulo creadores del emprendendimiento <b>Carpinteria Rulo</b> ✨</Em>
        </P>
        <P>
            <Em>Un emprendimiento que nació en plena pandemia con el objetivo de llegar a todos sus hogares desde 2020 y sigue creciendo con mucho esfuerzo y amor, haciendo lo que nos apasiona dia a dia.</Em>
        </P>
        <P>
            <Em>Nuestra filosofía a la hora de diseñar y fabricar un mueble, principalmente es la <b>CALIDAD, la FUNCIONALIDAD, el DISEÑO y la DURACIÓN</b> del mismo. </Em>
        </P>
        <P>
            <Em>Cada material que usamos tiene una gran historia atrás, horas de optimización, horas de corte, horas de pegado, horas de lijado y horas de armado; para que llegue a cada uno de nuestros clientes el mueble de sus sueños.-  </Em>
        </P>
        <P>
            <Em>Te invitamos a que nos acompañes en cada uno de nuestros avances ✨  </Em>
        </P>
      </Container> */}
      <div className="container col-lg-12 py-5">
        <div className="row">
        <div className="col-sm-2 col-md-2 col-lg-1"></div>
          <div className="col-sm-9 col-md-9 col-lg-5 mt-3">
            <Subtitle>¡BIENVENIDOS! 🤩</Subtitle>
          </div>
          <div className="col-sm-1 col-md-1 col-lg-7"></div>
        </div>

        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-10 mt-5">
          <P>
            <Em>Somos Paulino, Tamara, Marta y Paulo creadores del emprendendimiento <b>Carpinteria Rulo</b> ✨</Em>
        </P>
        <P>
            <Em>Un emprendimiento que nació en plena pandemia con el objetivo de llegar a todos sus hogares desde 2020 y sigue creciendo con mucho esfuerzo y amor, haciendo lo que nos apasiona dia a dia.</Em>
        </P>
        <P>
            <Em>Nuestra filosofía a la hora de diseñar y fabricar un mueble, principalmente es la <b>CALIDAD, la FUNCIONALIDAD, el DISEÑO y la DURACIÓN</b> del mismo. </Em>
        </P>
        <P>
            <Em>Cada material que usamos tiene una gran historia atrás, horas de optimización, horas de corte, horas de pegado, horas de lijado y horas de armado; para que llegue a cada uno de nuestros clientes el mueble de sus sueños.-  </Em>
        </P>
        <P>
            <Em>Te invitamos a que nos acompañes en cada uno de nuestros avances ✨  </Em>
        </P>
          </div>
          <div className="col-lg-1"></div>

        </div>
      </div>
    </div>
  );
};

export default AboutInfo;
