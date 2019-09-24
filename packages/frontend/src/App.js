import React from 'react';
import { Router } from 'react-router-dom';

import GlobalStyles from '~/styles/global';

import history from '~/services/history';
import Routes from '~/routes';

export default function App() {
  return (
    <Router history={history}>
      <Routes />
      <GlobalStyles />
    </Router>
  );
}
