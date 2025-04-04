
import React from 'react';
import './TutorialPage.css';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';


const TutorialPage = () => {
  const navigate = useNavigate();

  const steps = [
    {
      title: "Select Your Region",
      description: "Choose from Central, North East, North West, South East, or South West Singapore",
    },
    {
      title: "Filter Your Preferences",
      description: "Set your price range, flat type, and lease duration",
    },
    {
      title: "Explore Options",
      description: "View available flats that match your criteria",
    },
    {
      title: "Find Your Home",
      description: "Click 'Find' to see your perfect HDB options",
    }
  ];
  return (
    <>
    <Header />
    <div className="tutorial-container">
      <header className="tutorial-header">
        <h1>How It Works</h1>
        <p>Find your perfect HDB flat in just 4 simple steps</p>
      </header>

      <div className="tutorial-steps">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-number">{index + 1}</div>
            <div className="step-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>

      <div className="tutorial-actions">
        <button 
          className="primary-button"
          onClick={() => navigate('/')}
        >
          Get Started
        </button>
      </div>
    </div>
    </>
  );
};

export default TutorialPage;