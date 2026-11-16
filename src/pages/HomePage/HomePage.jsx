import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import './HomePage.css';
import { useState } from "react"

function HomePage() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

  const load = async () => {
            setError(null)
            setIsLoading(true)

            try {
                const res = await fetch(
                    "https://www.omdbapi.com/?apikey=КЛЮЧ&s=${query}" 
                )
                const data = await res.json()
                if (data.res === "False") {
                    setErr
                } else {
                    setMovies(data)
                }
            } catch (error) {
                console.error(error)
                setIsError(error.message ?? "Не удалось связаться с сервером")
            } finally {
                setIsLoading(false)
            }
        }

  return (
    <main className="home-page">
      <div className="container home-page__inner">
        <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} />

        <section className="home-page__section">
          <h2 className="home-page__section-title">Результат поиска</h2>
          <MovieList />
        </section>
      </div>
    </main>
  );
}

export default HomePage;
