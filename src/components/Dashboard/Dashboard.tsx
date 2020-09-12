import React from 'react';
import Header from './Header/Header';
import NavDrawer from './NavDrawer/NavDrawer';
import useData from '../../contexts/data/useData/useData';
import Chart from './widgets/Chart/Chart';
import QuickActions from './widgets/QuickActions/QuickActions';
import Expenses from './widgets/Expenses/Expenses';
import Incomes from './widgets/Incomes/Incomes';

const Dashboard: React.FC = () => {
  const {
    user: { name, profilePicture }
  } = useData();

  return (
    <div className="container">
      <Header profilePicture={profilePicture} />
      <div className="dashboard-elements">
        <NavDrawer />
        <div className="dashboard">
          <p className="title"> Hello, {name} </p>
          <p className="quick-actions"> Quick actions </p>
          <Chart />
          <QuickActions />
          <Expenses />
          <Incomes />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
