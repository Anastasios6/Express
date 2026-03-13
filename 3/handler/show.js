const Show = require("../pkg/shows/showSchema");
const multer = require("multer");
const uuid = require("uuid");

const imageID = uuid.v4();

const multerStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/img/shows");
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split("/")[1];
        callback(null, `show-${imageID}-${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback(new Error("file type not supported"), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadShowPhoto = upload.single("photo");

exports.createMovie = async (req, res) => {
    try {
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
        const shows = await Show.find().populate("author");
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
        console.log(req.file);

        if (req.file) {
            const filename = req.file.filename;
            req.body.picture = filename;
        }

        const show = await Show.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: "after",
            runValidators: true,
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