import { useState, useEffect } from "react";

//API Key
const KEY = "f84fc31d";

export function useMovies(query) {

  const [movies, setMovies] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

    useEffect(
        function (){
            // callback?.();
            //Prevents race condition
        const controller = new AbortController();
    
        async function fetchMovies(){
          try{
          setIsPending(true)
          setError("")
          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal : controller.signal});
          
          if(!res.ok) throw new Error("Something went wrong with fetching movies")
            
            
          const data = await res.json();
          if(data.Response === "False") throw new Error ("Movie not found");
          
          setMovies(data.Search);
          console.log(data);
          setError("")
          } 
          catch(err){
            
            if(err.name !== "AbortError"){
              setError(err.message)
              console.log(err.message);
            }
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
        //handleCloseMovie();
        fetchMovies();
    
        return function(){
          controller.abort();
        }
    
      }, [query]);

      return {movies, isPending, error}

}