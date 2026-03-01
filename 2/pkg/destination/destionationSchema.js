const mongoose = require("mongoose");


const destionationSchema = new mongoose.Schema({
    destination: {
        type: String,
    },
    date: {
        type: String,
        required: [true, "Insert availability from"]
    },
    pictures: {
        type: String,
        required: [true, "Insert a picture"],
    },
    package: {
        type: String,
        enum: ["BB", "HB", "FB"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    }
});

const destination = mongoose.model("destination", destionationSchema);
module.exports = destination;


