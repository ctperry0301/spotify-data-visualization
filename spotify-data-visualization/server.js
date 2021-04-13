var request = require('request');
var credentials = require('./client-credentials.json');

/**
 * Authenticates a user based on credentials given in client-credentials.json
 * 
 * Returns the access token
 */
const login = () => {
   var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (credentials.client_id + ':' + credentials.client_secret).toString('base64')
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
   };

   request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200)
         return body.access_token;
   });
};

/**
 * Retrieves information on jmperezperez and logs it to the console
 * 
 * @param {*} token: access token 
 */
const getJmPerez = (token) => {
   var options = {
      url: 'https://api.spotify.com/v1/users/jmperezperez',
      headers: {
      'Authorization': 'Bearer ' + token
      },
      json: true
   };
   request.get(options, function(error, response, body) {
      console.log(body);
   });
};

/**
 * Retrieves n featured playlists and logs it to the console
 * 
 * @param {*} token: access token 
 * @param {Number} n: number of playlists to be retrieved (1-50 inclusive)
 */
const getFeaturedPlaylists = (token, n) => {
   var options = {
      url: 'https://api.spotify.com/v1/browse/featured-playlists',
      headers: {
      'Authorization': 'Bearer ' + token
      },
      json: true
   };
   request.get(options, function(error, response, body) {
      console.log(body);
   });
};

module.exports = { login, getJmPerez, getFeaturedPlaylists };