const Show = require("../pkg/movie/showSchema");


exports.createMovie = async (req, res) => {
    try {
        // console.log("req body", req.body);

        const show = await Show.create(req.body);
        res.status(200).json({
            status: "Success",
            data: {
                show,
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        const shows = await Show.find();
        res.status(200).json({
            status: "Success",
            data: {
                shows
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        });

    }
};

exports.getOne = async (req, res) => {
    try {
        const show = await Show.findById(req.params.id);
        res.status(200).json({
            status: "Success",
            data: {
                show
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        });
    }
};

exports.update = async (req, res) => {
    try {
        const show = await Show.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true,
        });
        res.status(200).json({
            status: "Success",
            data: {
                show
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        });
    }
};
exports.delete = async (req, res) => {
    try {
        const show = await Show.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "Success",
            data: {
                show
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        });
    }
};
exports.createByUser = async (req, res) => {
    try {
        console.log(req.body, "body");
        console.log(req.user.id, "id");


        const show = await Show.create({
            title: req.body.title,
            year: req.body.year,
            imdbRating: req.body.imdbRating,
            author: req.user.id
        });
        res.status(201).json(show);
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

exports.getByUser = async (req, res) => {
    try {
        const author = req.user.id;
        const myShows = await Show.find({ author: author });
        res.status(200).json({ myShows });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};