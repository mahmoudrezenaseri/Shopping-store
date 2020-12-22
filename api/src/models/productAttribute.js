const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductAttribute = Schema(
    {
        color: { type: String, required: true },
        price: { type: String, required: true },
        stock: { type: Number, required: true },
        discount: { type: Number, required: true },
        seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
        warranty: { type: Schema.Types.ObjectId, ref: 'Warranty', required: true }
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("ProductAttribute", ProductAttribute);