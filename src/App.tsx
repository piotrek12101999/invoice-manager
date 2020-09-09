import React from 'react';
import UIProvider from './contexts/ui/UIProvider/UIProvider';
import DataProvider from './contexts/data/DataProvider/DataProvider';
import AuthProvider from './contexts/auth/AuthProvider/AuthProvider';
import Router from './components/Router/Router';

function App() {
  return (
    <UIProvider>
      <DataProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </DataProvider>
    </UIProvider>
  );
}

export default App;
