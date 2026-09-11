import { useState } from 'react'
import './App.css'

// ─────────────────────────────────────────────────────────────
// MOCK DATA — delete all of this once you wire up the backend.
// It exists only so the UI renders something while you build.
// ─────────────────────────────────────────────────────────────
const MOCK_CITIES = [
  { id: 6167865, name: 'Toronto', country: 'Canada', admin1: 'Ontario', latitude: 43.70643, longitude: -79.39864 },
  { id: 4177887, name: 'Toronto', country: 'United States', admin1: 'Ohio', latitude: 40.46423, longitude: -80.60091 },
  { id: 2172797, name: 'Townsville', country: 'Australia', admin1: 'Queensland', latitude: -19.26639, longitude: 146.80569 },
]

const MOCK_WEATHER = { weather: 14.3, cached: false }

const MOCK_FAVORITES = [
  { id: 1, CityName: 'Toronto', Latitude: 43.70643, Longitude: -79.39864 },
  { id: 2, CityName: 'Reykjavík', Latitude: 64.13548, Longitude: -21.89541 },
]

const MOCK_HISTORY = [
  { id: 12, City: 'Toronto', created_at: '2026-09-10 14:02:11' },
  { id: 11, City: 'Reykjavík', created_at: '2026-09-10 13:47:55' },
  { id: 10, City: 'Townsville', created_at: '2026-09-10 13:31:09' },
]

