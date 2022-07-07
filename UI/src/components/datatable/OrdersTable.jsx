import "./datatable.scss";
//Modal
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
//Others
import { DataGrid } from "@mui/x-data-grid";
import { adminOrderColumns, userOrderColumns } from "../../data";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { mobile } from "../../responsive";
import Swal from "sweetalert2";

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
const OrdersTable = () => {
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

  const navigate = useNavigate();
  //Modal
  const [open, setOpen] = React.useState(false);
  const [orderById, setOrderById] = useState([]);
  const [orderByIdFull, setOrderByIdFull] = useState([]);


  const handleOpen = async (id) => {
    setOpen(true);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders/getbyid/${id}`
      );
      setOrderById(res.data.orders.products);
      setOrderByIdFull(res.data.orders);
  
    } catch (err) {}
  };

  const handleClose = () => setOpen(false);

  // Get All Orders
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders");
        setOrders(res.data.orders);
        
      } catch (err) {}
    };
    getOrders();
  }, []);

  // Filas
  const ordersRows = orders.map((p) => ({
    id: p._id,
    title: p.products.map((p) => p.title),
    userEmail: p.userEmail,
    createdAt: p.createdAt.slice(0, 10),
    amount: "$" + p.amount / 100,
    paymentType: p.paymentType,
    quantity: p.products.map((p) => p.quantity),
    status: p.status === "success" ? "Pagado" : p.status === "canceled" ? "Cancelado" : "Pendiente",
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
            <button
              className="buttonVer"
              onClick={() => handleOpen(params.row.id)}
            >
              Ver
            </button>
            <div className="buttonEliminar">Eliminar</div>
          </div>
        );
      },
    },
  ];
  // Crear remito
 
    const addRemito = async () => {
      try {
        const getUser = await axios.get(`http://localhost:5000/api/users/get/${orderByIdFull.userId}`);
        const username = getUser.data.others.username;

        const res = await axios.post("http://localhost:5000/api/remitos/add",{
            userId: orderByIdFull.userId,
            userName: username,
            products: orderById,
            address: orderByIdFull.address,
            
          });
          if (res.status === 200) {
            Swal.fire({
              position: "mid",
              icon: "success",
              title: "Remito creado correctamente",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout (function() {
              navigate("/admin/remitos");
              // window.location.reload();
            }, 1600);
          }else {
            Swal.fire({
              position: "mid",
              icon: "info",
              title: "No se pudo crear el remito",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        
        
      } catch (err) {
        console.log(err);
      }
    };
   

  const handleRemito = async (e) => {
    setOpen(false);
    e.preventDefault();

    Swal.fire({
      title: 'Estas seguro?',
      text: "Se esta por crear un remito para el pedido seleccionado",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6', //3085d6
      cancelButtonColor: 'gray',
      confirmButtonText: 'Crear'
    }).then((result) => {
      if (result.isConfirmed) {
        addRemito();
      }
    })
    

    // window.print();
  };

  
  

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Listado de pedidos | ({orders.length})
       
      </div>
      <DataGrid
        className="datagrid"
        rows={ordersRows}
        columns={adminOrderColumns.concat(actionColumn)}
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
            Detalles del pedido
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Producto/s:{" "}
            {orderById.map((p) => (
              <label>{p.title}. </label>
            ))}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Cantidad:{" "}
            {orderById.map((p) => (
              <label>{p.quantity}. </label>
            ))}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Cliente:{" "}
              <label>{orderByIdFull.userEmail}. </label>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick={(e) => handleRemito(e)}>Crear Remito</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default OrdersTable;
