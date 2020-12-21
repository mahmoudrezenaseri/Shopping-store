const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const Warranty = Schema(
    {
        name: { type: String, required: true },
        label: { type: String, required: false }
    },
    {
        timestamps: true,
    }
);

Warranty.plugin(mongoosePaginate);

module.exports = mongoose.model("Warranty", Warranty);