const mongoose = require("mongoose");

const ShowSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Must have a title"],
        trim: true,
        minlength: [1, "Title is too short"],
        maxlength: [255, "Title is too long"],
        unique: [true, "It must have unique Title"],
    },
    year: {
        type: Number,
        min: 1800,
        max: new Date().getFullYear(),
    },
    imdbRating: {
        type: Number,
        min: 0,
        max: 10,
    },
    picture: {
        type: String,
        default: "default.jpg",
    },
    sliki: {
        type: [String],
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }

});

const Show = mongoose.model("Show", ShowSchema);
module.exports = Show;