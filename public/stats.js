function generatePalette() {
  const arr = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
  ];

  return arr;
}

function populateChart(data) {
  let workouts = workoutNames(data);
  let combinedDurs = calculateDurations(workouts, data);
  let durations = data.map(({ totalDuration }) => totalDuration);
  let pounds = calculateTotalWeight(data);
  let maxPounds = calculateMaxWeight(data);
  let maxPoundsData = maxPounds.thePounds, maxPoundsLabels = maxPounds.theLabels;
  const colors = generatePalette();

  let line = document.querySelector('#canvas').getContext('2d');
  let bar = document.querySelector('#canvas2').getContext('2d');
  let pie = document.querySelector('#canvas3').getContext('2d');
  let pie2 = document.querySelector('#canvas4').getContext('2d');

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const labels = data.map(({ day }) => {
    const date = new Date(day);
    return daysOfWeek[date.getDay()];
  });

  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Workout Duration In Minutes',
          backgroundColor: 'red',
          borderColor: 'red',
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        text: 'Workout Duration',
        display: true,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Pounds',
          data: pounds,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Pounds Lifted',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: 'pie',
    data: {
      labels: workouts,
      datasets: [
        {
          label: 'Exercises Performed',
          backgroundColor: colors,
          data: combinedDurs,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Duration of Exercises Performed (minutes)',
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: 'doughnut',
    data: {
      labels: maxPoundsLabels,
      datasets: [
        {
          label: 'Exercises Performed',
          backgroundColor: colors,
          data: maxPoundsData,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Max Pounds Lifted of Resistance Exercises',
      },
    },
  });
}

function calculateDurations(exerciseNames, data) {
  let durTotals = [];

  // create an array made of unique exercise names and a default duration of 0
  exerciseNames.forEach((name) => {
    durTotals.push({
      workoutName: name,
      duration: 0
    });
  });

  // for each exercise in a workout, update the duration
  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      // find the object in the durTotals with the same name
      let durTotalObj = durTotals.find(obj => obj.workoutName === exercise.name);

      // add onto the duration
      durTotalObj.duration += exercise.duration;
    });
  });

  // just get the duration values and put them into an array
  let actualVals = [];
  durTotals.forEach((obj) => {
    actualVals.push(obj.duration);
  });

  return actualVals;
}

function calculateMaxWeight(data) {
  let maxes = [];

  // for each exercise in a workout, check to see if it's resistance
  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      if (exercise.type === 'resistance') {
        // if found in maxes array, update max if greater
        let found = maxes.find(obj => obj.label === exercise.name);
        if (found) {
          if (exercise.weight > found.lb) {
            found.lb = exercise.weight;
          }
        // otherwise, add new exercise/weight
        } else {
          maxes.push({
            label: exercise.name,
            lb: exercise.weight
          });
        }
      }
    });
  });

  // get the values we need
  let thePounds = [], theLabels = [];
  maxes.forEach((max) => {
    thePounds.push(max.lb);
    theLabels.push(max.label);
  });

  return { thePounds, theLabels };
}

function calculateTotalWeight(data) {
  let totals = [];

  data.forEach((workout) => {
    const workoutTotal = workout.exercises.reduce((total, { type, weight }) => {
      if (type === 'resistance') {
        return total + weight;
      } else {
        return total;
      }
    }, 0);
    totals.push(workoutTotal);
  });

  return totals;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      workouts.push(exercise.name);
    });
  });

  // return de-duplicated array with JavaScript `Set` object
  return [...new Set(workouts)];
}

// get all workout data from back-end
API.getWorkoutsInRange().then(populateChart);