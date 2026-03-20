const Show = require("../pkg/shows/showSchema");
const crypto = require("crypto");
const sendEmail = require("./email");
const User = require("../pkg/user/userSchema");
const jwt = require("jsonwebtoken");
exports.getLogin = async (req, res) => {
    try {
        res.status(200).render("login", {
            naslov: "Login form"
        });
    } catch (error) {
        res.status(400).send("ERROR");
    }
};

exports.viewShows = async (req, res) => {
    try {
        const shows = await Show.find();

        res.status(200).render("viewShows", {
            status: "Success",
            title: "Shows platform",
            subtitle: "Stream and watch shows",
            shows,
        });
    } catch (error) {
        res.status(500).send("ERROR");
    }
};
exports.viewShow = async (req, res) => {
    try {
        const show = await Show.findById(req.params.id);
        res.status(200).render("viewShow", {
            status: "Success",
            title: "Single show",
            show
        });
    } catch (error) {
        res.status(500).send("ERROR",);
    }
};

exports.mineShows = async (req, res) => {
    try {
        const author = req.user.id;
        const shows = await Show.find({ author: author });
        res.status(200).render("authorShows", {
            status: "Success",
            title: "Shows by author",
            shows

        });
    } catch (error) {
        res.status(500).send("ERROR",);
    }
};


exports.getForgotPasswordForm = async (req, res) => {
    try {
        res.status(200).render("forgotPassword", {
            title: "Forgot password"
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

exports.submitForgotPasswordForm = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).render("forgotPassword", {
                title: "Invalid user"
            });
        }
        // 2. generirame resetiracki token

        const token = crypto.randomBytes(32).toString("hex");

        // 3. generiraniot resetiracki token go hashirame i go vmetnuvame vo data baza kaj korisnikot
        user.passwordResetToken = crypto.createHash("sha256").update(token).digest("hex");
        // 4. Generirame vreme na resetirackiot token
        user.passwordResetExpires = Date.now() + 30 * 60 * 1000;
        // 5. novo komponiranite filda gi zacuvuvame vo data baza
        await user.save({ validateBeforeSave: false });
        // 6. Kreirame resetiracki link
        const resetUrl = `${req.protocol}://${req.get("host")}/resetPassword/${token}`;
        const message = `Your link to reset your password: ${resetUrl}`;


        await sendEmail({
            email: user.email,
            subject: "Your password reset token (valid for 30 mins)",
            message: message,

        });

        return res.status(200).render("forgotPassword", {
            title: "Success"
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getResetPasswordForm = async (req, res) => {
    try {
        res.status(200).render("resetPassword", {
            title: "Reset link",
            token: req.params.token
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.submitNewPassword = async (req, res) => {
    try {
        const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).send("token invalid or expired");
        }

        user.password = req.body.password;
        user.passwordResetExpires = undefined;
        user.passwordResetToken = undefined;

        await user.save();
        const jwtToken = jwt.sign(
            { id: user.id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES,
            },
        );

        res.cookie("jwt", jwtToken, {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            secure: false,
            httpOnly: true,
        });

        res.status(200).render("resetSuccess", {
            title: "Success",
            message: "Your password has beeen reset succesfully",
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};