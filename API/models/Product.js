const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: { type:String, required:true },
        desc: { type:String, required:true },
        img: { type:String, required:true },
        categories: { type:Array },
        width: { type:Number },
        height: { type:Number },
        depth: { type:Number },
        color: { type:Array },
        price: { type:Number, required:true },
        inStock: {type: Boolean, default: true },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);