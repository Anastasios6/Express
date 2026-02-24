const mongoose = require("mongoose");


const actorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must have a name"],
    },
    birthDate: {
        type: Number,
        min: 1965,
        max: new Date().getFullYear(),
        required: [true, "Must have a birthdate"]
    },
    Rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    slika: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/8/83/Default-Icon.jpg",
    },
});

const Actor = mongoose.model("Actor", actorsSchema);
module.exports = Actor;