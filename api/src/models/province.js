const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const Province = Schema(
    {
        fname: { type: String, required: true },
        ename: { type: String, required: false },
        code: { type: String, required: false },
        active: { type: Boolean, required: true, default: true },
        city: [{
            fname: { type: String, required: true },
            ename: { type: String, required: true },
            code: { type: String, required: false },
            active: { type: Boolean, required: true, default: true }
        }]
    },
    {
        timestamps: true,
    }
);

Province.plugin(mongoosePaginate);

module.exports = mongoose.model("Province", Province);