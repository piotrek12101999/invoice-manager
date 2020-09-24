import React from 'react';
import { Switch, Route } from 'react-router-dom';
import useData from '../../contexts/data/useData/useData';
import Header from './Header/Header';
import DetailsDrawer from './DetailsDrawer/DetailsDrawer';
import NavDrawer from './NavDrawer/NavDrawer';
import Dashboard from '../Dashboard/Dashboard';
import Customers from '../Customers/Customers';
import Invoices from '../Invoices/Invoices';
import Expenses from '../Expenses/Expenses';
import History from '../History/History';

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
          <Route path="/invoices" component={Invoices} />
          <Route path="/expenses" component={Expenses} />
          <Route path="/history" component={History} />
        </Switch>
      </div>
      <DetailsDrawer />
    </>
  );
};

export default Layout;
