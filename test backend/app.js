const express = require("express");
const DB = require("./db");
const app = express();
const course = require("./controller/course");
const academy = require("./controller/academy");
const auth = require("./controller/auth");
const cookieParser = require("cookie-parser");
const view = require("./controller/view");




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");


DB.init();


app.post("/api/v1/courses", auth.protect, course.createCourse);
app.get("/api/v1/courses", course.getAllCourses);
app.get("/api/v1/courses/:id", course.getOneCourse);
app.patch("/api/v1/courses/:id", auth.protect, course.updateCourse);
app.delete("/api/v1/courses/:id", auth.protect, course.deleteCourse);

app.post("/api/v1/academies", auth.protect, academy.createAcademy);
app.get("/api/v1/academies", academy.getAllAcademies);
app.get("/api/v1/academies/:id", academy.getOneAcademy);
app.patch("/api/v1/academies/:id", auth.protect, academy.updateAcademy);
app.delete("/api/v1/academies/:id", auth.protect, academy.deleteAcademy);


app.post("/api/v1/signup", auth.signup);
app.post("/api/v1/login", auth.login);

app.get("/test", view.testRoute);
app.get("/welcome", view.welcome);


app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err.message);
    } console.log(`server started on ${process.env.PORT} `);

});