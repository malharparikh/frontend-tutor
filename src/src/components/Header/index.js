// Header.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const showBackArrow = location.pathname === '/analyze';

  return (
    <header className="header">
      <div className="back-arrow-container">
        {showBackArrow && (
          <ArrowLeftOutlined
            className="back-arrow"
            onClick={() => navigate('/')}
          />
        )}
      </div>
      <div className="logo-container">
        <img 
          src="logo.png" 
          alt="Next Level Tutors" 
          className="logo" 
          onClick={() => navigate('/')} 
        />
      </div>
      <div className="spacer"></div>
    </header>
  );
};

export default Header;