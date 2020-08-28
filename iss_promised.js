const request = require('request-promise-native');
const url = 'https://api.ipify.org?format=json';

const fetchMyIP = function() {
  return request(url);
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`)
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body).data;
  const coords = { latitude, longitude };
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`)
}

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const passes = JSON.parse(body).response;
      return passes;
    })
}

module.exports = { /*fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, */nextISSTimesForMyLocation };

