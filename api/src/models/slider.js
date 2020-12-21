const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const Slider = Schema(
    {
        name: { type: String, required: true },
        isDefault: { type: Boolean, default: false },
        image: [{ type: Schema.Types.ObjectId, ref: 'FileManager', required: true }],
    },
    {
        timestamps: true,
    }
);

Slider.plugin(mongoosePaginate);

module.exports = mongoose.model("Slider", Slider);