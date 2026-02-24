const express = require("express");
const db = require("./pkg/db/db");
const actors = require("./handlers/actor");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.init();

app.post("/actors", actors.createActor);
app.get("/actors", actors.actorsList);
app.get("/actors/:id", actors.singleActor);
app.patch("/actors/:id", actors.updateActor);
app.delete("/actors/:id", actors.deleteActor);



app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err.message);
    } console.log(`started on port ${process.env.PORT}`);
});