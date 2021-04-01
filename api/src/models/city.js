const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const City = Schema(
    {
        provinceId: { type: Schema.Types.ObjectId, required: true },
        fname: { type: String, required: true },
        ename: { type: String, required: false },
        code: { type: String, required: false },
        active: { type: Boolean, required: true, default: true },

    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("City", City);