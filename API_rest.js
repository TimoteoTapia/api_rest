//I create two variables to store the number of page and the list o movies
var pageSite = 1;
var movieList = [];

//A function to reset the main element
const reset = () => {
  document.getElementById("movies").innerHTML = "";
};

//there are two function for the buttons and the event to make work them by click
const PreviousButton = () => {
  if (pageSite > 1) {
    pageSite -= 1;
    uploadMovies();
  }
};

const NextButton = () => {
  if (pageSite < 1000) {
    pageSite += 1;
    uploadMovies();
  }
};

document
  .getElementById("btnPrevious")
  .addEventListener("click", PreviousButton);
document.getElementById("btnNext").addEventListener("click", NextButton);

//it is the display, I created three element, article to append as child h3(title), and img(image)
// and I make article as the child for the main element ("movies")
const output = (movieList) => {
  reset();
  movieList.forEach((movie) => {
    let article = document.createElement("article");
    article.setAttribute("class", "movie");

    let title = document.createElement("h3");
    title.setAttribute("class", "title");
    title.textContent = movie.title;

    let poster = document.createElement("img");
    poster.setAttribute("class", "poster");
    poster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    poster.alt = movie.title;

    article.appendChild(poster);
    article.appendChild(title);

    document.getElementById("movies").appendChild(article);
  });
};

//I use fetch to use the API and make a promise, after I store the promise as a list of objects
//and I display calling output function
const uploadMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=61540a4590d15548988793305edc821d&page=${pageSite}`
    );
    console.log(response);
    movieList = await response.json();
    console.log(movieList.results);
    output(movieList.results);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
uploadMovies();

//I sort the list of movies ascending o descending using the method sort
const sortBy = () => {
  reset();
  let sortByValue = document.getElementById("sortBy").value;
  let sorted = movieList.results.sort((movie1, movie2) => {
    movie1 = movie1.title;
    movie2 = movie2.title;
    if (sortByValue == "movieNameAscending") {
      if (movie1 > movie2) return 1;
      else if (movie1 < movie2) return -1;
      else return 0;
    } else if (sortByValue == "movieNameDescending") {
      if (movie1 < movie2) return 1;
      else if (movie1 > movie2) return -1;
      else return 0;
    }
  });
  output(sorted);
};

document.getElementById("sortBy").addEventListener("change", sortBy);
