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
        attribute: [{ type: Schema.Types.ObjectId, ref: 'ProductAttribute', required: true }],
        detail: [{ type: Schema.Types.ObjectId, ref: 'ProductSpecDetailValue', required: true }],
        image: [{ type: Schema.Types.ObjectId, ref: 'FileManager', required: true }],
    },
    {
        timestamps: true,
    }
);

Product.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", Product);