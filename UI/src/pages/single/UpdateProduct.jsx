import "./updateProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CloudUpload } from "@material-ui/icons";
import Swal from "sweetalert2";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/apiCalls";
import { userRequest } from "../../requestMethods";

const UpdateProduct = () => {
  const [file, setFile] = useState("");
  const location = useLocation();
  const productId = location.pathname.split("/")[3];
  const [product, setProduct] = useState([]);
  const [inputs, setInputs] = useState({});
  const [cat, setCat] = useState([]);
  const [color, setColor] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/get/${productId}`
        );

        return setProduct(res.data.product);
      } catch (err) {}
    };
    getProduct();
  }, [productId]);

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

  // Actualizar producto.
  const handleClick = (e) => {
    e.preventDefault();

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Check si no hubo cambio en la img no la sube a la storage.
    if (product.img === file.value) {
      console.log("La imagen no se cambio");
      // Se actualiza el producto
      Swal.fire({
        title: "Actualizar Producto",
        text: "Se va a actualizar el producto",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "green", //3085d6
        cancelButtonColor: "gray",
        confirmButtonText: "Actualizar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: "mid",
            icon: "success",
            title: "Producto actualizado",
            showConfirmButton: false,
            timer: 1500,
          });
          const product = {
            ...inputs,
            categories: cat,
            color: color,
          };
          updateProduct(productId, product, dispatch);
          navigate("/admin/products");
        }
      });
    } else {
      console.log("La imagen se cambio");
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
              title: "Actualizar Producto",
              text: "Se va a actualizar el producto",
              icon: "info",
              showCancelButton: true,
              confirmButtonColor: "green", //3085d6
              cancelButtonColor: "gray",
              confirmButtonText: "Actualizar",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  position: "mid",
                  icon: "success",
                  title: "Producto actualizado",
                  showConfirmButton: false,
                  timer: 1500,
                });
                const product = {
                  ...inputs,
                  img: downloadURL,
                  categories: cat,
                  color: color,
                };
                updateProduct(productId, product, dispatch);
                navigate("/admin/products");
              }
            });
          });
        }
      );
    }
  };

//#region handleEdit v1
  const handleEdit2 = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Actualizar Producto",
      text: "Se va a actualizar el producto",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "green", //3085d6
      cancelButtonColor: "gray",
      confirmButtonText: "Actualizar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "mid",
          icon: "success",
          title: "Producto actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
        const url =  `http://localhost:5000/api/products/${productId}`;
        const product = {
          ...inputs,
          categories: cat,
          color: color,
        };
        // updateProduct(productId, product, dispatch);
         axios.put(url, product).then(response => {
          const result = response.data;
          const {status } = result;
          if (status !== 'SUCCESS'){
            Swal.fire({
              position: "mid",
              icon: "error",
              title: "Hubo un problema al querer actualizar, revisar campos",
              showConfirmButton: false,
              timer: 1500,
            });
          }else{
            Swal.fire({
              position: "mid",
              icon: "success",
              title: "Producto actualizado",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/admin/products");
          }
        })
        .catch(err => {
          Swal.fire({
            position: "mid",
            icon: "error",
            title: "Hubo un problema al conectarse con la base de datos",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(err);
        })
        
      }
    });
    const url =  `http://localhost:5000/api/products/${productId}`;
    const product = {
            ...inputs,
            categories: cat,
            color: color,
          };
    axios.put(url, product).then(response => {
      const result = response.data;
      const {status, message, data } = result;
      if (status !== 'SUCCESS'){
        console.log("Error " + message, status);
      }else{
        console.log("Todo bien " + message);
        window.location.reload();
      }
    })
    .catch(err => {
      console.log("Error al actualizar " + err)
    })
  }
//#endregion
//#region handleEdit v2  subida de imagen not working.
const handleEdit = (e) => {
  e.preventDefault();
  var imgSubida = product.img;

  Swal.fire({
    title: "Actualizar Producto",
    text: "Se va a actualizar el producto",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "green", //3085d6
    cancelButtonColor: "gray",
    confirmButtonText: "Actualizar",
  }).then((result) => {
    if (result.isConfirmed) {
      // if (file.value !== imgSubida){
      //    imgSubida = uploadImage();
      // }
      Swal.fire({
        position: "mid",
        icon: "success",
        title: "Producto actualizado",
        showConfirmButton: false,
        timer: 1500,
      });
      const product = {
        ...inputs,
        // img: imgSubida ? imgSubida : file.value,
      };
      updateProduct(productId, product, dispatch);
      navigate("/admin/products");
    }
  });
}

const uploadImage = async () => {
  const fileName = new Date().getTime() + file.name;
  const storage = getStorage(app);
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  try {
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
                position: "mid",
                icon: "success",
                title: "Imagen actualizada",
                showConfirmButton: false,
                timer: 1000,
              });
            return downloadURL;
            
        });
      }
    );
  } catch (err) {console.log("error al subir img")}
};


//#endregion
return (
    <div className="update">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Editar {product.title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file ? file.value : product.img
                //   : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
                  name="img"
                  defaultValue={product.img}
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
                  defaultValue={product.title}
                  placeholder={product.title}
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Descripcion</label>
                <textarea
                  name="desc"
                  type="text"
                  defaultValue={product.desc}
                  placeholder={product.desc}
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Precio</label>
                <input
                  name="price"
                  type="text"
                  defaultValue={product.price}
                  placeholder={product.price}
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Stock</label>
                <select
                  name="inStock"
                  id="idStock"
                  onChange={handleChange}
                >
                  <option disabled selected>Seleccionar</option>
                  <option value="true">Si</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="formInput">
                <label>Categoria</label>
                <input
                  name="categories"
                  type="text"
                  defaultValue={product.categories}
                  placeholder={product.categories}
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Color</label>
                <input
                  name="color"
                  type="text"
                  defaultValue={product.color}
                  placeholder={product.color}
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Largo</label>
                <input
                  name="widht"
                  type="text"
                  defaultValue={product.width}
                  placeholder={product.width}
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Alto</label>
                <input
                  name="height"
                  type="text"
                  defaultValue={product.height}
                  placeholder={product.height}
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Profundidad</label>
                <input
                  name="depth"
                  type="text"
                  defaultValue={product.depth}
                  placeholder={product.depth}
                  onChange={handleChange}
                />
              </div>

              <div className="formInput"></div>
              <div className="formInput">
                <button onClick={handleEdit}>Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
