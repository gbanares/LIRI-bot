require("dotenv").config();

var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');


var cmd = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");

// require("dotenv").config();

function movieThis(movie) {
    if (movie === undefined) {
        movie = "Mr Nobody"
    }
    var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=trilogy";

    axios.get(url).then(function(response){
        // console.log(response.data);
        console.log("Title: " +response.data.Title);
    })
} 

function spotify(song){
    var spotify = new Spotify(keys.spotify);

    if (song === undefined) {
        song = "Firework"
    }

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
        var songInfo = data.tracks.items;
        console.log("Artist(s): " + songInfo[0].artists[0].name);
        console.log("Song Name: " + songInfo[0].name);
        console.log("Preview Link: " + songInfo[0].preview_url);
        console.log("Album: " + songInfo[0].album.name);

      });
}

switch (cmd) {
    case "movie-this":
    console.log("movie-this");
    movieThis(searchTerm);
    break;

    case "concert-this":
    console.log("concert-this");
    break;

    case "do-what-it-says":
    console.log("do-what-it-says");
    break;

    case "spotify-this-song":
    console.log("spotify-this-song");
    spotify(searchTerm);
    break;
}
