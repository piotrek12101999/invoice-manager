import React from 'react';
import UserDataModule from './modules/UserDataModule/UserDataModule';
import MailingNotifications from './modules/MailingNotifications/MailingNotifications';
import MailingList from './modules/MailingList/MailingList';

const Settings: React.FC = () => {
  return (
    <>
      <div className="component-layout">
        <p className="title settings"> Settings </p>
      </div>
      <div className="settings-panel">
        <UserDataModule />
        <div className="modules">
          <MailingNotifications />
          <MailingList />
        </div>
      </div>
    </>
  );
};

export default Settings;
