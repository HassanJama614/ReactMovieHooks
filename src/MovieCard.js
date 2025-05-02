// src/MovieCard.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const MovieCard = ({ movie }) => {
  const { id, title, description, posterURL, rating } = movie;

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
    justifyContent: 'space-between',
    height: '450px',
    textDecoration: 'none', // Remove underline from Link
    color: 'inherit' // Inherit text color
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
     flexGrow: 1,
     overflow: 'hidden',
     textOverflow: 'ellipsis',
     display: '-webkit-box',
     WebkitLineClamp: 4, // Keep description brief on the card
     WebkitBoxOrient: 'vertical',
     marginBottom: '10px'
  }

  const ratingStyle = {
      fontWeight: 'bold',
      color: '#e74c3c',
      marginTop: 'auto'
  }


  return (
    // Wrap the card content in a Link component
    <Link to={`/movie/${id}`} style={cardStyle}> {/* Link to the detail page using movie ID */}
      <img src={posterURL} alt={`${title} Poster`} style={imgStyle} />
      <h3>{title}</h3>
      {/* Show only a snippet or no description on the card now */}
       {/* <p style={descriptionStyle}>{description}</p> */}
       <div style={{flexGrow: 1}}></div> {/* Add a spacer if description removed */}
      <p style={ratingStyle}>Rating: {rating}/10</p>
    </Link>
  );
};

export default MovieCard;