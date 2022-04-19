const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: { type:String, required:true },
        desc: { type:String, required:true },
        img: { type:String, required:true },
        categories: { type:Array },
        width: { type:Number },
        height: {type:Number},
        depth: {type:Number},
        color: { type:String },
        price: { type:Number, required:true },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);