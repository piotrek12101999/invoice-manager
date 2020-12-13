import React from 'react';
import { Checkbox } from '@material-ui/core';
import SettingsModule from '../../../shared/SettingsModule/SettingsModule';
import usePanelExpanded from '../../../../hooks/usePanelExpanded';
import { useSnackbar } from 'notistack';

const MailingNotifications: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { expanded, togglePanel, document, settings } = usePanelExpanded('notifications');

  const toggleNotification = (type: 'expenses' | 'invoices') => async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await document.update({
        [`notifications.${type}`]: event.currentTarget.checked
      });
    } catch (err) {
      enqueueSnackbar('Erro while updating settings', { variant: 'error' });
    }
  };

  return (
    <SettingsModule title="E-mail notifications" summaryClassName="email-notifications" expanded={expanded} togglePanel={togglePanel}>
      <div className="email-notification">
        <p className="description"> Each month end mail with expenses to mailing list</p>
        <Checkbox color="primary" checked={settings.notifications.expenses} onChange={toggleNotification('expenses')} />
      </div>
      <div className="email-notification">
        <p className="description"> Each month end mail with invoices to mailing list</p>
        <Checkbox color="primary" checked={settings.notifications.invoices} onChange={toggleNotification('invoices')} />
      </div>
    </SettingsModule>
  );
};

export default MailingNotifications;
