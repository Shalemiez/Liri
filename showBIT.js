const searchFor = require('./search')
const axios = require('axios');
const moment = require('moment')

showBIT = function () {
    var url = `https://rest.bandsintown.com/artists/${
        searchFor()
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


module.exports = showBIT;
