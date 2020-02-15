import React from 'react';
import CwServiceContext, { getCwService } from '../../serviceContext';
import Whiteboard from './Whiteboard';
import Whiteboard2 from './Whiteboard2';

export default {
  title: 'Whiteboard',
  component: Whiteboard
};

export const Default = () => {
  return <Whiteboard />;
};

export const Default2 = () => {
  return (
    <>
      <CwServiceContext.Provider value={getCwService()}>
        <Whiteboard2 />
      </CwServiceContext.Provider>

      <CwServiceContext.Provider value={getCwService()}>
        <Whiteboard2 />
      </CwServiceContext.Provider>
    </>
  );
};
