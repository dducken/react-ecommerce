import React, { useEffect, useState } from "react";
//Modal
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
//Others
import { useLocation } from "react-router-dom";
import AnnouncementAdmin from "../../components/admin/AnnouncementAdmin";
import Sidebar from "../../components/sidebar/Sidebar";
import List from "../../components/table/Table";
import { publicRequest, userRequest } from "../../requestMethods";
import "./single.scss";
import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";
import { mobile } from "../../responsive";


const Select = styled.select`
  min-width: 275px;
  margin: 5px 10px 0px 0px;
  padding: 10px;
  font-size: 15px;
`;
const Option = styled.option`
  color: gray;
  font-size: 15px;
  min-width: 200px;
  margin: 5px 10px 0px 0px;
  padding: 10px;
`;
const Input = styled.input`
  min-width: 250px;
  margin: 10px 10px 0px 0px;
  padding: 10px;
  font-size: 15px;
`;
const Button = styled.button`
  width: 100%;
  margin-top: 30px;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: 0.5s ease;

  &:hover {
    background-color: #f0f0f0;
    color: black;
  }

  ${mobile({ marginTop: "5px", borderRadius: "5px" })}
`;

const Single = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState([]);
  const [editUser, setEditUser] = useState([]);


  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "1px solid #fff",
    boxShadow: 24,
    p: 4,
  };

   
  //Modal
  const [open, setOpen] = React.useState(false);

   // Tomar inputs del form
   const [inputs, setInputs] = useState({});

   const handleChange = (e) => {
     setInputs((prev) => {
       return { ...prev, [e.target.name]: e.target.value };
     });
   };

  //Get by user
  useEffect(() => {
    const makeRequest = async () => {
      const res = await publicRequest.get(`/users/get/${userId}`);

      if (res.status === 200) {
        setUser(res.data.others);
      }
    };

    userId && makeRequest();
  }, [userId]);

    // Get Orders
    useEffect(() => {
      const getUserOrders = async () => {
        try {
          const res = await userRequest.get(
            `http://localhost:5000/api/orders/get/${userId}`
          );
          setOrders(res.data.orders);
        } catch (err) {}
      };
      getUserOrders();
    }, [userId]);

 //  Get user by id 
 const handleOpen = async () => {
  setOpen(true);

  try {
    const res = await axios.get(
      `http://localhost:5000/api/users/get/${userId}`
    );
    setEditUser(res.data.others);
    console.log(res.data.others);
    
  } catch (err) {}
};

const handleClose = () => setOpen(false);

  //Handle Edit
  const handleEdit = (id) => {
    // e.preventDefault();
   setOpen(false);

    Swal.fire({
      title: "Actualizar usuario",
      text: "Se va a actualizar el usuario",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "green", //3085d6
      cancelButtonColor: "gray",
      confirmButtonText: "Actualizar",
    }).then((result) => {
      if (result.isConfirmed) {
         
        const res = userRequest.put(`http://localhost:5000/api/users/${id}`, inputs);

        Swal.fire({
          position: "mid",
          icon: "success",
          title: "Usuario actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(function () {
          window.location.reload();
        }, 1600);
        
      }
    });
  };
  
  return (
    <div>
      <AnnouncementAdmin />
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <div className="top">
            <div className="left">
              <div className="editButton" onClick={handleOpen}>Editar</div>
              <h1 className="title">Informacion</h1>
              <div className="item">
                <img
                  src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png"
                  alt=""
                  className="itemImg"
                />

                <div className="details">
                  <h1 className="itemTitle">{user.username}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{user.email}</span>
                  </div>
                  {/* <div className="detailItem">
                    <span className="itemKey">Direccion:</span>
                    <span className="itemValue">Nueva Cordoba</span>
                  </div> */}
                  <div className="detailItem">
                    <span className="itemKey">Admin:</span>
                    <span className="itemValue">{user.isAdmin ? "Si" : "No"}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              {/* <Chart
                aspect={3 / 1}
                title="Compras del usuario (Ultimos 6 meses)"
              /> */}
              <List orders={orders}/>
            </div>
          </div>

          {/* <div className="bottom">
            <h1 className="title">Compras recientes</h1>

            <List />
          </div> */}
        </div>
      </div>
      {/* Edit Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editar usuario
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Nombre <br />
            <Input name="username" defaultValue={editUser?.username} onChange={handleChange}/>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Email <br />
            <Input name="email" defaultValue={editUser?.email} onChange={handleChange}/>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Administrador <br />
            <Select name="isAdmin" id="isAdmin" defaultValue={editUser?.isAdmin} onChange={handleChange}>
            <Option selected disabled>
                Seleccionar
              </Option>
              <Option value="true">
                Si
              </Option>
              <Option value="false">No</Option>
            </Select>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick={(e) => handleEdit(userId)}>Aceptar</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Single;
