import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../data";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { DeleteOutline } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import Swal from "sweetalert2";
import { userRequest } from "../../requestMethods";

const Datatable = () => {
  // Get Usuarios
  const [users, setUsers] = useState([]);



  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data.users);
       
      } catch (err) {}
    };
    getUsers();
  }, []);

  // Filas
  const userRows2 = users.map((u) => ({
    id: u._id,
    username: u.username,
    img: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png",
    email: u.email,
    status: "Activo",
    isAdmin: u.isAdmin ? "Si" : "No",
    date: u.createdAt.slice(0, 10),
  }));

  const handleDelete = (id) => {
    
    Swal.fire({
      title: 'Estas seguro?',
      text: "Se va a eliminar el usuario seleccionado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33', //3085d6
      cancelButtonColor: 'gray',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        const res = userRequest.delete(`http://localhost:5000/api/users/${id}`);

        Swal.fire({
          position: 'mid',
          icon: 'success',
          title: 'Usuario eliminado',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout (function() {
          window.location.reload();
        }, 1600);
      }
    })
  };
// Columna Accion
const actionColumn = [
  {
    field: "action",
      headerName: "Accion",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/admin/users/" + params.row.id}>
              <button className="buttonVer">Editar</button>
            </Link>
            <button
              className="buttonEliminar"
              onClick={() => handleDelete(params.row.id)}
            >Eliminar</button>
          </div>
        );
  },
}
]

  const useStyles = makeStyles((theme) => ({
    table:{
      minWidth:650,
    },
    tableContainer:{
      minWidth:650,
      borderRadius: 50,
      margin: '10px 10px',
      width: '100%',
      padding: '10px 30px',
      
    }
  }))

  const classes = useStyles();

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Listado de usuarios | ({users.length})
        <Link
          to="/admin/users/add"
          style={{ textDecoration: "none" }}
          className="link"
        >
          Crear usuario
        </Link>
      </div>
      <DataGrid
        className={classes.tableContainer}
        rows={userRows2}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        // checkboxSelection
      />
    </div>
  );
};

export default Datatable;
