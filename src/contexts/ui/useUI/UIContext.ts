import { createContext } from 'react';
import { UIState } from '../ui.models';

const UIContext = createContext({} as UIState);

export default UIContext;
