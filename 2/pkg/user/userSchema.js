const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, "email is required"],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, "Please insert a valid email address"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 8,
        validate: [validator.isStrongPassword, "Your password must be strong"]
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;
    {
        this.password = await bcrypt.hash(this.password, 12);
    }
});

const user = mongoose.model("user", userSchema);
module.exports = user;
