const Actor = require("../pkg/actors/actorsSchema");
exports.createActor = async (req, res) => {
    const actor = await Actor.create(req.body);
    res.status(201).json({
        status: "Successfully created a actor",
        data: {
            actor
        }
    });
};
exports.actorsList = async (req, res) => {
    try {
        const actors = await Actor.find();
        res.status(201).json({
            status: "Successfully getting actors list",
            data: {
                actors
            }
        });

    } catch (error) {
        res.status(501).json({
            status: "Failed retrieving the actors list",
            message: error.message,
        });
    }
};

exports.singleActor = async (req, res) => {
    try {
        const actor = await Actor.findById(req.params.id,);
        res.status(201).json({
            status: "Successfully getting a single actor",
            data: {
                actor
            }
        });

    } catch (error) {
        res.status(501).json({
            status: "Failed to retrieve a single actor",
            message: error.message
        });
    }
};



exports.updateActor = async (req, res) => {
    try {
        const actor = await Actor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(201).json({
            status: "Successfully updated actor",
            data: {
                actor
            }
        });

    } catch (error) {
        res.status(501).json({
            status: "Failed to update actor",
            message: error.message
        });
    }
};

exports.deleteActor = async (req, res) => {
    try {
        const actor = await Actor.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: "Successfully deleted a actor",
            data: {
                actor
            }
        });

    } catch (error) {
        res.status(501).json({
            status: "Failed to delete a actor",
            message: error.message
        });
    }
};
