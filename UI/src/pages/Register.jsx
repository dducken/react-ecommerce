import axios from "axios";
//Modal
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
//Others
import React, { useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavMenu from "../components/NavMenu";
import { Alert } from "@mui/material";
import FormInput from "../components/form/FormInput";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { mobile } from "../responsive";
import PrevFooter from "../components/PrevFooter";

//#region CSS
const FirstContainer = styled.div``;
const Container = styled.div`
  widht: 100vw;
  height: 85vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/4667852/pexels-photo-4667852.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load")
      center;
      // https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;

  ${mobile({ width: "70%"})}

`;
const B = styled.b`
 cursor:pointer;

`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;

  ${mobile({ fontSize: "20px"})}
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const ButtonContainer = styled.span`
  position: relative;
  width: 100%;
  height: 8vh;

  ${mobile({ height: "5vh"})}
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 13px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 0;
  position: absolute;
  top: 0;
  left: 30%;
  transition: 0.5s ease;

  &:hover {
    background-color: #e1f5f5;
    transform: scale(1.05);
    color: teal;
  }
`;
const Link = styled.a`
  text-decoration: underline;
  color: gray;
`;
const Subtitle = styled.span`
  font-size: 14px;
  margin: 20px 0px;
`;
const TermsButton = styled.button`
  background-color: transparent;
  border: none;
  font-weight: 500;
`;
 
//#endregion

const Register = () => {
  //Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {

    setOpen(true);
  }
  const handleClose = () => setOpen(false);
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

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();


  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Nombre",
      label: "Nombre",
      errorMessage: "Nombre invalido (minimo 3 caracteres)",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage: "Ingresa un email valido",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Contraseña",
      label: "Contraseña",
      errorMessage: "La contraseña no es valida (minimo 6 caracteres)",
      pattern: ".{6,16}$",
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirmar pass",
      label: "Confirmar pass",
      errorMessage: "Las contraseñas no coiciden!",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        JSON.stringify({ ...values }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      Swal.fire({
        position: "mid",
        icon: "success",
        title: "Registrado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(function () {
        navigate("/login");
      }, 1600);
      console.log(response.data);
    } catch (err) {
        Swal.fire({
            position: "mid",
            icon: "error",
            title: "Error intente nuevamente",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(function () {
            window.location.reload();
          }, 1600);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <FirstContainer>
      <Announcement />
      <Navbar />
      <NavMenu />
      <Container>
        <Wrapper className="container">
          <Title>CREAR UNA CUENTA</Title>
          <Form onSubmit={handleSubmit}>
            <div className="row">
             
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            </div>
            <div className="row">
              <div className="col-lg-12 p-3">
            <Agreement>
              Al crear una cuenta declaras que has leido los{" "}
              {/* <B onClick={handleOpen}>términos y condiciones</B> */}
              <TermsButton type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">términos y condiciones</TermsButton>

            </Agreement>

              </div>
            </div>
            <ButtonContainer>
              <Button>CREAR</Button>
            </ButtonContainer>

            <Subtitle>
              Ya tenes cuenta? <Link href="/login">Iniciar Sesión</Link>
            </Subtitle>
          </Form>
        </Wrapper>

 
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Términos y condiciones del servicio</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <p>
¡Bienvenidos a carpinteriarulo!

Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de Carpinteria Rulo, ubicado en carpinteriarulo.net.

Al acceder a este sitio web, asumimos que acepta estos términos y condiciones. No continúe utilizando carpinteriarulo si no está de acuerdo con todos los términos y condiciones establecidos en esta página.
<p>
Cookies:
El sitio web utiliza cookies para ayudar a personalizar su experiencia en línea. Al acceder a carpinteriarulo, aceptaste utilizar las cookies requeridas.

Una cookie es un archivo de texto que un servidor de páginas web coloca en su disco duro. Las cookies no se pueden utilizar para ejecutar programas o enviar virus a su computadora. Las cookies se le asignan de forma única y solo puede leerlas un servidor web en el dominio que le emitió la cookie.

Podemos usar cookies para recopilar, almacenar y rastrear información con fines estadísticos o de marketing para operar nuestro sitio web. Tiene la capacidad de aceptar o rechazar cookies opcionales. Hay algunas cookies requeridas que son necesarias para el funcionamiento de nuestro sitio web. Estas cookies no requieren su consentimiento ya que siempre funcionan. Tenga en cuenta que al aceptar las Cookies requeridas, también acepta las Cookies de terceros, que pueden usarse a través de servicios proporcionados por terceros si utiliza dichos servicios en nuestro sitio web, por ejemplo, una ventana de visualización de video proporcionada por terceros e integrada. en nuestro sitio web.
</p>
Licencia:
A menos que se indique lo contrario, Carpinteria Rulo y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material de carpinteriarulo. Todos los derechos de propiedad intelectual están reservados. Puede acceder a esto desde carpinteriarulo para su uso personal sujeto a las restricciones establecidas en estos términos y condiciones.
<p>
No debes:

Copiar o republicar material de carpinteriarulo
Vender, alquilar o sublicenciar material de carpinteriarulo
Reproducir, duplicar o copiar material de carpinteriarulo
Redistribuir contenido de carpinteriarulo
Este Acuerdo comenzará en la fecha del mismo.

Partes de este sitio web ofrecen a los usuarios la oportunidad de publicar e intercambiar opiniones e información en ciertas áreas del sitio web. Carpinteria Rulo no filtra, edita, publica o revisa los Comentarios antes de su presencia en el sitio web. Los comentarios no reflejan los puntos de vista y opiniones de Carpinteria Rulo, sus agentes y/o afiliados. Los comentarios reflejan los puntos de vista y las opiniones de la persona que publica sus puntos de vista y opiniones. En la medida permitida por las leyes aplicables, Carpinteria Rulo no será responsable de los Comentarios ni de ninguna obligación, daño o gasto causado y/o sufrido como resultado de cualquier uso y/o publicación y/o aparición de los Comentarios en este sitio web.

Carpinteria Rulo se reserva el derecho de monitorear todos los Comentarios y eliminar cualquier Comentario que pueda considerarse inapropiado, ofensivo o que cause el incumplimiento de estos Términos y Condiciones.
</p>
<p>
Usted garantiza y declara que:

Tiene derecho a publicar los Comentarios en nuestro sitio web y tiene todas las licencias y consentimientos necesarios para hacerlo;
Los Comentarios no invaden ningún derecho de propiedad intelectual, incluidos, entre otros, derechos de autor, patentes o marcas registradas de terceros;
Los Comentarios no contienen ningún material difamatorio, calumnioso, ofensivo, indecente o ilegal de otro modo, que es una invasión de la privacidad.
Los Comentarios no se utilizarán para solicitar o promover negocios o costumbres o presentar actividades comerciales o actividades ilegales.
Por la presente, otorga a Carpinteria Rulo una licencia no exclusiva para usar, reproducir, editar y autorizar a otros a usar, reproducir y editar cualquiera de sus Comentarios en cualquiera y todas las formas, formatos o medios.
</p>
Hipervínculos a nuestro contenido:
Las siguientes organizaciones pueden vincular a nuestro sitio web sin aprobación previa por escrito:

<p>
Agencias gubernamentales;
Los motores de búsqueda;
Organizaciones de noticias;
Los distribuidores de directorios en línea pueden vincularse a nuestro sitio web de la misma manera que vinculan a los sitios web de otras empresas enumeradas; y
Empresas acreditadas en todo el sistema, excepto las que solicitan organizaciones sin fines de lucro, centros comerciales de caridad y grupos de recaudación de fondos de caridad que no pueden tener hipervínculos a nuestro sitio web.
Estas organizaciones pueden vincular a nuestra página de inicio, publicaciones u otra información del sitio web siempre que el enlace: (a) no sea engañoso de ninguna manera; (b) no implica falsamente patrocinio, respaldo o aprobación de la parte vinculada y sus productos y/o servicios; y (c) encaja dentro del contexto del sitio de la parte vinculada.
</p>
<p>
Podemos considerar y aprobar otras solicitudes de enlace de los siguientes tipos de organizaciones:

fuentes de información comercial y/o de consumo comúnmente conocidas;
sitios de la comunidad dot.com;
asociaciones u otros grupos que representen organizaciones benéficas;
distribuidores de directorios en línea;
portales de internet;
empresas de contabilidad, derecho y consultoría; y
instituciones educativas y asociaciones comerciales.
Aprobaremos las solicitudes de enlace de estas organizaciones si decidimos que: (a) el enlace no nos haría ver desfavorablemente a nosotros mismos oa nuestros negocios acreditados; (b) la organización no 
tiene registros negativos con nosotros; (c) el beneficio para nosotros de la visibilidad del hipervínculo compensa la ausencia de Carpinteria Rulo; y (d) el enlace está en el contexto de información general de recursos.

Estas organizaciones pueden vincular a nuestra página de inicio siempre que el enlace: (a) no sea engañoso de ninguna manera; (b) no implica falsamente patrocinio, respaldo o aprobación de la parte vinculada y sus productos o servicios; y (c) encaja dentro del contexto del sitio de la parte vinculada.

Si usted es una de las organizaciones enumeradas en el párrafo 2 anterior y está interesado en vincularse a nuestro sitio web, debe informarnos enviando un correo electrónico a Carpinteria Rulo. Incluya su nombre, el nombre de su organización, la información de contacto, así como la URL de su sitio, una lista de las URL desde las que pretende vincular a nuestro sitio web y una lista de las URL de nuestro sitio a las que le gustaría Enlace. Espere 2-3 semanas para una respuesta.

Las organizaciones aprobadas pueden tener hipervínculos a nuestro sitio web de la siguiente manera:

Mediante el uso de nuestro nombre corporativo; o
Mediante el uso del localizador uniforme de recursos al que se vincula; o
Usar cualquier otra descripción de nuestro sitio web al que se vincula que tenga sentido dentro del contexto y el formato del contenido en el sitio de la parte vinculada.
No se permitirá el uso del logotipo de Carpinteria Rulo u otra obra de arte para vincular en ausencia de un acuerdo de licencia de marca registrada.
</p>
<p>
Responsabilidad por el contenido:
No seremos responsables de ningún contenido que aparezca en su sitio web. Usted acepta protegernos y defendernos contra todos los reclamos que se presenten en su sitio web. Ningún enlace debe aparecer en ningún sitio web que pueda interpretarse como calumnioso, obsceno o criminal, o que infrinja, de otro modo viole o promueva la infracción u otra violación de los derechos de terceros.
</p>
<p>
Reserva de Derechos:
Nos reservamos el derecho de solicitarle que elimine todos los enlaces o cualquier enlace particular a nuestro sitio web. Usted aprueba eliminar inmediatamente todos los enlaces a nuestro sitio web a pedido. También nos reservamos el derecho de modificar estos términos y condiciones y su política de vinculación en cualquier momento. Al vincularse continuamente a nuestro sitio web, usted acepta estar sujeto y seguir estos términos y condiciones de vinculación.
</p>
<p>
Eliminación de enlaces de nuestra web:
Si encuentra algún enlace en nuestro sitio web que sea ofensivo por cualquier motivo, puede contactarnos e informarnos en cualquier momento. Consideraremos solicitudes para eliminar enlaces, pero no estamos obligados a hacerlo ni a responderle directamente.
</p>
No garantizamos que la información de este sitio web sea correcta. No garantizamos su integridad o exactitud, ni prometemos asegurarnos de que el sitio web permanezca disponible o que el material del sitio web se mantenga actualizado.
<p>
Descargo de responsabilidad:
En la máxima medida permitida por la ley aplicable, excluimos todas las representaciones, garantías y condiciones relacionadas con nuestro sitio web y el uso de este sitio web. Nada en este descargo de responsabilidad:

limitar o excluir nuestra o su responsabilidad por muerte o lesiones personales;
limitar o excluir nuestra o su responsabilidad por fraude o tergiversación fraudulenta;
limitar cualquiera de nuestras responsabilidades o las suyas de cualquier manera que no esté permitida por la ley aplicable; o
excluir cualquiera de nuestras o sus responsabilidades que no puedan ser excluidas bajo la ley aplicable.
Las limitaciones y prohibiciones de responsabilidad establecidas en esta Sección y en otras partes de este descargo de responsabilidad: (a) están sujetas al párrafo anterior; y (b) rigen todas las responsabilidades que surjan en virtud de la exención de responsabilidad, incluidas las responsabilidades que surjan por contrato, agravio y por incumplimiento de obligaciones legales.

Siempre que el sitio web y la información y los servicios en el sitio web se proporcionen de forma gratuita, no seremos responsables de ninguna pérdida o daño de ningún tipo.
</p>
      </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Entendido</button>
      </div>
    </div>
  </div>
</div>
      </Container>
      <PrevFooter/>
      <Footer />
    </FirstContainer>
  );
};

export default Register;
