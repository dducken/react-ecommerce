const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const remitoRoute = require("./routes/remito");
const checkoutRoute = require("./routes/stripe");
const cors = require("cors");


dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders",orderRoute);
app.use("/api/checkout",checkoutRoute);
app.use("/api/remitos",remitoRoute);



//Funcion para permitir o denegar el acceso a sitios.
// var whiteList = ['http://localhost:3000/']

// var corsOptions = {
//     origin: function (origin, callback) {
//         if (whiteList.indexOf(origin) != -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     }
// }

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is OK :)")
})