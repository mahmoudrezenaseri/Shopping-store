const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const Product = Schema(
    {
        fname: { type: String, required: true },
        ename: { type: String, required: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
        warranty: { type: Schema.Types.ObjectId, ref: 'Warranty', required: true },
        seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
        description: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

Product.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", Product);