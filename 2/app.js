const express = require("express");
const app = express();
const db = require("./pkg/db/db");
const destination = require("./handler/destionation");
const auth = require("./handler/user");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.init();

app.post("/destinations/login", auth.login);
app.post("/destinations/signup", auth.signup);



app.post("/destinations", auth.protect, auth.restrict("admin"), destination.createDestination);

app.get("/destinations", destination.getAll);
app.get("/destinations/:id", destination.getOne);

app.patch("/destinations/:id", auth.protect, auth.restrict("admin"), destination.update);

app.delete("/destinations/:id", auth.protect, auth.restrict("admin"), destination.delete);


app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err.message);
    }
    console.log(`Service started on port ${process.env.PORT}`);
});
