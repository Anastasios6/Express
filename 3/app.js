const express = require("express");
const app = express();
const db = require("./pkg/db/db");
const show = require("./handler/show");
const auth = require("./handler/auth");
const cookieParser = require("cookie-parser");
const logs = require("./utils/logger");
const view = require("./handler/viewhandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");



db.init();
//login
app.post("/show/signup", auth.signup);
app.post("/show/login", auth.login);


//CRUD
app.post("/show", auth.protect, logs, auth.restrict("admin"), show.createMovie);
app.get("/show", logs, show.getAll);
app.get("/show/:id", logs, show.getOne);
app.patch("/show/:id", auth.protect, logs, auth.restrict("admin"), show.update);
app.delete("/show/:id", auth.protect, logs, auth.restrict("admin"), show.delete);

app.get("/me", auth.protect, logs, show.getByUser);
app.post("/createbyuser", auth.protect, logs, show.createByUser);

app.get("/login", view.getLogin);




app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("could not start a service");
    } console.log(`Service started successfully on ${process.env.PORT}`);
});
