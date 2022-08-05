// Import the request library
const request = require('request');

// Return the IP address of the user
const fetchMyIP = function(callback) {

  // Request your IP address from the ipify.org site
  request('https://api.ipify.org?format=json', (error, response, body) => {
    
    // If there is an error, return it in the callback function
    if (error) {
      callback(error, null);
      return;
    }

    // If there is an error of code 200, return it in the callback function
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    // Get the IP address
    let data = JSON.parse(body);
    let ip = data.ip;

    // Pass the IP in the callback function
    callback(null, ip);
  });
};


// Return the longitude and latitude coordinates given an IP address
const fetchCoordsByIP = function(ip, callback) {

  // Request your coordinates from the ipwho site
  request(`http://ipwho.is/${ip}`, (error, response, body) => {

    // If there is an error, return it in the callback function
    if (error) {
      callback(error, null);
      return;
    }

    // Save the data as a JSON object
    const parsedBody = JSON.parse(body);

    // Check is success is false, if so return an error
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    // Get the coordinates address
    let longitude = JSON.parse(body).longitude;
    let latitude = JSON.parse(body).latitude;
    let coordinates = {"longitude": longitude, "latitude": latitude};

    // Pass the coordinates in the callback function
    callback(null, coordinates);
  });
};


// Return an array of flyover times given latitude and logitude coordinates
const fetchISSFlyOverTimes = function(coords, callback) {

  // Get the coordinates
  let latitude = coords.latitude;
  let longitude = coords.longitude;

  // Request the flyover times from this url
  request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
      
    // If there is an error, return it in the callback function
    if (error) {
      callback(error, null);
      return;
    }

    // If there is an error of code 200, return it in the callback function
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Flyover Times: ${body}`), null);
      return;
    }

    // Save the data as a JSON object
    const parsedBody = JSON.parse(body);
  
    // Get the flyover times from the parsed body
    let flyoverTimes = parsedBody.response;

    // Return the flyover times array in the callback
    callback(null, flyoverTimes);
  });
};



// Print all of the flyover times to the console
const printPassTimes = function(flyoverTimes) {

  // Iterate through the pass times
  for (let flyoverTime of flyoverTimes) {

    // Convert the unix time to a date
    const datetime = new Date(0);
    datetime.setUTCSeconds(flyoverTime.risetime);

    // Get the fligth duration
    const flightDuration = flyoverTime.duration;

    // Print the time to the console
    console.log(`Next pass at ${datetime} for ${flightDuration} seconds!`);
  }
};




// Export the fetchMyIP function
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, printPassTimes };