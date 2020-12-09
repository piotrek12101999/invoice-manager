import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Button, Drawer } from '@material-ui/core';
import isEqual from 'lodash.isequal';
import useData from '../../../../contexts/data/useData/useData';
import Input from '../../../shared/Input/Input';
import StyledElementContainer from '../../../shared/StyledElementContainer/StyledElementContainer';
import { omit } from '../../../../utils/omit';

const UserDataModule: React.FC = () => {
  const { user } = useData();
  const [open, setOpen] = useState(false);
  const { control, reset, handleSubmit } = useForm();
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

  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <StyledElementContainer className="user-settings">
        <p className="title">User data </p>
        <form id="user-settings-form" onSubmit={handleSubmit(onSubmit)}>
          <Input control={control} isController name="NIP" label="NIP" required />
          <Input control={control} isController name="REGON" label="REGON" />
          <Input control={control} isController name="account" label="account" />
          <Input control={control} isController name="companyName" label="Company name" />
          <Input control={control} isController name="name" label="Name" />
          <Input control={control} isController name="postalCode" label="Postal code" />
          <Input control={control} isController name="street" label="street" />
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
