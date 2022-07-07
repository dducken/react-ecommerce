const router = require("express").Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken");
const KEY = "sk_test_51L6HFJJ04JKDTiLjp0aViODicS4NhTPPGcrsfR4kOGRMCPXWfW2AjIoPD11qOoUM3aEozEvWwvl65DFy1t74jZAj00vdDQaiA1";
require("dotenv").config();
const stripe = require("stripe")(KEY);

// Esta forma funca pero no como quiero
router.post("/payment", async (req, res) => {
    
    try {
        
        const customer = await stripe.customers.create({
            email: req.body.StripeEmail,
            source: req.body.tokenId
        });
        const charge = await stripe.charges.create({
            // source:req.body.tokenId,
            amount: req.body.amount,
            currency: "ars",
            customer: customer.id,
            description: req.body.products[0].title,
        });
   
        const address = charge.billing_details.address;
   

        res.status(200).json(address);
    } catch (error) {
        res.status(400).json("Payment error");

    }

})
// router.post("/payment",async (req,res)=>{
//     const line_items = req.body.cartItems.map((item) => {
//         return {
//             price_data: {
//                 currency: "ars",
//                 product_data: {
//                     name: item.name,
//                     images: [item.img],
//                     description: item.desc,
//                     metadata:{
//                         id: item.id
//                     }
//                 },
//                 unit_amount: item.price * 100,
//             },
//             quantity: item.cart.quantity,
//         }
//     });

//     try {
//         const session = await stripe.checkout.sessions.create({
//             line_items,
//             mode: "payment",
//             success_url: `${process.env.CLIENT_URL}/success`,
//             cancel_url: `${process.env.CLIENT_URL}/cart`
//         });

//         res.send({url: session.url});
//     } catch (error) {
//         res.status(400).json("error de stripe");

//     }
// });


module.exports = router;