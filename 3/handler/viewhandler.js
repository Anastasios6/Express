exports.getLogin = async (req, res) => {
    try {
        res.status(200).render("login", {
            naslov: "Login form"
        });
    } catch (error) {
        res.status(400).send("ERROR");
    }
};