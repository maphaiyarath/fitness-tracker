const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    weight: Number,
    reps: Number,
    sets: Number,
    distance: Number
});

// required: "Enter Type",

const workoutSchema = new Schema({
    day: {
        type: Date
    },
    exercises: [exerciseSchema]
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;