import { createContext } from 'react';
import { DataState } from '../data.models';

const DataContext = createContext({} as DataState);

export default DataContext;
