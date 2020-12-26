import React from 'react';
import { Checkbox } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import SettingsModule from '../../../shared/SettingsModule/SettingsModule';
import usePanelExpanded from '../../../../hooks/usePanelExpanded';
import ExpensesNotifications from './ExpensesNotifications/ExpensesNotifications';
import { ExpensesNotificationsTypes } from '../../../../contexts/data/data.models';

const MailingNotifications: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    expanded,
    togglePanel,
    document,
    settings: {
      notifications: { expenses, invoices }
    }
  } = usePanelExpanded('notifications');

  const updateSettingsDocument = async (key: string, value: unknown) => {
    try {
      await document.update({
        [key]: value
      });
    } catch (err) {
      enqueueSnackbar('Error while updating settings', { variant: 'error' });
    }
  };

  const toggleNotification = (type: 'expenses' | 'invoices') => async (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSettingsDocument(`notifications.${type === 'expenses' ? 'expenses.enabled' : 'invoices'}`, event.currentTarget.checked);
  };

  const handleExpensesDetailsChange = async (type: ExpensesNotificationsTypes) => {
    updateSettingsDocument('notifications.expenses.type', type);
  };

  const handleExpensesDateChange = async (date: string) => {
    updateSettingsDocument('notifications.expenses.date', date);
  };

  return (
    <SettingsModule title="E-mail notifications" summaryClassName="email-notifications" expanded={expanded} togglePanel={togglePanel}>
      <ExpensesNotifications
        data={expenses}
        toggleNotification={toggleNotification('expenses')}
        handleExpensesDetailsChange={handleExpensesDetailsChange}
        handleExpensesDateChange={handleExpensesDateChange}
      />
      <div className="email-notification">
        <p className="description"> After addition of invoice, email is being sent to customer and mailing list</p>
        <Checkbox color="primary" checked={invoices} onChange={toggleNotification('invoices')} />
      </div>
    </SettingsModule>
  );
};

export default MailingNotifications;
