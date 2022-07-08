const mongoose = require("mongoose");

const remitoSchema = new mongoose.Schema(
    {
        userId: { type:String, required:true },
        userName: { type:String, required:true },
        products: [
            {
                productId: {
                    type: String,
                },
                title: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        address: { type: Object, required: true },
        status: { type: String, default: "pending" },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Remito", remitoSchema);