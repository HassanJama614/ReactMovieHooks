// src/MovieDetail.js
import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Import hooks and Link

const MovieDetail = ({ movies }) => {
  // Get the 'movieId' parameter from the URL
  const { movieId } = useParams();

  // Find the movie object that matches the movieId from the URL
  // Ensure comparison handles potential type differences (e.g., string vs number if IDs weren't strings)
  const movie = movies.find(m => m.id.toString() === movieId.toString());

  // Styles
  const detailStyle = {
      padding: '30px',
      maxWidth: '800px',
      margin: '30px auto',
      backgroundColor: 'white',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      textAlign: 'left',
  };

  const backLinkStyle = {
      display: 'inline-block',
      marginBottom: '20px',
      padding: '8px 15px',
      backgroundColor: '#6c757d', // Gray color
      color: 'white',
      textDecoration: 'none',
      borderRadius: '5px',
      transition: 'background-color 0.2s ease'
  };

  const trailerStyle = {
      marginTop: '20px',
      position: 'relative',
      paddingBottom: '56.25%', /* 16:9 aspect ratio */
      height: '0',
      overflow: 'hidden',
      maxWidth: '100%',
      background: '#000' // Background for the iframe area
  }

   const iframeStyle = {
       position: 'absolute',
       top: '0',
       left: '0',
       width: '100%',
       height: '100%',
       border: '0' // Remove iframe border
   }

  // Handle case where movie is not found
  if (!movie) {
    return (
        <div style={detailStyle}>
             <Link to="/" style={backLinkStyle}>← Back to Home</Link> {/* Left arrow */}
            <h2>Movie not found!</h2>
            <p>Could not find details for the specified movie.</p>
        </div>
        );
  }

  return (
    <div style={detailStyle}>
        {/* Back Navigation Link */}
      <Link to="/" style={{...backLinkStyle, ':hover': {backgroundColor: '#5a6268'} }}>
        ← Back to Home
      </Link>

      <h1>{movie.title}</h1>
      <p><strong>Rating:</strong> {movie.rating}/10</p>
      <img src={movie.posterURL} alt={`${movie.title} Poster`} style={{maxWidth: '200px', float: 'right', marginLeft: '20px', marginBottom: '10px', borderRadius: '5px'}}/>
      <p>{movie.description}</p>

      {/* Embed Trailer */}
      {movie.trailerLink && ( // Only show if trailer link exists
        <div style={{marginTop: '30px'}}>
            <h2>Trailer</h2>
            <div style={trailerStyle}>
                <iframe
                src={movie.trailerLink}
                title={`${movie.title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={iframeStyle}
                ></iframe>
            </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;