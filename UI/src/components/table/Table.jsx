import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const List = ({orders}) => {
  // const location = useLocation();
  // const userId = location.pathname.split("/")[3];
  // const [orders, setOrders] = useState([]);

console.log(orders);

  const rows = orders.map((o)=> (
    {
    id: o._id,
    product: o.products.map((p)=>(p.title)),
    img: "https://www.posberry.com/order/noimage.jpg",
    user: o.userEmail,
    date: o.createdAt.slice(0,10),
    amount: o.amount / 100,
    method: o.paymentType,
    status: o.status==="pending" ? "Pendiente" : "Aprobado",
  }))

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell className="tableCell">ID</TableCell> */}
            <TableCell className="tableCell">Producto</TableCell>
            <TableCell className="tableCell">Cliente</TableCell>
            <TableCell className="tableCell">Fecha</TableCell>
            <TableCell className="tableCell">Monto</TableCell>
            <TableCell className="tableCell">Forma de pago</TableCell>
            <TableCell className="tableCell">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {/* <TableCell>{row.id}</TableCell> */}
              <TableCell className="tableCell">
                  <div className="cellWrapper">
                      <img src={row.img} alt="" className="image" />
                      {row.product}
                  </div>
              </TableCell>
              <TableCell className="tableCell">{row.user}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
