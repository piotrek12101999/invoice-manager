import { useContext } from 'react';
import UIContext from './UIContext';

const useUI = () => {
  const auth = useContext(UIContext);

  return auth;
};

export default useUI;
