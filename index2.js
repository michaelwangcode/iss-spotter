// Import functions from iss_promised.js
const { nextISSTimesForMyLocation } = require('./iss_promised');


// Print all of the flyover times to the console
const printPassTimes = function(flyoverTimes) {

  // Iterate through the pass times
  for (let flyoverTime of flyoverTimes) {

    // Convert the unix time to a date
    const datetime = new Date(0);
    datetime.setUTCSeconds(flyoverTime.risetime);

    // Get the flight duration
    const flightDuration = flyoverTime.duration;

    // Print the time to the console
    console.log(`Next pass at ${datetime} for ${flightDuration} seconds!`);
  }
};



// Call the function that displays all flyover times
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });