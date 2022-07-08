
import UserOrdersTable from "../../components/datatable/UserOrdersTable";
import "./profile.scss";
import Announcement from "../Announcement";
import styled from "styled-components";

import Navbar from "../Navbar";
import NavMenu from "../NavMenu";
import Footer from "../Footer";
import React, { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import PrevFooter from "../PrevFooter";
import { Box, Modal, Typography } from "@material-ui/core";
import { mobile } from "../../responsive";
import Swal from "sweetalert2";
import axios from "axios";

const Input = styled.input`
  min-width: 150px;
  margin: 10px 10px 5px 0px;
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


const Profile = () => {
    const userId = useSelector((state) => state.user?.currentUser?._id);
    const [user, setUser] = useState([]);


useEffect(() => {
        const makeRequest = async () => {
            const res = await publicRequest.get(`/users/get/${userId}`);
            
            if(res.status === 200){
                setUser(res.data.others);
                console.log(res.data.others);
            }
        }

        userId && makeRequest();
      }, [userId]);

    // Tomar inputs del form
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };

  //Modal
  const [open, setOpen] = React.useState(false);

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

  //  Open modal para editar
  const handleOpen =  () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  //Handle Edit
  const handleEdit = (id) => {
    // e.preventDefault();
   setOpen(false);

    Swal.fire({
      title: "Actualizar",
      text: "Se van a actualizar tus datos",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "green", //3085d6
      cancelButtonColor: "gray",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
         
        const res = axios.put(`http://localhost:5000/api/users/${id}`, inputs);

        Swal.fire({
          position: "mid",
          icon: "success",
          title: "Datos actualizados",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(function () {
          window.location.reload();
        }, 1600);
        
      }
    });
  };

console.log(inputs);

  return (
    <div>
      <Announcement/>
      <Navbar/>
      <NavMenu/>
      <div className="profile">
        <div className="singleContainer">
          <div className="top">
            <div className="left">
              <div className="editButton" onClick={handleOpen}>Editar</div>
              <h1 className="title">Mi perfil</h1>
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
                  <div className="detailItem">
                    <span className="itemKey">Contraseña:</span>
                    <span className="itemValue">****</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              {/* <List /> */}
              <UserOrdersTable/>
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
            Editar perfil <br/>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Usuario <br />
            <Input defaultValue={user.username} name="username" onChange={handleChange}></Input>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Email <br />
            <Input defaultValue={user.email} name="email" onChange={handleChange}></Input>
            
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Contraseña <br />
            <Input defaultValue="***" name="password" onChange={handleChange}></Input>
            
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick={(e) => handleEdit(user._id)}>Aceptar</Button>
          </Typography>
        </Box>
      </Modal>
          </div>
        </div>
      </div>
      <PrevFooter/>
      <Footer/>
    </div>
  );
};

export default Profile;
