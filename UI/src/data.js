import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

export const SliderItems = [
    {
        id: 1,
        img: "https://images.pexels.com/photos/1827054/pexels-photo-1827054.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        title: "ORGANIZA TUS IDEAS",
        desc: "TRABAJOS A DOMICILIO Y PERSONALIZADOS",
        bg: "f5fafd",
        btn: "VER MÁS",
        link: "#",
    },
    {
        id: 2,
        img: "https://images.pexels.com/photos/7014764/pexels-photo-7014764.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        title: "ENVÍOS A DOMICILIO",
        desc: "PODES CONSULTARNOS EL COSTO DE ENVIO",
        bg: "fcf1ed",
        btn: "CONSULTAR",
        link: "#",
    },
    {
        id: 3,
        img: "https://images.unsplash.com/photo-1616464916356-3a777b2b60b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        title: "MESAS, ESCRITORIOS, ROPEROS Y MÁS ",
        desc: "SEGUINOS EN INSTAGRAM!",
        bg: "fbf0f4",
        btn: "SEGUIR",
        link: "https://www.instagram.com/carpinteriarulo/",
    }
]

export const categories = [
    {
        id: 1,
        img: "https://images.pexels.com/photos/1517145/pexels-photo-1517145.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        title: "MESAS",
        cat: "mesas-ratonas"
    },
    {
        id: 2,
        img: "https://images.pexels.com/photos/1173648/pexels-photo-1173648.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        title: "BIBLIOTECAS",
        cat: "bibliotecas"
    },
    {
        id: 3,
        img: "https://images.pexels.com/photos/5705490/pexels-photo-5705490.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        title: "ESCRITORIOS",
        cat: "escritorios"
    },
]

export const popularProducts = [
    {
        id: 1,
        img: "https://images.pexels.com/photos/9220882/pexels-photo-9220882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
        id: 2,
        img: "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
        id: 3,
        img: "https://images.pexels.com/photos/8135545/pexels-photo-8135545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
        id: 4,
        img: "https://images.pexels.com/photos/707579/pexels-photo-707579.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
        id: 5,
        img: "https://images.pexels.com/photos/1845289/pexels-photo-1845289.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
        id: 6,
        img: "https://images.pexels.com/photos/7193654/pexels-photo-7193654.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
        id: 7,
        img: "https://images.pexels.com/photos/9220882/pexels-photo-9220882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
        id: 8,
        img: "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
]

//data temporal
export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "Usuario",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 100,
    },
    {
      field: "status",
      headerName: "Estado",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
    { field: "date", headerName: "Fecha", width: 120 },
  ];
  
export const userRows = [
    {
      id: 1,
      username: "Snow",
      img: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png",
      email: "1snow@gmail.com",
      status: "Activo",
      isAdmin: "No",
    },
    {
      id: 2,
      username: "Jamie Lannister",
      img: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png",
      email: "2snow@gmail.com",
      status: "Activo",
      isAdmin: "No",
    },
    {
      id: 3,
      username: "Lannister",
      img: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png",
      email: "3snow@gmail.com",
      status: "Inactivo",
      isAdmin: "No",
    },
    {
      id: 4,
      username: "Stark",
      img: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png",
      email: "4snow@gmail.com",
      status: "Activo",
      isAdmin: "No",
    },
    {
      id: 5,
      username: "Targaryen",
      img: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png",
      email: "5snow@gmail.com",
      status: "Activo",
      isAdmin: "No",
    },
    {
      id: 6,
      username: "Melisandre",
      img: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png",
      email: "6snow@gmail.com",
      status: "Activo",
      isAdmin: "No",
    },
    {
      id: 7,
      username: "Clifford",
      img: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png",
      email: "7snow@gmail.com",
      status: "Activo",
      isAdmin: "No",
    },
    {
      id: 8,
      username: "Frances",
      img: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png",
      email: "8snow@gmail.com",
      status: "Activo",
      isAdmin: "No",
    },
    {
      id: 9,
      username: "Roxie",
      img: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png",
      email: "snow@gmail.com",
      status: "Inactivo",
      isAdmin: "No",
    },
    {
      id: 10,
      username: "Roxie",
      img: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png",
      email: "snow@gmail.com",
      status: "Activo",
      isAdmin: "No",
    },
  ];

// Product Columns
export const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "product",
    headerName: "Producto",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "category",
    headerName: "Category",
    width: 230,
  },

  {
    field: "color",
    headerName: "Color",
    width: 100,
  },
  {
    field: "price",
    headerName: "Precio",
    width: 160,
  },
  { field: "instock", headerName: "Stock", width: 120 },
];

//data para add

export const userInputs = [
  {
    id: 1,
    label: "Usuario",
    type: "text",
    placeholder: "john_doe",
  },
  {
    id: 2,
    label: "Nombre y Apellido",
    type: "text",
    placeholder: "John Doe",
  },
  {
    id: 3,
    label: "Email",
    type: "mail",
    placeholder: "john_doe@gmail.com",
  },
  {
    id: 4,
    label: "Teléfono",
    type: "text",
    placeholder: "+1 234 567 89",
  },
  {
    id: 5,
    label: "Contraseña",
    type: "password",
  },
  {
    id: 6,
    label: "Dirección",
    type: "text",
    placeholder: "Elton St. 216 NewYork",
  },
  {
    id: 7,
    label: "Pais",
    type: "text",
    placeholder: "Argentina",
  },
];

export const productInputs = [
  {
    id: 1,
    label: "Titulo",
    type: "text",
    placeholder: "Mesa ratona",
  },
  {
    id: 2,
    label: "Descripción",
    type: "text",
    placeholder: "Descripcion",
  },
  {
    id: 3,
    label: "Categoria",
    type: "text",
    placeholder: "escritorio,racks-tv,mesas-ratonas,estanterias,bibliotecas",
  },
  {
    id: 4,
    label: "Precio",
    type: "text",
    placeholder: "100",
  },
  {
    id: 5,
    label: "Stock",
    type: "text",
    placeholder: "true o false",
  },
];

// User Orders Columns
export const userOrderColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Producto/s",
    width: 280,
    // renderCell: (params) => {
    //   return (
    //     <div className="cellWithImg">
    //       {params.row.title}
    //     </div>
    //   );
    // },
  },
  {
    field: "createdAt",
    headerName: "Fecha",
    width: 110,
  },
  {
    field: "amount",
    headerName: "Monto",
    width: 80,
  },
  { field: "paymentType", headerName: "Forma de pago", width: 150 },
  { field: "quantity", headerName: "Cantidad", width: 75 },
  {
    field: "status",
    headerName: "Estado",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
//Admin order columns
export const adminOrderColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Producto/s",
    width: 280,
    // renderCell: (params) => {
    //   return (
    //     <div className="cellWithImg">
    //       {params.row.title}
    //     </div>
    //   );
    // },
  },
  {
    field: "userEmail",
    headerName: "Usuario",
    width: 160,
  },

  {
    field: "createdAt",
    headerName: "Fecha",
    width: 110,
  },
  {
    field: "amount",
    headerName: "Monto",
    width: 90,
  },
  { field: "paymentType", headerName: "Forma de pago", width: 120 },
  { field: "quantity", headerName: "Cantidad", width: 75 },
  {
    field: "status",
    headerName: "Estado",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
//Admin order columns
export const remitoColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "status",
    headerName: "Estado",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
  {
    field: "userName",
    headerName: "Cliente",
    width: 160,
  },

  {
    field: "createdAt",
    headerName: "Fecha",
    width: 130,
  },
  {
    field: "title",
    headerName: "Producto/s",
    width: 260,
  },
  
];