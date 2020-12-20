const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const Seller = Schema(
    {
        name: { type: String, required: true },
        label: { type: String, required: false },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    },
    {
        timestamps: true,
    }
);

Seller.plugin(mongoosePaginate);

module.exports = mongoose.model("Seller", Seller);