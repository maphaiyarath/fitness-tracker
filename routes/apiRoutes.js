const db = require("../models/");

module.exports = function(app) {

    // post api workouts
    app.post("/api/workouts", ({ body }, res) => {
        db.Workout.create(body).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

    // get api workouts
	app.get("/api/workouts", (req, res) => {
        db.Workout.find({}).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

    // put api workouts id
    app.put("/api/workouts/:id", function(req, res) {
        db.Workout.updateOne(
            { _id : req.params.id },
            { $push: { exercises: req.body } }
        ).then(function(dbWorkout) {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

    // get api workouts range
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({}).sort({ 'day' : -1 }).limit(7).then(dbWorkout => {
            res.json(dbWorkout.reverse());
        }).catch(err => {
            res.json(err);
        });
    });


/*
    app.post("/submit", ({body}, res) => {
        db.Book.create(body).then(({_id}) => {
            db.Library.findOneAndUpdate({}, { $push: { books: _id } }, { new: true });
        }).then(dbLibrary => {
            res.json(dbLibrary);
        }).catch(err => {
            res.json(err);
        });
    });

    app.get("/api/workouts/:id", (req, res) => {
        Workout.find({}).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

    app.get("/exercise/:id", (req, res) => {
        Workout.find({}).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });
    */
};