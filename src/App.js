import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GlobalNavigate from './components/globalNavigate';

import AppRoutes from '~/Routes';

function App() {
  return (
    <div className="App">
      <Router>
        <GlobalNavigate>
          <AppRoutes />
        </GlobalNavigate>
      </Router>
    </div>
  );
}

export default App;
