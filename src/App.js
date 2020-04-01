import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Map from './components/Map';
import Nav from './components/Nav';
import GlobalCases from './components/GlobalCases';

export default () => (
  <Router>
    <Nav />
    <Route exact path='/'>
      <Map />
    </Route>
    <Route exact path='/global'>
      <GlobalCases />
    </Route>
  </Router>
);
