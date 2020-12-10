const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const FileManager = Schema({
    name: { type: String, required: true },
    dimWidth: { type: String },
    dimheight: { type: String },
    format: { type: String },
    dir: { type: String, required: true },
}, {
    timestamps: true
})

FileManager.plugin(mongoosePaginate);

module.exports = mongoose.model("FileManager", FileManager);
