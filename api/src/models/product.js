const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const Product = Schema(
    {
        fname: { type: String, required: true },
        ename: { type: String, required: true },
        original: { type: String, required: false },
        description: { type: String, required: false },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
        attribute: [{
            color: { type: String, required: true },
            price: { type: String, required: true },
            stock: { type: Number, required: true },
            discount: { type: Number, required: true },
            seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
            warranty: { type: Schema.Types.ObjectId, ref: 'Warranty', required: true }
        }],
        detail: [{
            value: { type: String, required: true },
            label: { type: String, required: false },
            specDetail: { type: Schema.Types.ObjectId, ref: 'ProductSpecDetails', required: true }
        }],
        image: [{ type: Schema.Types.ObjectId, ref: 'FileManager', required: true }],
    },
    {
        timestamps: true,
    }
);

Product.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", Product);