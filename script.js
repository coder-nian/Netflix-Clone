//Runs when the program is loaded
window.onload = () => {
  getOriginals()
  getTrendingNow()
  getTopRated()
}

//fetch movies based on the url, category & poster type
function fetchMovies(url, dom_element, path_type) {
  fetch(url)
    .then(response => {
      if(response.ok)
      {
        return response.json()
      }
      else
      {
        throw new Error('Something went wrong!')
      }
    })
    .then(data => {
      showMovies(data, dom_element, path_type)
    })
    .catch(error_data => {
      console.log(error_data)
    })
}

//Displays the movies based on fetch request
showMovies = (movies, dom_element, path_type) => {
  const moviesEl = document.querySelector(dom_element)

  for (var movie of movies.results)
  {
    const imgElement = document.createElement('img')
    imgElement.setAttribute('data-id', movie.id)
    imgElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`
    moviesEl.appendChild(imgElement)
  }
}

//Calls fetch movies function for originals
function getOriginals() {
  const url = 'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'
  fetchMovies(url, '.original__movies', 'poster_path')
}

//Calls fetch movies function for trending
function getTrendingNow() {
  const url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'
  fetchMovies(url, '#trending', 'backdrop_path')
}

//Calls fetch movies function for top rated
function getTopRated() {
  const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'
  fetchMovies(url, '#top_rated', 'backdrop_path')
}