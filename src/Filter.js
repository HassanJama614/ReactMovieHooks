// src/Filter.js
import React from 'react';

const Filter = ({ titleFilter, ratingFilter, handleTitleChange, handleRatingChange }) => {
  // Styles for the filter area
  const filterStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
    marginBottom: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    gap: '20px', // Space between filter inputs
    flexWrap: 'wrap' // Allow wrapping on smaller screens
  };

  const inputStyle = {
      padding: '8px 12px',
      fontSize: '1em',
      borderRadius: '4px',
      border: '1px solid #ccc'
  }

  const labelStyle = {
      marginRight: '5px',
      fontWeight: 'bold'
  }

  return (
    <div style={filterStyle}>
      <div>
         <label htmlFor="title-filter" style={labelStyle}>Filter by Title:</label>
         <input
            id="title-filter"
            type="text"
            placeholder="Enter movie title..."
            value={titleFilter}
            onChange={(e) => handleTitleChange(e.target.value)}
            style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="rating-filter" style={labelStyle}>Min Rating:</label>
        <input
            id="rating-filter"
            type="number"
            min="0"
            max="10"
            step="0.1" // Allow decimal ratings
            placeholder="Min rating..."
            value={ratingFilter}
            // Ensure the value passed up is a number, default to 0 if empty/invalid
            onChange={(e) => handleRatingChange(Number(e.target.value) || 0)}
            style={inputStyle}
        />
      </div>
    </div>
  );
};

export default Filter;