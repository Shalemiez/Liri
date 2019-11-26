require("dotenv").config();
const axios = require('axios');
const searchFor = require("./search")
const moment = require('moment')
var Spotify = require('node-spotify-api');
const key = require('./key')
const OMDB_key = key.omdb.key
var fs = require('fs');
const showBIT = require('./showBIT')
const showSpotify = require('./showSpotify')
const showMovie = require("./showMovie")


if (process.argv[2] === "spotify-this-song") {
    showSpotify();
} else if (process.argv[2] === "concert-this") {
    showBIT();
} else if (process.argv[2] === "movie-this") {
    showMovie();
} else if (process.argv[2] === "do-what-it-says") {

    fs.readFile('random.txt', 'utf8', (err, data) => {
        if (err) 
            throw err;
        


        console.log(data)
        var dataInput = data
        var spIT = dataInput.split(",");
        console.log(spIT);
        if (spIT[0] === "spotify-this-song") {
            var spotify = new Spotify({id: key.spotifykey.id, secret: key.spotifykey.secret});
            spotify.search({
                type: 'track',
                query: spIT[1]
            }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                console.log(data.tracks.items[0].album.artists[0].name);
                console.log(data.tracks.items[0].name)
                console.log(data.tracks.items[0].album.external_urls.spotify)
                console.log(data.tracks.items[0].album.name)

            });

        } else if (spIT[0] === "movie-this") {
            const omdburl = `http://www.omdbapi.com/?t=${
                spIT[1]
            }&y=&plot=short&apikey=${OMDB_key}`;


            axios.get(omdburl).then(function (res) {

                console.log(`Title : ${
                    res.data.Title
                }`);
                console.log(`Year : ${
                    res.data.Year
                }`);
                console.log(res.data.Ratings[1].Source + ":" + res.data.Ratings[1].Value);
                console.log(`Country : ${
                    res.data.Country
                }`);
                console.log(`Languages : ${
                    res.data.Language
                }`);
                console.log(`Actors : ${
                    res.data.Actors
                }`);
                console.log(`Plot : ${
                    res.data.Plot
                }`);

            }).catch(function (error) { // handle error
                console.log(error);
            }). finally(function () { // always executed
            });


        } else if (spIT[0] === "concert-this") {
            var url = `https://rest.bandsintown.com/artists/${
                spIT[1]
            }/events?app_id=codingbootcamp`;

            axios.get(url).then(res => { // handle success
                var m = res.data[0].datetime;


                console.log(res.data[0].venue.name);
                console.log(res.data[0].venue.city + "," + res.data[0].venue.region);
                // console.log(res.data[0].datetime);
                console.log(moment(m, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YY'));
                // console.log(res.venue.city);
                // console.log(res.datatime);
            }).catch(function (error) { // handle error
                console.log(error);
            });
        }
    })
};
