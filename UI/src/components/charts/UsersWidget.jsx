import "./usersWidget.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../../requestMethods";
import Swal from "sweetalert2";

export default function UsersWidget() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [actualIncome, setActualIncome] = useState([]);
  const [prevIncome, setPrevIncome] = useState([]);
  const [incomeByDate, setincomeByDate] = useState([]);




  const [orders, setOrders] = useState([]);
  const [LastMonthOrders, setLastMonthOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [LastMonthUsers, setLastMonthUsers] = useState([]);
 const [values, setValues] = useState({});
 const [numberOfMonth, setNumberOfMonth] = useState([]);

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
          setNumberOfMonth(mesActual.data.income[0]._id);
          
        } catch {}
      };
      getIncome();
    }, []);
    
 
    const onChange = (e) => {
      // setValues({ ...values, [e.target.name]: e.target.value });
      getIncomeByMonth(e);
    };

      // Ingresos version seleccionar mes
     
        const getIncomeByMonth = async (e) => {
          try {
           
       
              const mesActual = await publicRequest.get(`orders/actual/income/bydate?mes=${e}`);
              
              if(mesActual.data.income[0].total > 0){
                console.log(mesActual.data.income[0].total);
                setincomeByDate(mesActual.data.income[0].total / 100);

              }

             
         
             

           
      
          } catch {
            Swal.fire({
              position: "top",
              icon: "info",
              title: "No hay datos para el mes seleccionado",
              showConfirmButton: false,
              timer: 2000,
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        };
      
     
  

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
          <span className="featuredMoney">${incomeByDate > 0 ? incomeByDate : actualIncome[0]?.total / 100}</span>
          <span className="featuredMoneyRate">
              <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        {/* <span className="featuredSub">Mes pasado ${prevIncome[0]?.total / 100}</span> */}
        <span className="featuredSub">Mes </span>
        <select className="featuredSub" name="mes" id="mes" defaultValue={actualIncome[0]?._id } onChange={(e)=>onChange(e.target.value)}>
          <option value="0" selected disabled>Seleccionar</option>
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
          <option value="3">Marzo</option>
          <option value="4">Abril</option>
          <option value="5">Mayo</option>
          <option value="6">Junio</option>
          <option value="7">Julio</option>
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </select>
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
