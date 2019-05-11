# LIRI Bot
<h2>What is LIRI?</h2>
LIRI means Language Interpretation and Recognition Interface and, also, LIRI is a  command-line NodeJS app that takes four commands:
<ul>
  <li><b>concert-this</b> [artist/band] - This command takes in the name of an artist or a musical band and it displays its next concert's date. It is powered by the implementation of Bands In Town API and axios,  and returns the namde of the venue, venue's location and date of the event.</li>
  <li><b>spotify-this-song</b> [song's name] - This command works in a similar way to concert-this. It takes the song name provided after the command by the user and it returns the the song's name, artist, song's spotify's preview, and the album that the song is from. It is powered by the node-spotify-api package to retrieve the song0s information.</li>
  <li><b>movie-this</b> [movie title] - Powered by the OMDB API and axios,  it retrieves the Movie Title, year when the movie came  out, movie's IMDB rating, movie's Rotten Tomatoes rating,  country where it was produced, language of the movie, the movie's plot, and actors in the movie.</li>
  <li><b>do-what-it-says</b></li> - This command takes information from the file random.txt. LIRI reads this information and tuns the command given for the argument referenced in the document. </li>
  </ul>
  <h2>How does LIRI works?</h2>
  <h3</h3>
  LIRI is a command interface application so, in order to run it, a command line terminal is needed. Also, fter cloning this respository you should create a .env file that it should contain:
  <ul>
  SPOTIFY_ID = your-spotify-ID<
  SPOTIFY_SECRET = your-spotify-secret
  </ul>
  If you don't know how to get your Spotify Id or yout Spotify Secret, please visit: https://developer.spotify.com/my-applications/#!/ and log in with your Spotify account. Register a new applcation to be used with the Spotify API. you can fill in whatever you would like for these fields.
  
