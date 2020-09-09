import { useContext } from 'react';
import UIContext from './UIContext';

const useUI = () => {
  const ui = useContext(UIContext);

  return ui;
};

export default useUI;
