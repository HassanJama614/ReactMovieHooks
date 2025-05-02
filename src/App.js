// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import MovieList from './MovieList';
import Filter from './Filter';
import MovieDetail from './MovieDetail'; // Import the new detail component
import initialMovies from './initialMovies';
import './App.css';

function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPosterURL, setNewPosterURL] = useState('');
  const [newRating, setNewRating] = useState('');
  const [newTrailerLink, setNewTrailerLink] = useState(''); // Add state for trailer link


  const handleTitleChange = (value) => setTitleFilter(value);
  const handleRatingChange = (value) => setRatingFilter(value);

  const handleAddMovie = (e) => {
    e.preventDefault();
     // Basic validation - Added trailer link validation
     if (!newTitle || !newDescription || !newPosterURL || !newTrailerLink || newRating === '' || isNaN(Number(newRating))) {
        alert('Please fill in all fields correctly (Rating must be a number, Trailer URL required).');
        return;
    }
    const ratingValue = Number(newRating);
    if (ratingValue < 0 || ratingValue > 10) {
        alert('Rating must be between 0 and 10.');
        return;
    }
     // Simple URL validation for trailer (you might want a more robust regex)
     if (!newTrailerLink.startsWith('http://') && !newTrailerLink.startsWith('https://')) {
         alert('Please enter a valid Trailer Embed URL (starting with http:// or https://)');
         return;
     }


    const newMovie = {
      // Ensure ID is unique and preferably a string for consistency with URL params
      id: `movie-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      title: newTitle,
      description: newDescription,
      posterURL: newPosterURL,
      rating: ratingValue,
      trailerLink: newTrailerLink, // Add trailer link
    };

    setMovies([...movies, newMovie]);

    setNewTitle('');
    setNewDescription('');
    setNewPosterURL('');
    setNewRating('');
    setNewTrailerLink(''); // Clear trailer link input
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
    movie.rating >= ratingFilter
  );

  // Style definitions (could be moved to CSS)
   const addMovieFormStyle = {
      border: '1px solid #007bff',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px auto', // Center the form horizontally
      maxWidth: '500px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      backgroundColor: '#e7f3ff'
  };
   const inputStyle = {
      padding: '8px 12px',
      fontSize: '1em',
      borderRadius: '4px',
      border: '1px solid #ccc'
  };
   const buttonStyle = {
       padding: '10px 15px',
       fontSize: '1em',
       backgroundColor: '#28a745', // Green
       color: 'white',
       border: 'none',
       borderRadius: '4px',
       cursor: 'pointer',
       transition: 'background-color 0.2s ease'
   };
   const appHeaderStyle = {
       padding: '20px',
       backgroundColor: '#333',
       color: 'white',
       marginBottom: '20px',
       textAlign: 'center' // Center header text
   };


  return (
    <Router> {/* Wrap everything in BrowserRouter */}
      <div className="App">
        <header style={appHeaderStyle}>
          <h1>My Movie App</h1>
        </header>

        <Routes> {/* Define the routes */}
          {/* Route for the Home Page */}
          <Route path="/" element={
            <> {/* Use fragment to return multiple elements */}
              <Filter
                titleFilter={titleFilter}
                ratingFilter={ratingFilter}
                handleTitleChange={handleTitleChange}
                handleRatingChange={handleRatingChange}
              />
              <form onSubmit={handleAddMovie} style={addMovieFormStyle}>
                <h2>Add a New Movie</h2>
                <input type="text" placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} style={inputStyle} required />
                <textarea placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} style={{...inputStyle, minHeight: '60px'}} required />
                <input type="url" placeholder="Poster URL (http://...)" value={newPosterURL} onChange={(e) => setNewPosterURL(e.target.value)} style={inputStyle} required />
                <input type="number" placeholder="Rating (0-10)" min="0" max="10" step="0.1" value={newRating} onChange={(e) => setNewRating(e.target.value)} style={inputStyle} required />
                 {/* Input for Trailer Embed Link */}
                 <input type="url" placeholder="Trailer Embed URL (https://...)" value={newTrailerLink} onChange={(e) => setNewTrailerLink(e.target.value)} style={inputStyle} required />
                <button type="submit" style={buttonStyle}>Add Movie</button>
              </form>
              <MovieList movies={filteredMovies} />
            </>
          } />

          {/* Route for the Movie Detail Page */}
           {/* Pass the 'movies' array so MovieDetail can find the correct movie */}
          <Route path="/movie/:movieId" element={<MovieDetail movies={movies} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;