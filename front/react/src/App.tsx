import './App.scss';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/header/Header';
import Basic from './components/pages/basic/Basic';
import Home from './components/pages/home/Home';
import Mirror from './components/pages/mirror/Mirror';
import UserProfilePage from './components/pages/profile/UserProfile';
import WhiteboardPage from './components/pages/whiteboard/WhiteboardPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app__layout">
        <div className="app__header">
          <Header />
        </div>
        <div className="app__main">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/basic">
              <Basic />
            </Route>
            <Route path="/mirror">
              <Mirror />
            </Route>
            <Route path="/whiteboard">
              <WhiteboardPage />
            </Route>
            <Route path="/user/profile">
              <UserProfilePage />
            </Route>
          </Switch>
        </div>
      </div>
      <div className="app__version">1.0.1</div>
    </Router>
  );
};

export default App;
