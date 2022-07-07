import "./usersWidget.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../../requestMethods";

export default function UsersWidget() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [actualIncome, setActualIncome] = useState([]);
  const [prevIncome, setPrevIncome] = useState([]);

  const [orders, setOrders] = useState([]);
  const [LastMonthOrders, setLastMonthOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [LastMonthUsers, setLastMonthUsers] = useState([]);


  // Ingresos
  // useEffect(() => {
  //   const getIncome = async () => {
  //     try {
  //       const res = await userRequest.get("orders/income");
  //       const totalAnterior = res.data.income[0].total / 100;
  //       const totalActual = res.data.income[1].total / 100;

  //       setIncome(res.data.income);
  //       setPerc((totalActual * 100) / totalAnterior - 100);
  //     } catch {}
  //   };
  //   getIncome();
  // }, []);

    // Ingresos version actual
    useEffect(() => {
      const getIncome = async () => {
        try {
          const mesActual = await userRequest.get("orders/actual/income");
          const mesPasado = await userRequest.get("orders/prev/income");
  
          setActualIncome(mesActual.data.income);
          setPrevIncome(mesPasado.data.income);

       

        } catch {}
      };
      getIncome();
    }, []);
  

  //Pedidos
  useEffect(() => {
    const getOrders = async () => {
      try {
        const mesActual = await publicRequest.get("orders/actualmonth");
        const mesAnterior = await publicRequest.get("orders/prevmonth");
  
        setOrders(mesActual.data);
        setLastMonthOrders(mesAnterior.data);

      } catch {}
    };
    getOrders();
  }, []);

  //Usuarios
  useEffect(() => {
    const getUsers = async () => {
      try {
        const mesActual = await userRequest.get("users/actualmonth");
        const mesAnterior = await userRequest.get("users/prevmonth");


        setUsers(mesActual.data);
        setLastMonthUsers(mesAnterior.data)
         
      } catch {}
    };
    getUsers();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Ingresos</span>
        {/* <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total / 100}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div> */}
           <div className="featuredMoneyContainer">
          <span className="featuredMoney">${actualIncome[0]?.total / 100}</span>
          <span className="featuredMoneyRate">
              <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Mes pasado ${prevIncome[0]?.total / 100}</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Pedidos</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{orders?.length}</span>
          <span className="featuredMoneyRate">
            <ArrowUpward className="featuredIcon positive" />
          </span>
        </div>
        <span className="featuredSub">Mes anterior {LastMonthOrders?.length}</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Usuarios</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{users.length}</span>
          <span className="featuredMoneyRate">
             <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Mes anterior: {LastMonthUsers.length}</span>
      </div>
    </div>
  );
}
