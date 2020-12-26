import React from 'react';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import firebase from 'firebase/app';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import usePanelExpanded from '../../../../hooks/usePanelExpanded';
import Input from '../../../shared/Input/Input';
import SettingsModule from '../../../shared/SettingsModule/SettingsModule';
import StyledLine from '../../../shared/StyledLine/StyledLine';
import { yupResolver } from '@hookform/resolvers';

const validationSchema = yup.object().shape({
  mail: yup.string().email().required()
});

interface Form {
  mail: string;
}

const MailingList: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { control, errors, handleSubmit, reset } = useForm<Form>({
    resolver: yupResolver(validationSchema)
  });
  const { expanded, togglePanel, document, settings } = usePanelExpanded('list');

  const handleAdd = async ({ mail }: Form) => {
    try {
      await document.update({
        'list.list': firebase.firestore.FieldValue.arrayUnion(mail)
      });
      reset();
    } catch {
      enqueueSnackbar('Error while removing email', { variant: 'error' });
    }
  };

  const handleDelete = (mail: string) => async () => {
    try {
      await document.update({
        'list.list': firebase.firestore.FieldValue.arrayRemove(mail)
      });
      enqueueSnackbar('Email removed', { variant: 'info' });
    } catch {
      enqueueSnackbar('Error while removing email', { variant: 'error' });
    }
  };

  return (
    <SettingsModule title="Mailing list" summaryClassName="email-list" expanded={expanded} togglePanel={togglePanel}>
      <p className="descriptipn">Add mails to which notifications email should be sent</p>
      <form onSubmit={handleSubmit(handleAdd)}>
        <Input control={control} isController error={errors.mail?.message} name="mail" label="Email" required />
        <Button color="primary" variant="contained" type="submit" disabled={Object.keys(errors).length > 0}>
          Add
        </Button>
      </form>
      <StyledLine />
      {settings.list.list.length === 0 ? (
        <p className="list-empty"> Mailing list is empty. </p>
      ) : (
        settings.list.list.map((mail, index) => (
          <div key={index}>
            <Input name="email" label="Email" value={mail} disabled />
            <Button className="delete" variant="outlined" onClick={handleDelete(mail)}>
              Delete
            </Button>
          </div>
        ))
      )}
    </SettingsModule>
  );
};

export default MailingList;
