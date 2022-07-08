import {
  ArrowUpwardSharp,
  AttachMoneySharp,
  BarChartSharp,
  CreditCardSharp,
  GroupSharp,
} from "@material-ui/icons";
import "./widget.scss";

const Widget = ({ type }) => {
  let data;

  //temporal
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USUARIOS",
        isMoney: false,
        link: "Ver usuarios",
        icon: <GroupSharp className="icon" style={{
            color: "crimson",
            backgroundColor: "rgba(255,0,0,0.2)",
        }}></GroupSharp>,
      };
      break;
    case "order":
      data = {
        title: "PEDIDOS",
        isMoney: false,
        link: "Ver pedidos",
        icon: <CreditCardSharp className="icon" style={{
            color: "goldenrod",
            backgroundColor: "rgba(218,165,32,0.2)",
        }}></CreditCardSharp>,
      };
      break;
    case "earning":
      data = {
        title: "INGRESOS",
        isMoney: true,
        link: "Ver reportes",
        icon: <AttachMoneySharp className="icon" style={{
            color: "green",
            backgroundColor: "rgba(0,128,0,0.2)",
        }}></AttachMoneySharp>,
      };
      break;
    case "balance":
      data = {
        title: "ENTREGAS",
        isMoney: true,
        link: "Ver detalles",
        icon: <BarChartSharp className="icon" style={{
            color: "purple",
            backgroundColor: "rgba(128,0,128,0.2)",
        }}></BarChartSharp>,
      };
      break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.isMoney && "$"} {amount}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <span className="percentage positive">
          <ArrowUpwardSharp /> {diff} %
        </span>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
