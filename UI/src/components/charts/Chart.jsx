import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";

// const data = [
//   { name: 'Enero', Total: 35000 },
//   { name: 'Febrero', Total: 21000 },
//   { name: 'Marzo', Total: 80000 },
//   { name: 'Abril', Total: 16000 },
//   { name: 'Mayo', Total: 90000 },
//   { name: 'Junio', Total: 12000 },
// ];

const Chart = ({data,aspect, title,grid,dataKey}) => {
  return (
    // <div className="chart">
    //   <div className="title">{title}</div>
    //   <ResponsiveContainer width="100%" aspect={aspect}>
    //     <AreaChart
    //       width={730}
    //       height={250}
    //       data={data}
    //       margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    //     >
    //       <defs>
    //         <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
    //           <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
    //           <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
    //         </linearGradient>
    //       </defs>
    //       <XAxis dataKey="name" stroke="gray"/>
         
    //       <CartesianGrid strokeDasharray="3 3" className="chartGrid"/>
    //       <Tooltip />
    //       <Area
    //         type="monotone"
    //         dataKey="Total"
    //         stroke="#8884d8"
    //         fillOpacity={1}
    //         fill="url(#total)"
    //       />
    //     </AreaChart>
    //   </ResponsiveContainer>
    // </div>
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
