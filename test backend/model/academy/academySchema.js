const mongoose = require("mongoose");

const academySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Academy name is required"],
    },
    address: {
        type: String,
        required: [true, "Academy address is required"],
    },
});

const Academy = mongoose.model("Academy", academySchema);

module.exports = Academy;