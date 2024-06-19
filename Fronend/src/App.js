import React from 'react';
import { Switch, Route } from 'react-router-dom'; 

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

const App = () => {
  return (
    <div>
      <Header />
      <Switch> {/* Using Switch from 'react-router-dom' */}
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
