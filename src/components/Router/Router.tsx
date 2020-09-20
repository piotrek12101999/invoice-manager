import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import useAuth from '../../contexts/auth/useAuth/useAuth';
import Layout from '../Layout/Layout';
import SignIn from '../SignIn/SignIn';

const Router: React.FC = () => {
  const { isSignedIn } = useAuth();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" render={() => (isSignedIn ? <Layout /> : <SignIn />)} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
