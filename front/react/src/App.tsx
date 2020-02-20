import './App.scss';
import './collaborative-whiteboard/styles/cw.core.scss'; // FIXME: should be removed (but it breaks the UI...)
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DraggableOnTopContext, {
  getDraggableOnTop
} from './collaborative-whiteboard/components/draggableOnTopContext';
import Whiteboard from './collaborative-whiteboard/components/whiteboard/Whiteboard2';
import CwServiceContext, {
  getCwService
} from './collaborative-whiteboard/serviceContext';
import Header from './components/header/Header';
import Basic from './components/pages/basic/Basic';
import Home from './components/pages/home/Home';
import Mirror from './components/pages/mirror/Mirror';

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
              <DraggableOnTopContext.Provider value={getDraggableOnTop()}>
                <CwServiceContext.Provider value={getCwService()}>
                  <Whiteboard />
                </CwServiceContext.Provider>
              </DraggableOnTopContext.Provider>
            </Route>
          </Switch>
        </div>
      </div>
      <div className="app__version">1.0.1</div>
    </Router>
  );
};

export default App;
