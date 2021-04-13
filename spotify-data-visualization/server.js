var request = require('request');

var credentials = require('./backend/client-credentials.json');

var authOptions = {
   url: 'https://accounts.spotify.com/api/token',
   headers: {
     'Authorization': 'Basic ' + (new Buffer(credentials.client_id + ':' + credentials.client_secret).toString('base64'))
   },
   form: {
     grant_type: 'client_credentials'
   },
   json: true
};

request.post(authOptions, function(error, response, body) {
   if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
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
   }
});