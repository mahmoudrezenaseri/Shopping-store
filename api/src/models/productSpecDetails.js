const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSpecDetails = Schema(
    {
        name: { type: String, required: true },
        label: { type: String, required: false },
        specs: { type: Schema.Types.ObjectId, ref: 'ProductSpecs', required: true }
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("ProductSpecDetails", ProductSpecDetails);