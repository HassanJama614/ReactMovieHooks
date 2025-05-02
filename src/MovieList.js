// src/MovieList.js
import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  // Style for the container div
  const listStyle = {
    display: 'flex',
    flexWrap: 'wrap', // Allow items to wrap to the next line
    justifyContent: 'center', // Center items horizontally
    padding: '20px',
    gap: '10px', // Space between cards
  };

  return (
    <div style={listStyle}>
      {movies.length > 0 ? (
         movies.map(movie => (
           <MovieCard key={movie.id} movie={movie} />
         ))
       ) : (
         <p>No movies found matching your criteria.</p> // Message when list is empty
       )
      }
    </div>
  );
};

export default MovieList;