// Setting up all the variable from the HTML form
const searchTerm = document.querySelector('#search');
const section = document.querySelector('section');
const submitBtn = document.querySelector('.submit');
const studentInfo = document.querySelector('#studentInfo');
const movieResult = document.querySelector('#movieResult');

// Adding Listener event to make the connection to API

submitBtn.addEventListener("click", fetchResults);

// Function to transform API to a Json File
function fetchResults(event) {
    event.preventDefault();
    // Api resource
    // https://rapidapi.com/elisbushaj2/api/movies-api14
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b5a229a0a0msha55cb792598a8b7p1af127jsne8c47ffa25f0',
            'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
        }
    };

    fetch(`https://movies-api14.p.rapidapi.com/search?query=${searchTerm.value}`, options)
        .then(response => response.json())
        .then(json => displayResults(json)); // Using our function to take Json object
};

// Function to create element and assign variable from the API
function displayResults(json) {
    
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    };

    // Creating a object of Json and its contents
    const movies = json.contents;

    // IF the contents it is equal 0, display a message 
    if (movies.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'No results film found!.';
        section.appendChild(message);

    } else {
        // if the contents have a elements
        for (let i = 0; i < movies.length; i++) {
            // create element in HTML

            const movie = movies[i]; // Going into object element
            
            const article = document.createElement('article');
            const title = document.createElement('h2');
            const img = document.createElement('img');
            const overview = document.createElement('p');
            const trailerLink = document.createElement('a');
            const releaseYear = document.createElement('p');
            const voteAverage = document.createElement('p');
            const genre = document.createElement('p');


            title.textContent = `${i+1}. ${movie.title}`; // Adding the results numbers found it
            title.setAttribute("id","title"); // adding a ID

            // variable to set up the image
            img.src = movie.poster_path;
            img.alt = movie.title;

            
            // Saving the content of the movie and assign a ID name to each element
            overview.textContent = `OVERVIEW  : ${movie.overview}`;
            overview.setAttribute("id","overview");
            trailerLink.textContent = 'WATCH TRAILER HERE';
            trailerLink.href = movie.youtube_trailer;
            trailerLink.setAttribute("id","trailerLink");            
            releaseYear.textContent = `RELEASE DATE : ${movie.release_date}`;
            releaseYear.setAttribute("id","releaseYear")            
            voteAverage.textContent = `VOTE AVERAGE : ${movie.vote_average}`; 
            voteAverage.setAttribute("id","voteAverage");             
            genre.textContent = `GENRES : ${movie.genres}`;
            genre.setAttribute("id","genre");              
            studentInfo.textContent = "Rodrigo Lopez #200549271";
            studentInfo.setAttribute("id","studentInfo");  
            movieResult.textContent =`TOTAL RESULTS : ${movies.length}`;
            movieResult.setAttribute("id","movieResult"); 
            
            // creating element and assign the values of each movie
            article.appendChild(title);
            article.appendChild(img);            
            article.appendChild(releaseYear);
            article.appendChild(voteAverage);
            article.appendChild(genre);
            article.appendChild(overview);
            article.appendChild(trailerLink);
            section.appendChild(article);
        };
    }
}
