import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Button, Drawer } from '@material-ui/core';
import isEqual from 'lodash.isequal';
import useData from '../../../../contexts/data/useData/useData';
import Input from '../../../shared/Input/Input';
import StyledElementContainer from '../../../shared/StyledElementContainer/StyledElementContainer';
import { omit } from '../../../../utils/omit';
import validationSchema from './validationSchema';
import { yupResolver } from '@hookform/resolvers';
import { firestore } from '../../../..';
import { useSnackbar } from 'notistack';

interface Form {
  NIP: string;
  REGON?: string;
  account: string;
  companyName: string;
  name: string;
  postalCode: string;
  street: string;
}

const UserDataModule: React.FC = () => {
  const { user } = useData();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const { control, reset, errors, handleSubmit } = useForm<Form>({
    resolver: yupResolver(validationSchema)
  });
  const values = useWatch({
    control: control
  });

  useEffect(() => {
    if (user.NIP) {
      const { NIP, REGON, account, companyName, name, postalCode, street } = user;
      reset({ NIP, REGON, account, companyName, name, postalCode, street });
    }
  }, [user, reset]);

  useEffect(() => {
    setOpen(
      values.NIP && !isEqual(values, omit(user, ['id', 'PKD', 'balance', 'city', 'email', 'phoneNumber', 'primaryPKD', 'profilePicture']))
    );
  }, [values, user]);

  const handleCloseDrawer = () => setOpen(false);

  const discardChanges = () => {
    const { NIP, REGON, account, companyName, name, postalCode, street } = user;
    reset({ NIP, REGON, account, companyName, name, postalCode, street });
  };

  const onSubmit = async (data: Form) => {
    try {
      await firestore.doc(`${user.email}/data`).update(data);
    } catch (err) {
      discardChanges();
      enqueueSnackbar('Error while updating', { variant: 'error' });
    }
  };

  return (
    <>
      <StyledElementContainer className="user-module">
        <p className="title">User data </p>
        <form id="user-settings-form" onSubmit={handleSubmit(onSubmit)}>
          <Input control={control} isController error={errors.NIP?.message} name="NIP" label="NIP" required />
          <Input control={control} isController error={errors.REGON?.message} name="REGON" label="REGON" />
          <Input control={control} isController error={errors.account?.message} name="account" label="account" />
          <Input control={control} isController error={errors.companyName?.message} name="companyName" label="Company name" />
          <Input control={control} isController error={errors.name?.message} name="name" label="Name" />
          <Input control={control} isController error={errors.postalCode?.message} name="postalCode" label="Postal code" />
          <Input control={control} isController error={errors.street?.message} name="street" label="street" />
        </form>
      </StyledElementContainer>
      <Drawer
        variant="persistent"
        PaperProps={{ style: { borderTopRightRadius: 20 } }}
        anchor="bottom"
        open={open}
        onClose={handleCloseDrawer}
      >
        <div className="user-settings-drawer">
          <Button color="primary" onClick={discardChanges}>
            Discard
          </Button>
          <Button type="submit" form="user-settings-form" variant="contained" color="primary">
            Save
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default UserDataModule;
