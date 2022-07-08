const Remito = require("../models/Remito");

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken");
const router = require("express").Router();
 



//CREATE
router.post("/add", async (req, res) => {
    const newRemito = new Remito(req.body);
  
    try {
      const savedRemito = await newRemito.save();
      res.status(200).json(savedRemito);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//UPDATE
router.put("/:id", async (req, res) => {
    try {
        const updatedRemito = await Remito.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        });
        res.status(200).json(updatedRemito);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Remito.findByIdAndDelete(req.params.id)
        res.status(200).json("Remito has been deleted.")
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER REMITOS
router.get("/get/:userId", async (req, res) => {
    try {
        
        const remitos = await Remito.find({
            userId: req.params.userId
        });

        res.status(200).json({
            remitos
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET REMITOS BY ID
router.get("/getbyid/:_id", async (req, res) => {
    try {
        var ObjectId = require('mongoose').Types.ObjectId; 
        const remitos = await Remito.findOne({
            _id: new ObjectId(req.params._id)
        });
        console.log(req.params._id);
        res.status(200).json({
            remitos
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL REMITOS // verifyTokenAndAdmin eliminado por el momento
router.get("/", async (req, res) => {
    try {
        const remitos = await Remito.find();

        res.status(200).json({
            remitos
        });
    } catch (err) {
        res.status(500).json(err);
    }
});





module.exports = router;