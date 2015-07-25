import React from 'react';

import { Route, Redirect } from 'react-router';
import Router from 'react-router';
import { Header, Page1, Page2 } from './components';

// Route Init
(function(){
  const routes = (
    <Route path='/' handler={Header}>
      <Route path='/page1' handler={Page1} />
      <Route path='/page2' handler={Page2} />
      <Redirect from='/' to='/page1' />
    </Route>
  );

  Router.run(routes, function (Handler) {
    React.render(<Handler />, document.getElementById('example'));
  });
}());
