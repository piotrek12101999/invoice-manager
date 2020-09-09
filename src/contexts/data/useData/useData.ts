import { useContext } from 'react';
import DataContext from './DataContext';

const useData = () => {
  const data = useContext(DataContext);

  return data;
};

export default useData;
