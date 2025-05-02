// src/App.js
import React, { useState } from 'react';
import MovieList from './MovieList';
import Filter from './Filter';
import initialMovies from './initialMovies'; // Import sample data
import './App.css'; // Optional global styles

function App() {
  // State for the list of movies
  const [movies, setMovies] = useState(initialMovies);

  // State for filter values
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0); // Start with minimum rating 0

  // State for the "Add Movie" form inputs
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPosterURL, setNewPosterURL] = useState('');
  const [newRating, setNewRating] = useState(''); // Use string initially for easier input handling

  // Handler functions for filter changes
  const handleTitleChange = (value) => {
    setTitleFilter(value);
  };

  const handleRatingChange = (value) => {
    setRatingFilter(value); // Value should already be a number from Filter component
  };

  // Function to handle adding a new movie
  const handleAddMovie = (e) => {
      e.preventDefault(); // Prevent default form submission behavior

      // Basic validation
      if (!newTitle || !newDescription || !newPosterURL || newRating === '' || isNaN(Number(newRating))) {
          alert('Please fill in all fields correctly (Rating must be a number).');
          return;
      }
      const ratingValue = Number(newRating);
      if (ratingValue < 0 || ratingValue > 10) {
          alert('Rating must be between 0 and 10.');
          return;
      }


    const newMovie = {
      id: Date.now(), // Simple unique ID generation
      title: newTitle,
      description: newDescription,
      posterURL: newPosterURL,
      rating: ratingValue,
    };

    // Add the new movie to the existing list
    setMovies([...movies, newMovie]);

    // Clear the form fields
    setNewTitle('');
    setNewDescription('');
    setNewPosterURL('');
    setNewRating('');
  };

  // Filter the movies based on the current filter state
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
    movie.rating >= ratingFilter
  );

  // Inline styles for the Add Movie form (can move to CSS)
  const addMovieFormStyle = {
      border: '1px solid #007bff',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px auto', // Center the form horizontally
      maxWidth: '500px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      backgroundColor: '#e7f3ff' // Light blue background
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


  return (
    <div className="App">
      <header style={{ padding: '20px', backgroundColor: '#333', color: 'white', marginBottom: '20px' }}>
        <h1>My Movie App</h1>
      </header>

      {/* Filter Component */}
      <Filter
        titleFilter={titleFilter}
        ratingFilter={ratingFilter}
        handleTitleChange={handleTitleChange}
        handleRatingChange={handleRatingChange}
      />

      {/* Add Movie Form Section */}
      <form onSubmit={handleAddMovie} style={addMovieFormStyle}>
        <h2>Add a New Movie</h2>
        <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={inputStyle}
            required
        />
        <textarea
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            style={{...inputStyle, minHeight: '60px'}} // Text area style
            required
        />
        <input
            type="url" // Use type="url" for better semantics/validation
            placeholder="Poster URL (http://...)"
            value={newPosterURL}
            onChange={(e) => setNewPosterURL(e.target.value)}
            style={inputStyle}
            required
        />
        <input
            type="number"
            placeholder="Rating (0-10)"
            min="0"
            max="10"
            step="0.1"
            value={newRating}
            onChange={(e) => setNewRating(e.target.value)} // Keep as string until submission
            style={inputStyle}
            required
        />
        <button type="submit" style={buttonStyle}>Add Movie</button>
      </form>

      {/* MovieList Component - Displays filtered movies */}
      <MovieList movies={filteredMovies} />
    </div>
  );
}

export default App;