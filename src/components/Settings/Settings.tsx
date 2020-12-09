import React from 'react';
import MailingModule from './modules/MailingModule/MailingModule';
import UserDataModule from './modules/UserDataModule/UserDataModule';

const Settings: React.FC = () => {
  return (
    <>
      <div className="component-layout">
        <p className="title settings"> Settings </p>
      </div>
      <div className="settings-modules">
        <UserDataModule />
        <MailingModule />
      </div>
    </>
  );
};

export default Settings;
