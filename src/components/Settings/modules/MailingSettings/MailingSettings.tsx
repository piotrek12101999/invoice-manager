import React from 'react';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import firebase from 'firebase/app';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import usePanelExpanded from '../../../../hooks/usePanelExpanded';
import Input from '../../../shared/Input/Input';
import SettingsModule from '../../../shared/SettingsModule/SettingsModule';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers';

const StyledLine = styled.div`
  height: 2px;
  width: 100%;
  margin-bottom: 30px;
  background-color: ${(props) => props.theme.canvasColor};
`;

const validationSchema = yup.object().shape({
  mail: yup.string().email().required()
});

interface Form {
  mail: string;
}

const MailingSettings: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { register, errors, handleSubmit, reset } = useForm<Form>({
    resolver: yupResolver(validationSchema)
  });
  const { expanded, togglePanel, document, settings } = usePanelExpanded('mailing');

  const handleAdd = async ({ mail }: Form) => {
    try {
      await document.update({
        'mailing.list': firebase.firestore.FieldValue.arrayUnion(mail)
      });
      reset();
    } catch {
      enqueueSnackbar('Error while removing email', { variant: 'error' });
    }
  };

  const handleDelete = (mail: string) => async () => {
    try {
      await document.update({
        'mailing.list': firebase.firestore.FieldValue.arrayRemove(mail)
      });
      enqueueSnackbar('Email removed', { variant: 'info' });
    } catch {
      enqueueSnackbar('Error while removing email', { variant: 'error' });
    }
  };

  return (
    <SettingsModule title="E-mail settings" summaryClassName="email-settings" expanded={expanded} togglePanel={togglePanel}>
      <p className="descriptipn">Add mails to which notifications email should be sent</p>
      <form onSubmit={handleSubmit(handleAdd)}>
        <Input name="mail" label="Email" error={errors.mail?.message} register={register} />
        <Button color="primary" variant="contained" type="submit" disabled={Object.keys(errors).length > 0}>
          Add
        </Button>
      </form>
      <StyledLine />
      {settings.mailing.list.length === 0 ? (
        <p className="list-empty"> Mailing list is empty. </p>
      ) : (
        settings.mailing.list.map((mail, index) => (
          <div key={index}>
            <Input name="email" label="Email" value={mail} />
            <Button color="primary" variant="contained" onClick={handleDelete(mail)}>
              Delete
            </Button>
          </div>
        ))
      )}
    </SettingsModule>
  );
};

export default MailingSettings;
