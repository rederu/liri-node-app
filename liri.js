//Read and set any environment variables with the dotenv package
require("dotenv").config();
//Import the "key.js" file and store it in a variable
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs");

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

//Switch to select  the command to use
switch (command) {
    //concert-this >>
    case ("concert-this"):
        concertThis(search);
        break;
    case ("spotify-this-song"):
        if (search === "") {
            search = "The+Sign+Ace+of+Base";
        }
        spotifyThisSong(search);
        break;
    case ("movie-this"):
        movieThis(search);
        break;
    case ("do-what-it-says"):
        doWhat();
        break;
    default:
        console.log("Please type concert-this / spotify-this-song /movie-this / do-what-it-says + your search. Try again.");
}//End Switch

//For Movie-This
function movieThis(search) {
    if (search === "" || search === undefined) {
        console.log(
            " If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/" +
            "\n It's on Netflix!!"
        );
    } else {
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
    }//end Else
};//end movieThis

//For Concert-This
function concertThis(search) {
    if (search === "" || search === undefined) {
        console.log("Please add a band name or an artist name to your search");
    } else {
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
    }
};
//For Spotify-This-Song
function spotifyThisSong(search) {

    spotify.search({ type: 'track', query: search, limit: 5 })
        .then(function (response) {
            console.log(
                "========================================\n" +
                "Found " + response.tracks.items.length + " songs related to your search"
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
//For do-what-it-says
function doWhat() {
    //read file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        } else {
            //split string when it finds a ","
            var dataArr = data.split(",");
            if (dataArr[0] === "spotify-this-song") {
                spotifyThisSong(dataArr[1]);
            }
            else if (dataArr[0] === "movie-this") {
                movieThis(dataArr[1]);
            }else if(dataArr[0] === "concert-this"){
                concertThis(dataArr[1]);
            }
        }
    });
};