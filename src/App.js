import React, { useState, useEffect, useReducer } from "react";
import './App.css';

import { AppHeader, Search, Movie, Loader } from './components/index'


const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const initialState = {
  loading      : true,
  movies       : [],
  errorMessage : null
};


const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

function App() {

  // Old way
  // const [loading, setLoading] = useState(true);
  // const [movies, setMovies] = useState([]);
  // const [errorMessage, setErrorMessage] = useState(null);

  // useEffect(() => {
  //   fetch(MOVIE_API_URL)
  //     .then(response => response.json())
  //     .then(jsonResponse => {        
  //       setMovies(jsonResponse.Search);
  //       setLoading(false);
  //     });
  // }, []);

  // const search = searchValue => {
  //   setLoading(true);
  //   setErrorMessage(null);

  //   fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
  //     .then(response => response.json())
  //     .then(jsonResponse => {
  //       if (jsonResponse.Response === "True") {
  //         setMovies(jsonResponse.Search);
  //         setLoading(false);
  //       } else {
  //         setErrorMessage(jsonResponse.Error);
  //         setLoading(false);
  //       }
  //     });
  //   };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search
        });
      });
  }, []);


  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

      fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
              type: "SEARCH_MOVIES_SUCCESS",
              payload: jsonResponse.Search
          });
        } else {
          dispatch({
              type: "SEARCH_MOVIES_FAILURE",
              error: jsonResponse.Error
          });
        }
      });
  };

  const { movies, errorMessage, loading } = state;
    
  return (
    <div className="App">
      <AppHeader text="Movie Finder" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <Loader />) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
