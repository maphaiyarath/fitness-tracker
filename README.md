[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/maphaiyarath/fitness-tracker)
# NoSQL: Fitness Tracker

![Fitness Tracker App](./public/og-fitness-tracker.png)

You can demo the app [here](https://maphaiyarath-fitness-tracker.herokuapp.com/).

## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Contributing](#contributing)

## Description
Reach your fitness goals more quickly with this Fitness Tracker to document your progress! This app was created with a Mongo database, uses a Mongoose schema, and handles routes with Express.

On the fitness tracker page, you can create workouts by:
- continuing to add exercises to your last workout
- adding exercises to a new workout

On the dashboard, you can view some stats, such as:
- the duration of each workout
- the combined weight of resistance exercises from each workout
- the durations of each exercise performed
- the max pounds lifted of resistance exercises

## Installation
Use the following command for installation:
```bash
npm install
```

To populate the database with `seed.js`, you can run the following:
```bash
node seeders/seed.js
```

## Usage
The application will be invoked by running:
```bash
node server.js
```

## Credits
* [Express.js](http://expressjs.com/)
* [Mongoose](https://www.npmjs.com/package/mongoose)

## License
This project is licensed under the MIT license.

## Contributing
n/a