const destination = require("../pkg/destination/destionationSchema");
exports.createDestination = async (req, res) => {
    try {
        const Dest = await destination.create(req.body);
        res.status(201).json({
            status: "Successfully created a destination",
            data: {
                Dest
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed in creating a destination",
            message: error.message
        });
    }
};
exports.getAll = async (req, res) => {
    try {
        const Dest = await destination.find();
        res.status(200).json({
            status: "Success in getting all destinations",
            data: {
                Dest
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed in getting all destinations",
            message: error.message
        });
    }
};
exports.getOne = async (req, res) => {
    try {
        const Dest = await destination.findById(req.params.id);
        res.status(200).json({
            status: "Success in finding a single destination",
            data: {
                Dest
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed in getting a single destination",
            message: error.message
        });
    }
};

exports.update = async (req, res) => {
    try {
        const Dest = await destination.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true,
        });
        res.status(200).json({
            status: "Successfully updated",
            data: {
                Dest
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed update",
            message: error.message
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const Dest = await destination.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "Successfully deleted",
            data: {
                Dest
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed to delete",
            message: error.message
        });
    }
};
