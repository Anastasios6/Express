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
        const token = jwt.sign({
            id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role,
        }, process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES
            }
        );
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            secure: false,
            httpOnly: true,
        });
        res.status(201).json({
            status: "Success SIGNUP",
            token,
            data: {
                user: newUser
            }
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).send("Please provide email and password");
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).send("invalid email or password");
        };
        const passValidation = bcrypt.compareSync(password, user.password);
        if (!passValidation) {
            return res.status(401).send("Invalid email or password");
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            secure: false,
            httpOnly: true,
        });
        res.status(200).json({
            status: "Success token",
            token,
        });

    } catch (error) {
        return res.status(400).send(error.message);
    }
};


exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            res.status(400).send("You are not logged in.Please log in first.");
        }


        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);



        const userAuth = await User.findById(decoded.id);
        if (!userAuth) {
            return res.status(400).send("User doesn't exist");
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
            return res.status(400).send("You don't have access");
        }
        next();
    };
};