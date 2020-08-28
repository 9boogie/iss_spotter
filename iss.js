const request = require('request');
const url = 'https://api.ipify.org?format=json'


const fetchMyIP = function(callback) { 
  request(url, (error, response, body) => {
    if(error) {
      callback(error, null);
      return
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

module.exports = { fetchMyIP };