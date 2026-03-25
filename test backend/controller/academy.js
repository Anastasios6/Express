const Academy = require("../model/academy/academySchema");

exports.createAcademy = async (req, res) => {
    try {
        const academy = await Academy.create(req.body);
        res.status(200).json({
            status: "Success",
            data: {
                academy
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

exports.getOneAcademy = async (req, res) => {
    try {
        const oneAcademy = await Academy.findById(req.params.id);
        res.status(200).json({
            status: "Failed",
            data: {
                oneAcademy
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

exports.getAllAcademies = async (req, res) => {
    try {
        const academies = await Academy.find();
        res.status(200).json({
            status: "Success",
            data: {
                academies
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

exports.updateAcademy = async (req, res) => {
    try {
        const academy = await Academy.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true
        });
        res.status(200).json({
            status: "Success",
            data: {
                academy
            }
        });

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

exports.deleteAcademy = async (req, res) => {
    try {
        const academy = await Academy.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "Success",
            data: {
                academy
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};