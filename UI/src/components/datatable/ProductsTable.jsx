import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "../../data";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { deleteProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { DeleteOutline } from "@material-ui/icons";
const Swal = require('sweetalert2')


const ProductTable = () => {

  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();


  // Get Products
  useEffect(() => {
    const getProducts = async () => {
      try {

        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data.products);
      
      } catch (err) {}
    };
    getProducts();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Se va a eliminar el producto seleccionado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33', //3085d6
      cancelButtonColor: 'gray',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id, dispatch);
        Swal.fire({
          position: 'mid',
          icon: 'success',
          title: 'Producto eliminado',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout (function() {
          window.location.reload();
        }, 1600);
      }
    })
  };
  // Filas
  const productRows = products.map((p) => (
    {
      id: p._id,
      title: p.title,
      img: p.img,
      category: p.categories,
      color: p.color,
      price: p.price,
      instock: p.inStock ? "Si" : "No",
    }
  ))

      // Columna Accion
      const actionColumn = [
        {
          field: "action",
            headerName: "Accion",
            width: 150,
            renderCell: (params) => {
              return (
                <div className="cellAction">
                  <Link to={"/admin/products/" + params.row.id}>
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


  return (
    <div className="datatable">
      <div className="datatableTitle">
        Listado de productos | ({products.length})
        <Link
          to="/admin/products/add"
          style={{ textDecoration: "none" }}
          className="link"
        >
          Crear Producto
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={productRows}
        columns={productColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
    
  );
};

export default ProductTable;
