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
var search = process.argv.slice(3).join(" ");
var userCommand =process.argv.slice(2).join(" ");
var thisCommand = "\nUser Command:" + userCommand+"\n";

//Switch to select  the command to use
switch (command) {
    case ("concert-this"):
    logginIt(thisCommand);
        concertThis(search);
        break;
    case ("spotify-this-song"):
        logginIt(thisCommand);
        spotifyThisSong(search);
        break;
    case ("movie-this"):
    logginIt(thisCommand);
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
        var isUndefined =[
            " If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/",
            " It's on Netflix!"].join("\n");
            logginIt(isUndefined);
    } else {
        var queryUrl = "http://www.omdbapi.com/?t=" + search + "&tomatoes=true&apikey=trilogy";
        axios.get(queryUrl).then(
            function (response) {
                var dataOmdb =[
                    "====================================================",
                    " Title: " + response.data.Title,
                    " Release Year: " + response.data.Year,
                    " IMDB Rating: " + response.data.imdbRating,
                    " Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
                    " Country: " + response.data.Country,
                    " Language: " + response.data.Language,
                    " Plot: " + response.data.Plot,
                    " Actors: " + response.data.Actors,
                    "===================================================="
                ].join("\n");//End console log
                logginIt(dataOmdb);
            } //End function
        );//end axios
    }//end Else
};//end movieThis

//For Concert-This
function concertThis(search) {
    if (search === "" || search === undefined) {
        var isUndefined ="Please add a band name or an artist name to your search\n";
        logginIt(isUndefined);
    } else {
        var bandUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";
        
        axios.get(bandUrl).then(
            function (response) {
                if (response.data.length > 0) {
                    var concertResults = ["\n========================================",
                                        "Found " + (response.data.length) + " " + search + " Concerts"].join("\n");
                    logginIt(concertResults);
                    for (var j = 0; j < response.data.length; j++) {
                        var fixDate = moment(response.data[j].datetime.replace("T", " ")).format("LLL");
                        var concertLocation = response.data[j].venue.city + ", " + response.data[j].venue.country
                        var jsonConcert = response.data[j];
                        var results =[
                            "\n========================================",
                            " Artist: " + jsonConcert.lineup[0] ,
                            " Venue: " + jsonConcert.venue.name ,
                            " Venue Location: " + concertLocation,
                            " Date: " + fixDate
                        ].join("\n");
                        logginIt(results);
                    };
                } else {
                    var noConcerts = "No results found for " + search;
                    logginIt(noConcerts);
                }
            }
        );
    }
};
//For Spotify-This-Song
function spotifyThisSong(search) {
    if (search === "" || search=== undefined) {
        search = "The+Sign+Ace+of+Base";
    }
    spotify.search({ type: 'track', query: search, limit: 5 })
        .then(function (response) {
            var spotifyResults =[
                "\n========================================" ,
                "Found " + response.tracks.items.length + " songs related to your search"
            ].join("\n");
            logginIt(spotifyResults);

            for (var k = 0; k < response.tracks.items.length; k++) {
                var spotifySongs =[
                    "\n========================================" ,
                    " Artist: " + response.tracks.items[k].artists[0].name ,
                    " Song: " + response.tracks.items[k].name ,
                    " Song Preview URL: " + response.tracks.items[k].preview_url,
                    " Album: " + response.tracks.items[k].album.name
                ].join("\n");
                logginIt(spotifySongs);
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

/*function logCommand(){
    
    fs.appendFile("log.txt", thisCommand, function(err){
        if (err) throw err;
        console.log(toLog);
    });
};*/

function logginIt(toLog){
    fs.appendFile("log.txt", toLog, function(err){
        if (err) throw err;
        console.log(toLog);
    });
};