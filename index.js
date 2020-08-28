const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');


/*
nextISSTimesForMyLocation((error, passTimes) => {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    //console.log('It worked! Returned IP:' , ip);
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
    
      //console.log('It worked! Returned Coordinates:' , coords);
      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) {
          console.log("It didn't work!" , error);
          return;
        }
      
        console.log('It worked! Returned Rise Times:' , times);
      });
    });
  });

  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});

*/

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    console.log(datetime);
    datetime.setUTCSeconds(pass.risetime);
    console.log(datetime.setUTCSeconds(pass.risetime))
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  
  printPassTimes(passTimes);
});