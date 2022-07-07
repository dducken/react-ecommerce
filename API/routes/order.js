const Order = require("../models/Order");
const Product = require("../models/Product");

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken");
const router = require("express").Router();
// // SDK de Mercado Pago
// const mercadopago = require("mercadopago");
// // Agrega credenciales
// mercadopago.configure({
//     access_token: "TEST-3237111391718853-053120-0a8bb644a76e74fd9e7f306924f1ec23-542643753",
// });


//CREATE le saque el verify token
router.post("/checkout", async (req, res) => {
    // const ids = req.body;
    try {
    let products = await Product.find();
    const newOrder = new Order(req.body);

    let preference = {
        items: [],
        // back_urls: {
        //     success: "http://localhost:3000/",
        //     failure: "http://localhost:3000/",
        //     pending: "http://localhost:3000/",
        // },
    };

    let error = false;

        newOrder.forEach((productId) => {
            const product = products.find((p) => p.id === productId);
            if (product.inStock) {
                preference.items.push({
                    title: product[0].title,
                    unit_price: req.body.amount, 
                    quantity: req.body.quantity,
                })
            } else {
                error = true;
            }
        });
    
        if (error) {
            res.status(500).json(err + "Sin stock");
        } else {
            const response = await mercadopago.preferences.create(preference);
            const preferenceId = response.body.id;
            const savedOrder = await newOrder.save();
    
            res.status(200).json(preferenceId);
        }
    } catch (error) {
        res.status(500).json(error + "Sin stock");
        
    }
});

//CREATE
router.post("/add", async (req, res) => {
    const newOrder = new Order(req.body);
  
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//UPDATE
router.put("/:id", async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        });
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted.")
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER ORDERS
router.get("/get/:userId", async (req, res) => {
    try {
        
        const orders = await Order.find({
            userId: req.params.userId
        });

        res.status(200).json({
            orders
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET ORDERS BY ID
router.get("/getbyid/:_id", async (req, res) => {
    try {
        var ObjectId = require('mongoose').Types.ObjectId; 
        const orders = await Order.findOne({
            _id: new ObjectId(req.params._id)
        });
        
        res.status(200).json({
            orders
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL ORDERS // verifyTokenAndAdmin eliminado por el momento
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        res.status(200).json({
            orders
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET MONTHLY INCOME
router.get("/income", async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([{
                $match: {
                    createdAt: {
                        $gte: previousMonth
                    }
                }
            },
            {
                $project: {
                    month: {
                        $month: "$createdAt"
                    },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {
                        $sum: "$sales"
                    },
                },
            },
        ]);
        res.status(200).json({
            income
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

//Actual income
router.get("/actual/income", async (req, res) => {
 
    const mesActual = new Date().getMonth()+1;

    try {
        const income = await Order.aggregate([{
                $match: {
                    $expr: {
                        $eq: [{ 
                            $month: "$createdAt" 
                        }, mesActual]
                    }
                }
            },
            {
                $project: {
                    month: {
                        $month: "$createdAt"
                    },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {
                        $sum: "$sales"
                    },
                },
            },
        ]);
      
        res.status(200).json({
            income
        });
    } catch (err) {
        res.status(500).json(err);
    }
})
//Mes pasado income
router.get("/prev/income", async (req, res) => {
 
    const mesPasado = new Date().getMonth();

    try {
        const income = await Order.aggregate([{
                $match: {
                    $expr: {
                        $eq: [{ 
                            $month: "$createdAt" 
                        }, mesPasado]
                    }
                }
            },
            {
                $project: {
                    month: {
                        $month: "$createdAt"
                    },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {
                        $sum: "$sales"
                    },
                },
            },
        ]);
     
        res.status(200).json({
            income
        });
    } catch (err) {
        res.status(500).json(err);
    }
})
//Actual income by fecha
router.get("/actual/income/bydate", async (req, res) => {
 
    let qNumero = req.query.mes;
    const qMes = new Date();
    // let mesActual = new Date(qMes.setMonth(qNumero)).getMonth()
    let mesActual;
   
    if(qNumero > 0){
        mesActual = new Date(qMes.setMonth(qNumero)).getMonth();
    } else{
        mesActual = new Date().getMonth()+1;
    }

    try {
        
        
        const income = await Order.aggregate([{
                $match: {
                    $expr: {
                        $eq: [{ 
                            $month: "$createdAt" 
                        }, mesActual]
                    }
                }
            },
            {
                $project: {
                    month: {
                        $month: "$createdAt"
                    },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {
                        $sum: "$sales"
                    },
                },
            },
        ]);
      
        res.status(200).json({
            income
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET PEDIDOS MES ANTERIOR
router.get("/prevmonth", async (req, res) => {
    const month = new Date().getMonth();
  
    try {
       
        const orders = await Order.find({ $expr: {
            $eq: [{ $month: "$createdAt" }, month]
            }});

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})
//GET PEDIDOS MES ACTUAL
router.get("/actualmonth", async (req, res) => {
    const month = new Date().getMonth() + 1;
  
    try {
        const orders = await Order.find({ $expr: {
            $eq: [{ $month: "$createdAt" }, month]
            }});
         

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})

 

// Get income entre fechas
router.get("/income/product", async (req, res) => {
   
    const minDate = req.query.min;
    const maxDate = req.query.max;
    const query = {};
    console.log(minDate);
    console.log(maxDate);

    if (minDate && maxDate) {
        query["createdAt"] = {
            $gte: new Date(minDate).toISOString(),
            $lte: new Date(maxDate).toISOString()
        };
      }

    try {
        const income = await Order.find(query);
        // .sort({ createdAt: -1 }) // Order by desc

        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//Get income by fecha
router.get("/income/product/bydate", async (req, res) => {
   
    const fecha = req.query.fecha;

    const query = {};
    console.log(fecha);
  

    if (fecha) {
        query["createdAt"] = {
            $gt: new Date(fecha).toISOString()
        };
      }

    try {
        const income = await Order.find(query)
        .sort({ createdAt: 1 }) // Order by asc

        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});
// Get income by client
router.get("/income/product/byclient", async (req, res) => {
   
    const client = req.query.email;

    const query = {};
    console.log(client);
  

    if (client) {
        query["userEmail"] = {
            $in: client
        };
      }

    try {
        const income = await Order.find(query)
        // .sort({ createdAt: 1 }) // Order by asc

        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});
// Get income entre fechas y por cliente
router.get("/income/date/client", async (req, res) => {
   
    const minDate = req.query.min;
    const maxDate = req.query.max;
    const email = req.query.email;

    const query = {};
    console.log(minDate);
    console.log(maxDate);
    console.log(email);


    if (minDate && maxDate && email) {
        query["createdAt"] = {
            $gte: new Date(minDate).toISOString(),
            $lte: new Date(maxDate).toISOString()
        },
        query["userEmail"] = {
            $in:email
        };
      }

    try {
        const income = await Order.find(query);
        // .sort({ createdAt: -1 }) // Order by desc

        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

module.exports = router;