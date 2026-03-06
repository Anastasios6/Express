const jwt = require("jsonwebtoken");
const User = require("../pkg/user/userSchema");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        });
        const token = jwt.sign(
            { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES
            }
        );
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            secure: false,
            httpOnly: true,
        });
        res.status(200).json({
            status: "Success",
            token
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body; //es6

        // 1. Proveruvame dali ima vneseno pasvord ili email
        if (!email || !password) {
            return res.status(400).send("Please provide email and password!");
        }

        // 2. Proveruvame dali korisnkot posti
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }

        // 3. Sporeduvanje na password
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send("Invalid email or password!");
        }

        //4. kje generirame i ispratime token
        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES,
            },
        );

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            secure: false,
            httpOnly: true,
        });

        res.status(200).json({
            status: "success",
            token,
        });

    } catch (error) {
        res.status(400).send(error.message);

    }
};


exports.protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        };
        if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            res.status(400).send("You are not logged in.Please log in first");
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        const userAuth = await User.findById(decoded.id);
        if (!userAuth) {
            res.status(401).send("User doesn't longer exist");
        }
        req.user = userAuth;
        next();
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.restrict = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(401).send("You don't have access");
        }
        next();
    };
};