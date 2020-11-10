import React from 'react';
import { TextField, InputAdornment, Fab, IconButton } from '@material-ui/core';
import { SearchRounded, AddRounded, ListRounded, AppsRounded } from '@material-ui/icons';
import StyledIconsContainer from '../StyledIconsContainer/StyledIconsContainer';

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  handleDrawerOpen: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isListViewSupported?: boolean;
  isListView?: boolean;
  setListView?: (isListViewSelected: boolean) => () => void;
}

const ComponentLayout: React.FC<Props> = ({ title, value, setValue, handleDrawerOpen, isListViewSupported, isListView, setListView }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

  return (
    <>
      <div className="component-layout">
        <p className="title"> {title} </p>
        <div className="actions">
          <TextField
            className="input"
            size="small"
            variant="outlined"
            placeholder="Search"
            value={value}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded />
                </InputAdornment>
              )
            }}
          />
          {isListViewSupported && setListView && (
            <StyledIconsContainer className="icons">
              <IconButton color={isListView ? 'secondary' : 'inherit'} onClick={setListView(true)}>
                <ListRounded />
              </IconButton>
              <IconButton color={!isListView ? 'secondary' : 'inherit'} onClick={setListView(false)}>
                <AppsRounded />
              </IconButton>
            </StyledIconsContainer>
          )}
          <Fab className="fab" color="primary" size="small" onClick={handleDrawerOpen}>
            <AddRounded />
          </Fab>
        </div>
      </div>
    </>
  );
};

export default ComponentLayout;
