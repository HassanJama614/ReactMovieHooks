// src/MovieCard.js
import React from 'react';

const MovieCard = ({ movie }) => {
  const { title, description, posterURL, rating } = movie;

  // Basic inline styles (consider using CSS modules or styled-components later)
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    margin: '15px',
    width: '250px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Pushes rating to the bottom
    height: '450px' // Fixed height for alignment
  };

  const imgStyle = {
    width: '100%',
    maxHeight: '280px', // Limit image height
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '10px'
  };

  const descriptionStyle = {
     fontSize: '0.9em',
     color: '#555',
     flexGrow: 1, // Allows description to take up available space
     overflow: 'hidden', // Hide overflowing text
     textOverflow: 'ellipsis', // Add ellipsis (...)
     display: '-webkit-box',
     WebkitLineClamp: 4, // Limit to 4 lines
     WebkitBoxOrient: 'vertical',
     marginBottom: '10px'
  }

  const ratingStyle = {
      fontWeight: 'bold',
      color: '#e74c3c', // Or gold/yellow color
      marginTop: 'auto' // Aligns rating to the bottom
  }

  return (
    <div style={cardStyle}>
      <img src={posterURL} alt={`${title} Poster`} style={imgStyle} />
      <h3>{title}</h3>
      <p style={descriptionStyle}>{description}</p>
      <p style={ratingStyle}>Rating: {rating}/10</p>
    </div>
  );
};

export default MovieCard;