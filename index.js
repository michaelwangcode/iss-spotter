// Import the iss.js functions
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, printPassTimes } = require('./iss');



//----- Execute the fetchMyIP function -----//
fetchMyIP((error, ip) => {

  // If there is an error, print the error
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  // Print the IP
  console.log('It worked! Returned IP:' , ip);



  //----- Execute the fetchCoordsByIP function -----//
  fetchCoordsByIP(ip, (error, coordinates) => {

    // If there is an error, print the error
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }

    // Print the coordinates
    console.log("It worked! Returned coordinates:",  coordinates);



    //----- Execute the fetchISSFlyOverTimes function -----//
    fetchISSFlyOverTimes(coordinates, (error, flyoverTimes) => {

      // If there is an error, print the error
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }

      // Print the coordinates
      console.log("It worked! Flyover times:",  flyoverTimes);

      // Print the flyover times to the console
      printPassTimes(flyoverTimes);
    });
  });
});



