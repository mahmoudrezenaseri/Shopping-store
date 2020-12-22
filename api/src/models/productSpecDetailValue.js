const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSpecDetailsValue = Schema(
    {
        value: { type: String, required: true },
        label: { type: String, required: false },
        specDetail: { type: Schema.Types.ObjectId, ref: 'ProductSpecDetails', required: true }
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("ProductSpecDetailsValue", ProductSpecDetailsValue);