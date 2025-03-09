import { useState, useEffect, use } from 'react'
import {useDebounce} from 'react-use'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { getTrendingMovies, updateSearchCount } from './appwrite.js';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS={
  method: 'GET',
  headers:{
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
const [searchTerm, setSearchTerm] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(false);
const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
const [trendingMovies, setTrendingMovies] = useState([]);

useDebounce(
  () => {
    setDebouncedSearchTerm(searchTerm);
  },
  500,
  [searchTerm]
);

const fetchMovies = async (query = '') => {
  setLoading(true);
  setErrorMessage('');
  try {
    const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint, API_OPTIONS);
    if(!response.ok){
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    if (data.response==='False'){
      setErrorMessage(data.Error || 'Failed to fetch movies');
      setMovies([]);
      return;
    }
    setMovies(data.results||[]);
    if(query && data.results.length > 0){
      await updateSearchCount(query, data.results[0]);
    }
  } catch(error){
    console.error(error);
    setErrorMessage('Error fetching movies, please try again later')
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  fetchMovies(debouncedSearchTerm);
}, [debouncedSearchTerm]);

useEffect(()=>{
  loadTrendingMovies();
},[]);

const loadTrendingMovies = async () => {
  try{
const movies = await getTrendingMovies();
setTrendingMovies(movies);
  }catch(error){
    console.log(error);
  }
}
  return (
   <main>
    <div className='pattern'/>
    <div className="wrapper">
      <header>
        <img src="./hero.png" alt="BG.png" />
        <h1>Find <span className='text-gradient'>Movies</span> You Will Enjoy Without The Hassle</h1>
        <Search searchTerm = {searchTerm} setSearchTerm={setSearchTerm}/>

      </header>

        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index)=>(
                <li key = {movie.$id}>
                    <p>
                      {index + 1}
                    </p>
                    <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}
      <section className='all-movies'>
        <h2>All Movies</h2>
        {loading ? (<Spinner /> ) : errorMessage ? (<p className='text-red-500'>{errorMessage}</p>) : (
          <ul>
           {movies.map((movie) => (
              <MovieCard key = {movie.id} movie = {movie}/>
            ))}
          </ul>
        )}
      </section>
    </div>
   </main>
  )
}

export default App