// ─────────────────────────────────────────────────────────────
// Search field + results dropdown
// ─────────────────────────────────────────────────────────────
function CitySearch({ query, setQuery, results, onPick, isSearching, error }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleChange(e) {
    setQuery(e.target.value)
    setIsOpen(true)
    // TODO (you wire this): call GET /api/cities?q=<value> here.
    // Consider debouncing so you don't fire a request per keystroke.
  }

  function handlePick(city) {
    onPick(city)
    setQuery(city.name)
    setIsOpen(false)
  }

  const showDropdown = isOpen && query.trim().length > 0

  return (
    <div className="search">
      <label className="search__label" htmlFor="city">
        Where do you want the weather for?
      </label>

      <input
        id="city"
        className="search__input"
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => setIsOpen(true)}
        placeholder="Start typing a city"
        autoComplete="off"
      />

      {showDropdown && (
        <ul className="results" role="listbox">
          {isSearching && <li className="results__state">Searching…</li>}

          {!isSearching && error && (
            <li className="results__state results__state--error">{error}</li>
          )}

          {!isSearching && !error && results.length === 0 && (
            <li className="results__state">
              No cities match that. Check the spelling and try again.
            </li>
          )}

          {!isSearching &&
            !error &&
            results.map((city) => (
              <li key={city.id}>
                <button
                  type="button"
                  className="results__item"
                  onClick={() => handlePick(city)}
                >
                  <span className="results__city">{city.name}</span>
                  <span className="results__region">
                    {city.admin1 ? `${city.admin1}, ` : ''}
                    {city.country}
                  </span>
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// The big readout
// ─────────────────────────────────────────────────────────────
function WeatherReadout({ city, weather, isLoading, error, onSave, isSaved }) {
  if (!city) {
    return (
      <section className="readout readout--empty">
        <p>Pick a city and its current temperature shows up here.</p>
      </section>
    )
  }

  if (isLoading) {
    return (
      <section className="readout readout--empty">
        <p>Reading the forecast for {city.name}…</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="readout readout--empty readout--error">
        <p>{error}</p>
      </section>
    )
  }

  if (!weather) return null

  return (
    <section className="readout">
      <div className="readout__place">
        <h2>{city.name}</h2>
        <p>
          {city.admin1 ? `${city.admin1}, ` : ''}
          {city.country}
        </p>
        <p className="readout__coords">
          {Number(city.latitude).toFixed(4)}, {Number(city.longitude).toFixed(4)}
        </p>
      </div>

      <div className="readout__temp">
        <span className="readout__value">{weather.weather}</span>
        <span className="readout__unit">°C</span>
      </div>

      <div className="readout__meta">
        <span className={`chip ${weather.cached ? 'chip--cached' : 'chip--fresh'}`}>
          {weather.cached ? 'served from cache' : 'fetched just now'}
        </span>

        <button
          type="button"
          className="btn"
          onClick={() => onSave(city)}
          disabled={isSaved}
        >
          {isSaved ? 'Saved' : 'Save this city'}
        </button>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Saved cities
// ─────────────────────────────────────────────────────────────
function Favorites({ favorites, onOpen, onRemove }) {
  if (favorites.length === 0) {
    return <p className="panel__empty">Save a city and it shows up here, even after a restart.</p>
  }

  return (
    <ul className="stack">
      {favorites.map((fav) => (
        <li key={fav.id} className="row">
          <button type="button" className="row__main" onClick={() => onOpen(fav)}>
            <span className="row__title">{fav.CityName}</span>
            <span className="row__sub">
              {Number(fav.Latitude).toFixed(3)}, {Number(fav.Longitude).toFixed(3)}
            </span>
          </button>
          <button
            type="button"
            className="row__remove"
            onClick={() => onRemove(fav.id)}
            aria-label={`Remove ${fav.CityName}`}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  )
}

// ─────────────────────────────────────────────────────────────
// Recent searches
// ─────────────────────────────────────────────────────────────
function History({ history }) {
  if (history.length === 0) {
    return <p className="panel__empty">Nothing searched yet.</p>
  }

  return (
    <ol className="stack">
      {history.map((entry) => (
        <li key={entry.id} className="row row--static">
          <span className="row__title">{entry.City}</span>
          <span className="row__sub">{entry.created_at}</span>
        </li>
      ))}
    </ol>
  )
}

// ─────────────────────────────────────────────────────────────
// App shell
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(MOCK_CITIES)
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState(null)

  const [selectedCity, setSelectedCity] = useState(null)
  const [weather, setWeather] = useState(null)
  const [isLoadingWeather, setIsLoadingWeather] = useState(false)
  const [weatherError, setWeatherError] = useState(null)

  const [favorites, setFavorites] = useState(MOCK_FAVORITES)
  const [history, setHistory] = useState(MOCK_HISTORY)
  const [panel, setPanel] = useState('favorites')

  // TODO (you wire this): on mount, load GET /api/favorites and GET /api/history.

  function handlePickCity(city) {
    setSelectedCity(city)
    setWeather(MOCK_WEATHER)
    // TODO (you wire this): call GET /api/weather/<lat>/<long>,
    // then setWeather() with the response. Use setIsLoadingWeather
    // and setWeatherError around it.
  }

  function handleOpenFavorite(fav) {
    handlePickCity({
      id: fav.id,
      name: fav.CityName,
      country: '',
      admin1: '',
      latitude: fav.Latitude,
      longitude: fav.Longitude,
    })
  }

  function handleSaveFavorite(city) {
    // TODO (you wire this): POST /api/favorites, then refresh the list
    // from the server rather than trusting local state.
    setFavorites((prev) => [
      ...prev,
      { id: Date.now(), CityName: city.name, Latitude: city.latitude, Longitude: city.longitude },
    ])
  }

  function handleRemoveFavorite(id) {
    // TODO (you wire this): DELETE /api/favorites/<id>, then refresh.
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }

  const isSaved = selectedCity
    ? favorites.some(
        (f) =>
          Number(f.Latitude) === Number(selectedCity.latitude) &&
          Number(f.Longitude) === Number(selectedCity.longitude)
      )
    : false

  return (
    <div className="app">
      <header className="masthead">
        <h1>Weather</h1>
        <p>Current conditions, pulled through my own API.</p>
      </header>

      <main className="main">
        <CitySearch
          query={query}
          setQuery={setQuery}
          results={results}
          onPick={handlePickCity}
          isSearching={isSearching}
          error={searchError}
        />

        <WeatherReadout
          city={selectedCity}
          weather={weather}
          isLoading={isLoadingWeather}
          error={weatherError}
          onSave={handleSaveFavorite}
          isSaved={isSaved}
        />

        <section className="panel">
          <div className="panel__tabs">
            <button
              type="button"
              className={panel === 'favorites' ? 'tab tab--on' : 'tab'}
              onClick={() => setPanel('favorites')}
            >
              Saved
            </button>
            <button
              type="button"
              className={panel === 'history' ? 'tab tab--on' : 'tab'}
              onClick={() => setPanel('history')}
            >
              Recent searches
            </button>
          </div>

          <div className="panel__body">
            {panel === 'favorites' ? (
              <Favorites
                favorites={favorites}
                onOpen={handleOpenFavorite}
                onRemove={handleRemoveFavorite}
              />
            ) : (
              <History history={history} />
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
