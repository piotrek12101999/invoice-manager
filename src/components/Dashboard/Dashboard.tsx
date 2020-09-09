import React, { useState, useEffect } from 'react';
import NavDrawer from './NavDrawer/NavDrawer';
import useUI from '../../contexts/ui/useUI/useUI';
import { Switch } from '@material-ui/core';
import useData from '../../contexts/data/useData/useData';

const Dashboard: React.FC = () => {
  const { theme, setTheme } = useUI();
  const { user } = useData();
  const [isLightTheme, setLightTheme] = useState(theme === 'light');

  useEffect(() => setLightTheme(theme === 'light'), [theme]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => setTheme(event.currentTarget.checked ? 'light' : 'dark');

  return (
    <div className="dashboard-container">
      <NavDrawer name={user.name} profilePicture={user.profilePicture} />
      <div className="dashboard">
        <p className="title"> Hello, Piotr </p>
        <Switch checked={isLightTheme} color="primary" onChange={handleThemeChange} />
        <div className="item-a" />
        <div className="item-b" />
        <div className="item-c" />
        <div className="item-d" />
        <div className="item-e" />
      </div>
    </div>
  );
};

export default Dashboard;
