import { useEffect, useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "f84fc31d";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null)
  //const tempQuery = "interstellar";



  // useEffect(()=> {
  //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  //   .then((res)=> res.json())
  //   .then((data) => setMovies(data.Search));
  // }, [])


  // useEffect(()=> {
  //   console.log("After initial render");
  // }, [])

  // useEffect(()=> {
  //   console.log("After every render");
  // })

  // useEffect(()=> {
  //   console.log("D");
  // }, [query])

  // console.log("During render");

  function handleSelectMovie(id){
      setSelectedId(id === selectedId ? null : id )
  }

  function handleCloseMovie(){
    setSelectedId(null)
  }



  useEffect(function (){
    async function fetchMovies(){
      try{
      setIsPending(true)
      setError("")
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
      
      if(!res.ok) throw new Error("Something went wrong with fetching movies")
        
        
      const data = await res.json();
      if(data.Response === "False") throw new Error ("Movie not found");
      
      setMovies(data.Search);
      console.log(data);
      } 
      catch(err){
        console.log(err.message);
        setError(err.message)
      }
      finally{
        setIsPending(false)
      }
    }

    if(query.length < 3){
      setMovies([])
      setError("")
      return;
    }

    fetchMovies();

  }, [query])

 

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* {isPending ? <Loader /> : <MovieList movies={movies} />} */}
          {isPending && <Loader />}
          {!isPending && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} /> }
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
         {selectedId ? (<MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie}/>) :  
         (
         <>
          <WatchedSummary watched={watched} />
           <WatchedMoviesList watched={watched} />
          </>
        )}        
         </Box>
      </Main>
    </>
  );
}


function Loader(){
  return(
    <div>
      <h3 className="loader">LOADING MOVIES...</h3>
    </div>
  )
} 

function ErrorMessage({message}){
  return (
    <div>
      <h3 className="error">
        <span>💔</span>{message}
      </h3>
    </div>
  )
}


function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({query, setQuery}) {

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

/*
function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>

      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
}
*/

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={()=> onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({selectedId, onCloseMovie}){

const [movie, setMovie] = useState({})

const {
  Title:title,
  Year: year,
  Poster: poster,
  
} = movie;

  useEffect(function() {
      async function getMovieDetails(){
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
        const data = await res.json();
        setMovie(data);
      }
      getMovieDetails()
  },[])

  return(
    <div className="details">
      <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
        {selectedId}
    </div>
  )
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}






























// import React, { useState } from "react";
// import "./App.css";

// const App = () => { 


//     const [value, setValue] = useState('');

//     return (
//         <div className="container">
//             <div className="calculator">
//                 <form>
//                     <div className="display">
//                         <input type="text" value={value}/>
//                     </div>
//                     <div>
//                         <input type="button" value="AC" onClick={e =>setValue('')}/>
//                         <input type="button" value="DE" onClick={e =>setValue(value.slice(0, -1))}/>
//                         <input type="button" value="." onClick={e =>setValue(value + e.target.value)}/>
//                         <input type="button" value="/" onClick={e =>setValue(value + e.target.value)}/>
//                     </div>

//                     <div>
//                         <input type="button" value="7" onClick={e =>setValue(value + e.target.value)}/>
//                         <input type="button" value="8" onClick={e =>setValue(value + e.target.value)}/>
//                         <input type="button" value="9" onClick={e =>setValue(value + e.target.value)}/>
//                         <input type="button" value="*" onClick={e =>setValue(value + e.target.value)}/>
//                     </div>

//                     <div>
//                         <input type="button" value="4" onClick={e =>setValue(value + e.target.value)}/>
//                         <input type="button" value="5" onClick={e =>setValue(value + e.target.value)}/>
//                         <input type="button" value="6" onClick={e =>setValue(value + e.target.value)}/>
//                         <input type="button" value="+" onClick={e =>setValue(value + e.target.value)}/>
//                     </div>

//                     <div>
//                         <input type="button" value="1" onClick={e =>setValue(value + e.target.value)}/>
//                         <input type="button" value="2" onClick={e =>setValue(value + e.target.value)}/>
//                         <input type="button" value="3" onClick={e =>setValue(value + e.target.value)}/>
//                         <input type="button" value="-" onClick={e =>setValue(value + e.target.value)}/>
//                     </div>

//                     <div>
//                         <input type="button" value="00" onClick={e =>setValue(value + e.target.value)}/>
//                         <input type="button" value="0" onClick={e =>setValue(value + e.target.value)}/>
//                         <input type="button" value="=" className="equal" onClick={e =>setValue(eval(value))}/>
                        
//                     </div>
//                 </form>
//             </div>
//         </div>

//     )
// }

// export default App;
