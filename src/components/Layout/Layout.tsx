import React from 'react';
import { Switch, Route } from 'react-router-dom';
import useData from '../../contexts/data/useData/useData';
import Header from './Header/Header';
import DetailsDrawer from './DetailsDrawer/DetailsDrawer';
import NavDrawer from './NavDrawer/NavDrawer';
import Dashboard from '../Dashboard/Dashboard';
import Customers from '../Customers/Customers';

const Layout: React.FC = () => {
  const {
    user: { name, profilePicture }
  } = useData();

  return (
    <>
      <Header profilePicture={profilePicture} />
      <NavDrawer />
      <div className="content">
        <Switch>
          <Route exact path="/" render={() => <Dashboard name={name} />} />
          <Route path="/customers" component={Customers} />
        </Switch>
      </div>
      <DetailsDrawer />
    </>
  );
};

export default Layout;
