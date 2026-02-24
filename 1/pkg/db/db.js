const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: `${__dirname}/../../config.env` });
const DB = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD);

exports.init = async () => {
    try {
        await mongoose.connect(DB);
    } catch (error) {
        console.log(error.message);
    }
};