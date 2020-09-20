import React from 'react';
import Chart from './widgets/Chart/Chart';
import QuickActions from './widgets/QuickActions/QuickActions';
import Expenses from './widgets/Expenses/Expenses';
import Incomes from './widgets/Incomes/Incomes';

interface Props {
  name: string;
}

const Dashboard: React.FC<Props> = ({ name }) => {
  return (
    <div className="dashboard">
      <p className="title"> Hello, {name} </p>
      <p className="quick-actions"> Quick actions </p>
      <Chart />
      <QuickActions />
      <Expenses />
      <Incomes />
    </div>
  );
};

export default Dashboard;
