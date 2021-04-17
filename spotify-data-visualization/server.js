var request = require('request');
var credentials = require('./client-credentials.json');

// Visual of data from playlists

var authOptions = {
   url: 'https://accounts.spotify.com/api/token',
   headers: {
     'Authorization': 'Basic ' + (Buffer.from(credentials.client_id + ':' + credentials.client_secret).toString("base64"))
   },
   form: {
     grant_type: 'client_credentials'
   },
   json: true
};

const getSongTitles = (trackCount, token) => {
   let trackInfo = {};
   Object.keys(trackCount).forEach((id) => {
      var config = {
         url: 'https://api.spotify.com/v1/tracks/' + id,
         headers: {
            'Authorization': 'Bearer ' + token
         },
         json: true
      }

      request.get(config, (error, response, body) => {
         let trackName = body.name && body.name.toString();
         if (trackInfo.hasOwnProperty(trackName))
            trackInfo[trackName] += 1;
         else
            trackInfo[trackName] = 1;
      })
   })
   setTimeout(() => console.log(trackInfo), 5000);
}

const doEverything = () => {
   request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var token = body.access_token;
        var options = {
          url: 'https://api.spotify.com/v1/browse/featured-playlists',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };

        request.get(options, function(error, response, body) {
           let trackCount = {};
           let playlistArr = body.playlists.items;
           playlistArr.forEach(playlist => {
              var config = {
                 url: playlist.tracks.href,
                 headers: {
                    'Authorization': 'Bearer ' + token
                 },
                 json: true
              }
              request.get(config, (error, response, body) => {
                 let trackList = body.items;
                 trackList.forEach(track => {
                    let trackID = track.track.id;
                    if (trackCount.hasOwnProperty(trackID))
                       trackCount[trackID] += 1;
                    else
                       trackCount[trackID] = 1;
                 });
              })
           });
           setTimeout(getSongTitles, 10000, trackCount, token);
        });
      }
   });
}

doEverything();

module.exports = { doEverything };