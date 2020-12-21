const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const Banner = Schema(
    {
        isDefault: { type: Boolean, required: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        image: { type: Schema.Types.ObjectId, ref: 'FileManager', required: true }
    },
    {
        timestamps: true,
    }
);

Banner.plugin(mongoosePaginate);

module.exports = mongoose.model("Banner", Banner);