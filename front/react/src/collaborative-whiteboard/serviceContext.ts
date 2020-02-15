import { createContext } from 'react';
import CwService from './service';

const CwServiceContext = createContext(new CwService());

export default CwServiceContext;

export const getCwService = () => new CwService();
