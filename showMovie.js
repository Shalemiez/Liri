const searchFor = require('./search')
const axios = require('axios');

const key = require('./key')
const OMDB_key = key.omdb.key;


showMovie = function () {
    omdburl = `http://www.omdbapi.com/?t=${
        searchFor()
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

}

module.exports = showMovie;
