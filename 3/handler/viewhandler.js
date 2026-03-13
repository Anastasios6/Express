const Show = require("../pkg/shows/showSchema");


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