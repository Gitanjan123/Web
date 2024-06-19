import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';

const Header = () => {
  return (
    <Router>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </header>
    </Router>
  );
};

export default Header;
