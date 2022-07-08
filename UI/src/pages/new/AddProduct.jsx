import "./addProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { createProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { CloudUpload } from "@material-ui/icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [file, setFile] = useState("");
  const [inputs, setInputs] = useState({});
  const [cat, setCat] = useState([]);
  const [color, setColor] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Tomar inputs del form
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  // Tomar las categorias como array
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  // Tomar los colores como array
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };
  console.log(inputs);
  // Registrar producto.
  const handleClick = (e) => {
    e.preventDefault();

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        Swal.fire({
          position: "mid",
          icon: "error",
          title: "Imagen no cargada",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          Swal.fire({
            title: "Agregar Producto",
            text: "Se va a agregar un producto nuevo",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "green", //3085d6
            cancelButtonColor: "gray",
            confirmButtonText: "Agregar",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                position: "mid",
                icon: "success",
                title: "Producto agregado",
                showConfirmButton: false,
                timer: 1500,
              });
              const product = {
                ...inputs,
                img: downloadURL,
                categories: cat,
                color: color,
              };
              createProduct(product, dispatch);
              navigate("/admin/products");
            }
          });
        });
      }
    );
  };

  return (
    <div className="update">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Agregar un nuevo producto</h1>
        </div>
        <div className="bottom">
          <div className="left">
            {/* <img
              src={file ? file.value : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            /> */}
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Imagen:
                  <CloudUpload className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  placeholder="Subir imagen"
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <label>Nombre</label>
                <input
                  name="title"
                  type="text"
                  placeholder="Nombre"
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Descripcion</label>
                <textarea
                  name="desc"
                  type="text"
                  placeholder="Desc"
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Precio</label>
                <input
                  name="price"
                  type="number"
                  placeholder="Precio"
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Stock</label>
                <select name="inStock" id="idStock" onChange={handleChange}>
                  <option value="true">Si</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="formInput">
                <label>Categoria</label>
                <input
                  name="categories"
                  type="text"
                  placeholder="bibliotecas,racks-tv,estanterias"
                  onChange={handleCat}
                />
              </div>

              <div className="formInput">
                <label>Color</label>
                <input
                  name="color"
                  type="text"
                  placeholder="white,black"
                  onChange={handleColor}
                />
              </div>

              <div className="formInput">
                <label>Largo</label>
                <input
                  name="width"
                  type="text"
                  placeholder="80"
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Alto</label>
                <input
                  name="height"
                  type="text"
                  placeholder="60"
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Profundidad</label>
                <input
                  name="depth"
                  type="text"
                  placeholder="30"
                  onChange={handleChange}
                />
              </div>

              <div className="formInput"></div>
              <div className="formInput">
                <button onClick={handleClick}>Agregar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
