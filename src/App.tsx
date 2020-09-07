import React from 'react';
import UIProvider from './contexts/ui/UIProvider/UIProvider';
import AuthProvider from './contexts/auth/AuthProvider/AuthProvider';
import Router from './components/Router/Router';

function App() {
  return (
    <UIProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </UIProvider>
  );
}

export default App;
