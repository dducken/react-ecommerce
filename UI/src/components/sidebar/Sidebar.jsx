import {
  BarChartSharp,
  ContactsSharp,
  CreditCardSharp,
  DashboardSharp,
  ExitToAppSharp,
  GroupSharp,
  Settings,
  Store,
} from "@material-ui/icons";
import "../sidebar/sidebar.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">RULOADMIN</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {/* PRINCIPAL */}
          <p className="title">PRINCIPAL</p>
          <Link to="/admin/panel" style={{ textDecoration: "none" }}>
            <li>
              <DashboardSharp className="icon"></DashboardSharp>
              <span>Dashboard</span>
            </li>
          </Link>
          {/* LISTADOS */}
          <p className="title">LISTADO</p>
          <Link to="/admin/users" style={{textDecoration:"none"}}>
          <li>
            <GroupSharp className="icon"></GroupSharp>
            <span>Usuarios</span>
          </li>
          </Link>
          <Link to="/admin/orders" style={{textDecoration:"none"}}>
          <li>
            <CreditCardSharp className="icon"></CreditCardSharp>
            <span>Pedidos</span>
          </li>
          </Link>
          <Link to="/admin/products" style={{textDecoration:"none"}}>
          <li>
            <Store className="icon"></Store>
            <span>Productos</span>
          </li>
          </Link>
          {/* OTROS */}
          <p className="title">OTROS</p>
          <Link to="/admin/remitos" style={{textDecoration:"none"}}>
          <li>
            <BarChartSharp className="icon"></BarChartSharp>
            <span>Remitos</span>
          </li>
          </Link>
    
          {/* USUARIO */}
          <p className="title">USUARIO</p>
          <li>
            <ContactsSharp className="icon"></ContactsSharp>
            <span>Perfil</span>
          </li>
          <Link to="/" style={{textDecoration:"none"}}>
          <li>
            <ExitToAppSharp className="icon"></ExitToAppSharp>
            <span>Volver al inicio</span>
          </li>
          </Link>
          {/* <p className="title">TEMA</p> */}
        </ul>
      </div>
      {/* <div className="bottom">
        <div className="colorOption" onClick={() => (dispatch({ type: "LIGHT" }))}></div>
        <div className="colorOption" onClick={() => (dispatch({ type: "DARK" }))}></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
