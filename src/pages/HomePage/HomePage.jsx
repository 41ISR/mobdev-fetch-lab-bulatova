import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import './HomePage.css';
import { useState } from "react"
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function HomePage() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

  const fetchMovies = async (searchQuery) => {
            setError(null)
            setIsLoading(true)

            try {
                const apiKey = import.meta.env.VITE_OMDB_API_KEY
                const url = await fetch(
                    "https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}" 
                )
                const res = await fetch(url)
                const data = await res.json()
                if (data.res === "False") {
                    setError(data.Error)
                    setMovies([])
                  } else {
                    setMovies(data.Search)
                }
            } catch (err) {
                setError("Не удалось связаться с сервером")
                setMovies([])
            } finally {
                setIsLoading(false)
            }
        }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!query.trim()) return
       fetchMovies(query)
   }

  return (
    <main className="home-page">
      <div className="container home-page__inner">
        <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} />

        <section className="home-page__section">
          <h2 className="home-page__section-title">Результат поиска</h2>
          
          {isLoading && <Loader label="Ищем фильмы..." />}
          {!isLoading && error && <ErrorMessage message={error} />}
          {!isLoading && !error && movies.length > 0 && (
            <MovieList movies={movies} />
          )}
          {!isLoading && !error && movies.length === 0 && (
            <p>Введите запрос, чтобы найти фильмы</p>
          )}
        </section>
      </div>
    </main>
  );
}

export default HomePage;
