import React from 'react';
import { Link } from 'react-router-dom';
import './EducationPage.css';

const EducationPage = () => {
  return (
    <div className="education-page-container">
      <h1>Education</h1>
      <p>This page is under construction. Please check back later.</p>
      <Link to="/game" className="button">Back to Game</Link>
    </div>
  );
};

export default EducationPage;