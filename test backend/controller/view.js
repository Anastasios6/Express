const Courses = require("../model/course/courseSchema");

exports.testRoute = async (req, res) => {
    try {
        res.status(200).render("test", {
            heading: "Тест за backend развој на софтвер"
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.welcome = async (req, res) => {
    try {
        const courses = await Courses.find();
        res.status(200).render("courses", {
            title: "Сите курсеви",
            courses: courses
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};