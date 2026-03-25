const Course = require("../model/course/courseSchema");

exports.createCourse = async (req, res) => {
    try {
        const newCourse = await Course.create(req.body);
        res.status(200).json({
            status: "Successfully created a new course",
            data: {
                newCourse
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find();
        res.status(200).json({
            status: "Success",
            data: {
                allCourses
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

exports.getOneCourse = async (req, res) => {
    try {
        const oneCourse = await Course.findById(req.params.id);
        res.status(200).json({
            status: "Success",
            data: {
                oneCourse
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true
        });
        res.status(200).json({
            status: "Success",
            data: {
                course
            }
        });

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "Successfully deleted a course",
            data: {
                course
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed to delete a course",
            message: error.message
        });
    }
};