require("dotenv").config();

var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require("request");

var cmd = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");


function concertThis(artist) {   
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    console.log(queryURL);
    
    request(queryURL, function (error, response, body) {
    if (error) {
        console.log(error);
    }
    var result  =  JSON.parse(body)[0];
        console.log("Venue: " + result.venue.name);
        console.log("Location: " + result.venue.city);
        console.log("Date of Event: " +  result.datetime);
    });
}


function movieThis(movie) {
    if (movie === undefined) {
        movie = "Mr Nobody"
    }
    var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=trilogy";

    axios.get(url).then(function(response){
        // console.log(response.data);
        console.log("Title: " +response.data.Title);
        console.log("Year: " +response.data.Year);
        console.log("Rating: " +response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " +response.rottenRating);
        console.log("Country: " + response.data.Country);
	    console.log("Language: " + response.data.Language);
	    console.log("Plot: " + response.data.Plot);
	    console.log("Actors: " + response.data.Actors);
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

function read() {
    console.log("Doing what it says...");
	console.log("-----------------------------------------------------------");

	readFile = true;

	// reads from file random txt
	fs.readFile("random.txt", "utf8", function(error, data) {
            console.log(data);
            movieThis();
	});

}


switch (cmd) {
    case "movie-this":
    console.log("movie-this");
    movieThis(searchTerm);
    break;

    case "concert-this":
    console.log("concert-this");
    concertThis(searchTerm);
    break;

    case "do-what-it-says":
    console.log("do-what-it-says");
    read();
    break;

    case "spotify-this-song":
    console.log("spotify-this-song");
    spotify(searchTerm);
    break;

    default:
	console.log("Liri does not understand");
}
