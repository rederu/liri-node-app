//Read and set any environment variables with the dotenv package
require("dotenv").config();
//Import the "key.js" file and store it in a variable
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
//var Omdb = require("omdb");
//var bandsintown = require('bandsintown')("codingbootcamp");
var moment = require('moment');

//Access keys
var spotify = new Spotify(keys.spotify);
//var omdb = new Omdb(keys.omdb)

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

        break;
    case ("movie-this"):
        movieThis(search);
        break;
    case ("do-what-it-says"):

        break;
    default:
        console.log("Please type concert-this / spotify-this-song /movie-this / do-what-it-says + your search. Try again.");
}//End Switch


function movieThis(search) {
    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&tomatoes=true&apikey=trilogy";
    console.log(queryUrl);
    console.log(search);
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

            );
        }
    );
};

function concertThis(search) {
    var bandUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";
    axios.get(bandUrl).then(
        function (response) {
            if (response.data.length > 0) {
                console.log("========================================");
                console.log("Found " + (response.data.length)+ " " + search + " Concerts: ");
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

