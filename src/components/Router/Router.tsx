import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import useAuth from '../../contexts/auth/useAuth/useAuth';
import Dashboard from '../Dashboard/Dashboard';
import SignIn from '../SignIn/SignIn';

const Router: React.FC = () => {
  const { isSignedIn } = useAuth();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => (isSignedIn ? <Dashboard /> : <SignIn />)} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
