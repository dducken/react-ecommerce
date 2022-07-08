
import { useEffect } from "react";
import { useMemo, useState } from "react";
import "../components/admin/admin.scss";
import AnnouncementAdmin from "../components/admin/AnnouncementAdmin";
import Chart from "../components/charts/Chart";
import UsersWidget from "../components/charts/UsersWidget";
import Sidebar from "../components/sidebar/Sidebar";
import OrdersAdmin from "../components/datatable/OrdersAdmin";
import { userRequest } from "../requestMethods";

const Admin = () => {
  const [userStats, setUserStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    []
  );


  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Usuarios registrados": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  
  return (
    <div>
      <AnnouncementAdmin />
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <div className="widgets">
            <UsersWidget/>
            {/* <Widget type="user" /> */}
            {/* <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" /> */}
          </div>
          <div className="charts">
            {/* <Featured /> */}
            <Chart
              aspect={2 / 1}
              title="Usuarios registrados por mes"
              data={userStats}
              grid
              dataKey="Usuarios registrados"
            />
          </div>
          <div className="listContainer">
            <div className="listTitle">Listado de pedidos</div>
            {/* <Table /> */}
            <OrdersAdmin/>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Admin;
