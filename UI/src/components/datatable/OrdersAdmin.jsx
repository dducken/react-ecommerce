import "./datatable.scss";

//Others
import { DataGrid } from "@mui/x-data-grid";
import { adminOrderColumns } from "../../data";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { mobile } from "../../responsive";
import Swal from "sweetalert2";
import {CSVLink} from "react-csv";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import SearchUser from "../search/SearchUser";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const Button = styled.button`
  width: 100px;
  // margin-top: 15px;
  margin-left: 100px;
  padding: 10px 25px;
  background-color: #0f0f0f;
  color: white;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid;
  transition: 0.5s ease;
  font-size:15px;


  &:hover {
    background-color: #fff;
    color: black;
  }

  ${mobile({ marginTop: "5px", borderRadius: "5px" })}
`;
const ButtonExportar = styled.button`
  width: 100px;
  // margin-top: 15px;
  margin-left: 10px;
  padding: 10px 25px;
  background-color: #fff;
  color: black;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid;
  transition: 0.5s ease;
  font-size:15px;

  &:hover {
    background-color: #0f0f0f;
    color: white;
  }

  ${mobile({ marginTop: "5px", borderRadius: "5px" })}
`;
const ButtonContainer = styled.div`
 width: 100%;
 display:flex;
 align-items: center;
 justify-content:center;
 margin-bottom: 40px;
`;
const Input = styled.input`
  
  width: 100px;
  margin: 0 30px 0 30px;
  padding: 10px;
  font-size: 13px;

`;
const Select = styled.select`
  width: 110px;
  margin: 0 30px 0 30px;

  padding: 10px;
  font-size: 13px;
`;
const Option = styled.option`
  color: gray;
  font-size: 13px;
  width: 100px;
  padding: 10px;
`;
const Logo = styled.img`
  width: 250px;
`;

const OrdersAdmin = () => {

  const [inputs, setInputs] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  // Get All Clients
  const [clients, setClients] = useState([]);

  // Tomar inputs del form
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  

   

   useEffect(() => {
     const getClients = async () => {
       try {
         const res = await axios.get("http://localhost:5000/api/users");
         setClients(res.data.users);
       
        } catch (err) {}
      };
      getClients();
    }, []);
    
     
  // Get All Orders
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders");
        setOrders(res.data.orders);
        // console.log(res.data.orders);
      } catch (err) {}
    };
    getOrders();
  }, []);

  const [Email, setEmail] = useState([]);

  const handleFilter = async (e) => {
    e.preventDefault();
    const minDate = inputs?.minDate;
    const maxDate = inputs?.maxDate;
    // const email = inputs?.email;
    const email = Email;



    try {
      if (minDate > maxDate){
        Swal.fire({
          position: "mid",
          icon: "info",
          title: "La fecha desde debe ser menor que la fecha hasta",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      else if (minDate && maxDate && email){
        const res = await axios.get(`http://localhost:5000/api/orders/income/date/client?min=${minDate}&max=${maxDate}&email=${email}`);
        setOrders(res.data);
       
      }
      else if(minDate && maxDate){
        const res = await axios.get(`http://localhost:5000/api/orders/income/product?min=${minDate}&max=${maxDate}`);
        setOrders(res.data);
      
      }
      else if (minDate){
        const res = await axios.get(`http://localhost:5000/api/orders/income/product/bydate?fecha=${minDate}`);
        setOrders(res.data);
        
      }else if (maxDate){
        const res = await axios.get(`http://localhost:5000/api/orders/income/product/bydate?fecha=${maxDate}`);
        setOrders(res.data);
      
      }
      else if (email){
        const res = await axios.get(`http://localhost:5000/api/orders/income/product/byclient?email=${email}`);
        setOrders(res.data);
       
      }
      else{
        Swal.fire({
          position: "mid",
          icon: "info",
          title: "Seleccione fechas o cliente",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      
    } catch (error) {
      
    }
  }

  //#region Filter
  const handleSearch = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = clients.filter((value) => {
      return value.email.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }

   
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    setEmail("");
  };

  const handleUsername = (email) => {
    setEmail(email);
    setFilteredData([]);
    setWordEntered("");
  }

//#endregion

  // Filas
  const ordersRows = orders?.map((p) => ({
    id: p._id,
    title: p.products.map((p) => p.title),
    userEmail: p.userEmail,
    createdAt: p.createdAt.slice(0, 10),
    amount: "$" + p.amount / 100,
    paymentType: p.paymentType,
    quantity: p.products.map((p) => p.quantity),
    status: p.status === "success" ? "Pagado" : p.status === "canceled" ? "Cancelado" : "Pendiente",
  }));

const headers = [
  {label: 'ID', key: 'id'},
  {label: 'Producto', key: 'title'},
  {label: 'Cliente', key: 'userEmail'},
  {label: 'Fecha', key: 'createdAt'},
  {label: 'Monto', key: 'amount'},
  {label: 'Forma de pago', key: 'paymentType'},
  {label: 'Cantidad', key: 'quantity'},
  {label: 'Estado', key: 'status'}
];
 
const csvReport = {
  filename: 'ListadoPedidos.csv',
  headers: headers,
  data: ordersRows
};
  console.log(Email);

  return (
    <div className="datatable">
      <div className="dateFilters">
        Desde <Input name="minDate" type="date" onChange={handleChange}/> Hasta <Input name="maxDate" type="date" onChange={handleChange}/> Cliente 
        {/* <SearchUser placeholder="Buscar" data={clients} onChange={handleChange}/> */}
        <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          name="email"
          placeholder="Buscar"
          value={wordEntered !== '' ? wordEntered : Email}
          onChange={handleSearch}
        />
        <div className="searchIcon">
          {filteredData.length === 0 && Email === '' ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResultUser">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              // <a className="dataItem" href={value.link}>
              //   <p>{value.title} </p>
              // </a> <Link to={`/product/${value._id}`} className="dataItem">
                <p className="dataItem" onClick={() => handleUsername(value.email)}>{value.email} </p>
              
            );
          })}
        </div>
      )}
    </div>
        <Button onClick={handleFilter}>Filtrar</Button>
        <CSVLink {...csvReport}><ButtonExportar>Exportar</ButtonExportar></CSVLink>
    
      </div>
      <DataGrid
        className="datagrid"
        id="datagrid"
        rows={ordersRows}
        columns={adminOrderColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        // checkboxSelection
      />

    </div>
  );
};

export default OrdersAdmin;
