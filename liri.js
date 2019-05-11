//Read and set any environment variables with the dotenv package
require("dotenv").config();
//Import the "key.js" file and store it in a variable
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var moment = require('moment');

//Access keys
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var nodeArgs = process.argv;
var search = "";
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        search = search + "+" + nodeArgs[i];
    }
    else {
        search += nodeArgs[i];
    }
}


switch (command) {
    case ("concert-this"):
        concertThis(search);
        break;
    case ("spotify-this-song"):
        if (search === undefined) {
            search = "The+Sign";
        }
        spotifyThisSong(search);
        break;
    case ("movie-this"):
       /* if (search === undefined) {
            search = "Mr.Nobody";
        }*/
        movieThis(search);
        break;
    case ("do-what-it-says"):

        break;
    default:
        console.log("Please type concert-this / spotify-this-song /movie-this / do-what-it-says + your search. Try again.");
}//End Switch

//For Movie-This
function movieThis(search) {
        var queryUrl = "http://www.omdbapi.com/?t=" + search + "&tomatoes=true&apikey=trilogy";
        axios.get(queryUrl).then(
            function (response) {
                console.log(
                    "\n====================================================" +
                    "\n Title: " + response.data.Title +
                    "\n Release Year: " + response.data.Year +
                    "\n IMDB Rating: " + response.data.imdbRating +
                    "\n Rotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                    "\n Country: " + response.data.Country +
                    "\n Language: " + response.data.Language +
                    "\n Plot: " + response.data.Plot +
                    "\n Actors: " + response.data.Actors +
                    "\n====================================================\n"

                );//End console log
            } //End function
        );//end axios
};//end movieThis

//For Concert-This
function concertThis(search) {
    var bandUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";
    axios.get(bandUrl).then(
        function (response) {
            if (response.data.length > 0) {
                console.log("========================================");
                console.log("Found " + (response.data.length) + " " + search + " Concerts: ");
                for (var j = 0; j < response.data.length; j++) {
                    console.log(
                        "========================================\n" +
                        " Artist: " + response.data[j].lineup[0] +
                        "\n Venue: " + response.data[j].venue.name +
                        "\n Venue Location: " + response.data[j].venue.city + ", " + response.data[j].venue.country +
                        "\n Date: " + moment(response.data[j].datetime.replace("T", " ")).format("LLL")

                    );
                };
            } else {
                console.log("No results found for " + search)
            }
        }
    );
};
//For Spotify-This-Song
function spotifyThisSong(search) {

    spotify.search({ type: 'track', query: search })
        .then(function (response) {
            console.log(
                "========================================\n" +
                "Found " + response.tracks.items.length + " songs"
            );

            for (var k = 0; k < response.tracks.items.length; k++) {
                console.log(
                    "========================================" +
                    "\n Artist: " + response.tracks.items[k].artists[0].name +
                    "\n Song: " + response.tracks.items[k].name +
                    "\n Song Preview URL: " + response.tracks.items[k].preview_url +
                    "\n Album: " + response.tracks.items[k].album.name
                );
            }
        })
        .catch(function (err) {
            console.log(err);
        });
};

