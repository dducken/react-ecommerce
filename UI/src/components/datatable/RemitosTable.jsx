import "./datatable.scss";
//Modal
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
//Others
import { DataGrid } from "@mui/x-data-grid";
import { adminOrderColumns, remitoColumns, userOrderColumns } from "../../data";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { mobile } from "../../responsive";
import Swal from "sweetalert2";
import { DeleteOutline, Edit, Visibility } from "@material-ui/icons";

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
const Logo = styled.img`
  width: 250px;
`;
const Select = styled.select`
  min-width: 200px;
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
  min-width: 150px;
  margin: 10px 10px 0px 0px;
  padding: 10px;
  font-size: 15px;
`;

const RemitosTable = () => {
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

   
  //Modal
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [remitoDate, setRemitoDate] = useState([]);
  const [remitoById, setRemitoById] = useState([]);
  const [remitoByIdFull, setRemitoByIdFull] = useState([]);

  //  Get remito by id modal Ver
  const handleOpen = async (id) => {
    setOpen(true);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/remitos/getbyid/${id}`
      );
      setRemitoByIdFull(res.data.remitos);
      setRemitoById(res.data.remitos.address);
      setRemitoDate(res.data.remitos.createdAt.slice(0, 10));
    } catch (err) {}
  };
  // Abrir modal para editar
  const handleOpenEdit = async (id) => {
    setOpen2(true);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/remitos/getbyid/${id}`
      );
      setRemitoByIdFull(res.data.remitos);
      setRemitoById(res.data.remitos.address);
      setRemitoDate(res.data.remitos.createdAt.slice(0, 10));

      
    } catch (err) {}
  };

  const handleClose = () => setOpen(false);
  const handleCloseEdit = () => setOpen2(false);

  // Get All Remitos
  const [remitos, setRemitos] = useState([]);

  useEffect(() => {
    const getRemitos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/remitos");
        setRemitos(res.data.remitos);
      } catch (err) {}
    };
    getRemitos();
  }, []);

  // Filas
  const remitoRows = remitos.map((p) => ({
    id: p._id,
    status: p.status === "success" ? "Entregado" : p.status === "canceled" ? "Cancelado" : p.status === "in progress" ? "En_Proceso" : "Pendiente",
    createdAt: p.createdAt.slice(0, 10),
    userName: p.userName,
    title: p.products.map((p) => p.title),
  }));
  // Columna Accion
  const actionColumn = [
    {
      field: "action",
      headerName: "Accion",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <button
              className="buttonVer"
              onClick={() => handleOpen(params.row.id)}
            >
              Ver
            </button> */}
            <Visibility
              className="productListDelete"
              onClick={() => handleOpen(params.row.id)}
            />
            <Edit
              className="productListDelete"
              onClick={() => handleOpenEdit(params.row.id)}
            />
            <DeleteOutline
              className="productListDelete"
              // onClick={() => handleDelete(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  const handleImprimir = async (e) => {
    e.preventDefault();
    
    window.print();
    setOpen(false);
  };

  // Tomar inputs del form
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //Handle Edit
  const handleEdit = (id) => {
    // e.preventDefault();
   setOpen2(false);

    Swal.fire({
      title: "Actualizar Remito",
      text: "Se va a actualizar el remito",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "green", //3085d6
      cancelButtonColor: "gray",
      confirmButtonText: "Actualizar",
    }).then((result) => {
      if (result.isConfirmed) {
         
        const res = axios.put(`http://localhost:5000/api/remitos/${id}`, inputs);

        if(inputs.status === 'success'){
          console.log("Success");
        }

        Swal.fire({
          position: "mid",
          icon: "success",
          title: "Remito actualizado",
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
    <div className="datatable">
      <div className="datatableTitle">
        Listado de remitos | ({remitos.length})
      </div>
      <DataGrid
        className="datagrid"
        rows={remitoRows}
        columns={remitoColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        // checkboxSelection
      />

      {/* Action Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Detalles del remito
            <Logo
              src="https://firebasestorage.googleapis.com/v0/b/rulo-ecommerce.appspot.com/o/logo_rulo.jpeg?alt=media&token=2f016d66-15a7-4880-b85c-63681b8cf6f7"
              alt="Carpinteria Rulo"
            ></Logo>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Fecha <br />
            <label>{remitoDate}</label>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Cliente <br />
            <label>{remitoByIdFull.userName}</label>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Direccion de entrega <br />
            <label>{remitoById.address}{remitoById.line1}, </label>
            <label>{remitoById.city} CP: {remitoById.cp}{remitoById.postal_code}</label><br/>
            <label>{remitoById.other ? `Indicaciones: ${remitoById.other}` : ''}</label>

          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick={(e) => handleImprimir(e)}>Imprimir</Button>
          </Typography>
        </Box>
      </Modal>
      {/* Edit Modal */}
      <Modal
        open={open2}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Modificar
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Fecha del remito <br />
            <Input value={remitoDate} disabled></Input>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Estado <br />
            <Select name="status" id="status" onChange={handleChange}>
              <Option value="pending" selected disabled>
                Seleccionar
              </Option>
              <Option value="pending">Pendiente</Option>
              <Option value="in progress">En proceso</Option>
              <Option value="success">Entregado</Option>
              <Option value="canceled">Cancelado</Option>
            </Select>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick={(e) => handleEdit(remitoByIdFull._id)}>Aceptar</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default RemitosTable;
