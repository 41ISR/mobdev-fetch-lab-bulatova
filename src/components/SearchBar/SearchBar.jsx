import './SearchBar.css';

function SearchBar({ query, setQuery }) {
   const handleSubmit = (e) => {
        e.preventDefault()
   }
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <span className="search-bar__eyebrow">Найти фильм или сериал</span>
      <div className="search-bar__row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="search-bar__input"
          placeholder="Например: Joker, Interstellar, Dune…"
        />
        <button type="button" className="search-bar__button">Искать</button>
      </div>
    </form>
  );
}

export default SearchBar;
