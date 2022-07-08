import "./datatable.scss";
//Modal
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
//Others
import { DataGrid } from "@mui/x-data-grid";
import { userOrderColumns } from "../../data";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { deleteProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";
const Swal = require("sweetalert2");

const OrderTable = () => {
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
  const [orderById, setOrderById] = useState([]);
  const handleOpen = async (id) => {
    setOpen(true);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders/getbyid/${id}`
      );
      setOrderById(res.data.orders.products);
      
    } catch (err) {}
  };
  const handleClose = () => setOpen(false);

  const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.user?.currentUser?._id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get Orders
  useEffect(() => {
    const getUserOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/orders/get/${userId}`
        );
        setOrders(res.data.orders);
       
      } catch (err) {}
    };
    getUserOrders();
  }, [userId]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Se va a cancelar la compra",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", //3085d6
      cancelButtonColor: "gray",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        const product = {
          status: "canceled"
        }
        const res = publicRequest.put(`/orders/${id}`,product);

        Swal.fire({
          position: "mid",
          icon: "success",
          title: "Compra cancelada",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(function () {
          window.location.reload();
        }, 1600);
      }
    });
  };
  //concatenar los productos
  //   const productNames = orders.products.map((p)=>{

  //   })
  // Filas
  const orderRows = orders.map((p) => ({
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
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button
              className="buttonVer"
              onClick={() => handleOpen(params.row.id)}
            >
              Ver
            </button>
             {params.row.status !== "Cancelado" && params.row.status !== "Pagado" && <button
              className="buttonEliminar"
              onClick={() => handleDelete(params.row.id)}
            >
              Cancelar
            </button>}
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Historial de compras | ({orders.length})
        <Link
          to="/products"
          style={{ textDecoration: "none" }}
          className="link"
        >
          Comprar más
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={orderRows}
        columns={userOrderColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        // checkboxSelection
      />
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
            {/* Productos: {orderById.map((p)=>(
                  <span>{p.products.map((p)=>p.title.concat(" | "))}</span>
                ))} */}
            Producto/s:{" "}
            {orderById.map((p) => (
              // <input type="text" value={p.title} disabled/>
              <label>{p.title}, </label>
            ))}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Cantidad:{" "}
            {orderById.map((p) => (
              <label>{p.quantity}, </label>
            ))}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default OrderTable;
