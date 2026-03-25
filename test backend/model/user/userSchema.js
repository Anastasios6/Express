const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        validate: [validator.isEmail],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must have at least 6 characters"],
        validate: [validator.isStrongPassword, "Password must be secure"]
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    }
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);
module.exports = User;