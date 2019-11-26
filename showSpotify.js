const searchFor = require('./search')
var Spotify = require('node-spotify-api');
const key = require('./key')

showSpotify = function () {
    var spotify = new Spotify({id: key.spotifykey.id, secret: key.spotifykey.secret});
    spotify.search({
        type: 'track',
        query: searchFor()
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0].album.artists[0].name);
        console.log(data.tracks.items[0].name)
        console.log(data.tracks.items[0].album.external_urls.spotify)
        console.log(data.tracks.items[0].album.name)

    });
}

module.exports = showSpotify;
