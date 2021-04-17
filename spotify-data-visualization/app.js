const axios = require('axios');
const qs = require('qs');
const credentials = require('./client-credentials.json');

/**
 * Authenticates the user based on the client id and client secret id
 * 
 * @returns access token needed to hit other endpoints
 */
const authenticateCredentials = async () => {
   const authHeaders = {
      headers: {
         'Accept' : 'application/json',
         'Content-Type' : 'application/x-www-form-urlencoded'
      },
      auth: {
         username: credentials.client_id,
         password: credentials.client_secret
      }
   };
   
   const data = {
      'grant_type': 'client_credentials'
   };
   
   try {
      const res = await axios.post('https://accounts.spotify.com/api/token', qs.stringify(data), authHeaders);
      return res.data.access_token;
   } catch (error) {
      console.log(error);
   }
};

/**
 * Retrieves information on the top 20 featured playlists
 * 
 * @param {*} tokenHeader 
 * @returns object with information on the top 20 featured playlists
 */
const getFeaturedPlaylists = async (tokenHeader) => {
   try {
      const res = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', tokenHeader);
      return res.body;
   } catch (error) {
      console.log(error);
   }
};

/**
 * Iterates through playlistArr, creating an object with the track id and the number of
 * times it was found in playlistArr
 * 
 * @param {*} tokenHeader 
 * @param {*} playlistArr 
 * @returns object with each track id and the number of times it was found in playlistArr 
 */
const createTrackObject = async (tokenHeader, playlistArr) => {
   let trackCount = {};
   playlistArr.forEach(async playlist => {
      const res = await axios.get(playlist.tracks.href, tokenHeader);
      const trackList = res.body.items;
      trackList.forEach(track => {
         const trackID = track.track.id;
         if (trackCount.hasOwnProperty(trackID))
            trackCount[trackID] += 1;
         else
            trackCount[trackID] = 1;
      });
   });

   return trackCount;
};

/**
 * Retrieves track information based on track id from trackObject. Creates an object with a
 * track's name and the number of times it was found in playlistArr
 * 
 * @param {*} tokenHeader 
 * @param {*} trackObject 
 * @returns object with each track name and the number of times it was found in playlistArr 
 */
const getSongTitles = async (tokenHeader, trackObject) => {
   let trackInfo = {};
   Object.keys(trackCount).forEach(async id => {
      const res = await axios.get('https://api.spotify.com/v1/tracks' + id, tokenHeader);
      const trackName = res.body.name && res.body.name.toString();
      if (trackInfo.hasOwnProperty(trackName))
         trackInfo[trackName] += 1;
      else
         trackInfo[trackName] = 1;
   });

   return trackInfo;
};

/**
 * Main function
 * 
 * @returns object with each track name and the number of times it was found in playlistArr
 */
const doEverything = async () => {
   try {
      const token = await authenticateCredentials();
      const tokenHeader = {
         'Authorization': `Bearer ${token}`,
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      };

      const featuredPlaylists = await getFeaturedPlaylists(tokenHeader);
      const trackObject = await createTrackObject(tokenHeader, featuredPlaylists);
      const trackInfo = await getSongTitles(tokenHeader, trackObject);

      return trackInfo;
   } catch (error) {
      console.log(error);
   }
};

module.exports = { doEverything };