const User = require("../model/user/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");


exports.signup = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role

        });
        const token = jwt.sign(
            { name: req.body.name, email: req.body.email, password: req.body.password, role: req.body.role },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES
            }
        );
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000),
            secure: false,
            httpOnly: true
        });


        res.status(200).json({
            status: "Successfully created a account",
            token,
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(500).send("Please provide email or password");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(500).send("Invalid email or password");
        }
        const passValidation = bcrypt.compareSync(password, user.password);
        if (!passValidation) {
            return res.status(500).send("Invalid email or password");
        }
        const token = jwt.sign({
            id: user.id, name: user.name, email: user.email, role: user.role,
        }, process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES
            },
        );
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000),
            secure: false,
            httpOnly: true,
        });
        res.status(200).json({
            status: "Success",
            token,
        });

    } catch (error) {
        return res.status(500).send(err.message);

    }
};


exports.protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            res.status(500).send("Please log in first.");
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const userAuth = await User.findById(decoded.id);
        if (!userAuth) {
            return res.status(500).send("User doesn't longer exist");
        }
        req.user = userAuth;
        next();
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};



