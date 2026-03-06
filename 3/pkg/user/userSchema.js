const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, "Please insert a valid email"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    password: {
        type: String,
        required: [true, "Must insert a password"],
        validate: [validator.isStrongPassword, "Password must be secure"],
        minLength: [4, "Must have at least 4 characters"],
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);


});

const User = mongoose.model("User", userSchema);
module.exports = User;