const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSpecs = Schema(
    {
        name: { type: String, required: true },
        label: { type: String, required: false },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("ProductSpecs", ProductSpecs);