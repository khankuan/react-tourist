import React from 'react';

import { Router, Route, IndexRedirect } from 'react-router';
import { Header, Page1, Page2 } from './components';

// Route Init
(function(){

  const router = (
    <Router>
      <Route path='/' component={Header}>
        <Route path='page1' component={Page1} />
        <Route path='page2' component={Page2} />
        <IndexRedirect to='/page1' />
      </Route>
    </Router>
  );

  React.render(router, document.getElementById('example'));
}());
