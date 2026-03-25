const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    area: {
        type: String,
        required: [true, "Area is required"]
    }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;