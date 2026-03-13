const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./pkg/db/db");
const show = require("./handler/show");
const auth = require("./handler/auth");
const view = require("./handler/viewhandler");

const app = express();
const logs = require("./utils/logger");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");


db.init();
app.get("/", (req, res) => {
    res.redirect("/login");
});
//login
app.post("/show/signup", auth.signup);
app.post("/show/login", auth.login);


//CRUD
app.post("/show", auth.protect, logs, auth.restrict("admin"), show.createMovie);
app.get("/show", show.getAll);
app.get("/show/:id", show.getOne);
app.patch("/show/:id", auth.protect, logs, show.uploadShowPhoto, auth.restrict("admin"), show.update);
app.delete("/show/:id", auth.protect, logs, auth.restrict("admin"), show.delete);

app.get("/me", auth.protect, logs, show.getByUser);
app.post("/createbyuser", auth.protect, logs, show.createByUser);

app.get("/login", view.getLogin);
app.get("/viewshows", auth.protect, logs, view.viewShows);


app.get("/viewshows/:id", auth.protect, logs, view.viewShow);
app.get("/viewshows/mine/:id", auth.protect, logs, view.mineShows);



app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("could not start a service");
    } console.log(`Service started successfully on ${process.env.PORT}`);
});
