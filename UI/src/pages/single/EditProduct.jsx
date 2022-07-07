import { Link, useLocation } from "react-router-dom";
import "./editProduct.css";
import ProductChart from "../../components/charts/ProductChart";
import { Publish } from "@material-ui/icons";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[3];
    const [pStats, setPStats] = useState([]);
    const [total, setTotal] = useState([]);
    const [product, setProduct] = useState([]);

    useEffect(() => {
      const getProduct = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/products/get/${productId}`
          );
          console.log("Get Product by id: " + res.data.product);
          return setProduct(res.data.product);
        } catch (err) {}
      };
      getProduct();
    },[productId]);

    const MONTHS = useMemo(
      () => [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      []
    );

    useEffect(() => {
      const getStats = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/orders/income?pid=${productId}`
          );
          
          const list = res.data.income.sort((a,b)=>{
              return a._id - b._id
          })
          list.map((item) =>
            setPStats((prev) => [
              ...prev,
              { name: MONTHS[item._id - 1], Sales: item.total }
            ])
          );
        } catch (err) {
          console.log(err);
        }
      };
      getStats();
    }, [productId, MONTHS]);

  return (
    
    <div className="editProduct">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Crear nuevo</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <ProductChart data={pStats} dataKey="Sales" title="Rendimiento de ventas" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Ventas del mes:</span>
              <span className="productInfoValue">{total}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Nombre</label>
            <input type="text" placeholder={product.title} />
            <label>Descripcion</label>
            <textarea placeholder={product.desc} className="productDesc"/>
            <label>Precio</label>
            <input type="text" placeholder={product.price} />
            <label>Stock</label>
            <select name="inStock" id="idStock">
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  
  );
}
