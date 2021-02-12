const db = require("../models/");

module.exports = function(app) {

    // get api workouts
	app.get("/api/workouts", (req, res) => {
        db.Workout.find({}).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

    // post api workouts
    app.post("/api/workouts", ({ body }, res) => {
        db.Workout.create(body).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

    // get api workouts range

    // put api workouts id

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

    app.get("/api/workouts/range", (req, res) => {
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

    /*
  app.put("/api/images/:id", function(req, res) {
    db.Image.updateOne(
      { _id: req.params.id },
      { rating: req.body.rating }
    ).then(function(dbImage) {
      res.json(dbImage);
    });
  });
    */
};