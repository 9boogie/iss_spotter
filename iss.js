const request = require('request');
const url = 'https://api.ipify.org?format=json';


const fetchMyIP = function(callback) {
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Cod is ${response.statusCode} when fetching IP. Respone: ${body}`;
      callback(Error(msg),null);
      return;
    }
    const data = JSON.parse(body).ip;
    callback(null, data);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Cod is ${response.statusCode} when fetching IP. Respone: ${body}`;
      callback(Error(msg),null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body).data;
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Cod is ${response.statusCode} when fetching IP. Respone: ${body}`;
      callback(Error(msg),null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };