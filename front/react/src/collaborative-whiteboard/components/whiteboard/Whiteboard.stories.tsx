import React from 'react';
import CwServiceContext, { getCwService } from '../../serviceContext';
import Whiteboard from './Whiteboard';
import Whiteboard2 from './Whiteboard2';
import DraggableOnTopContext, {
  getDraggableOnTop
} from '../draggableOnTopContext';

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

      <DraggableOnTopContext.Provider value={getDraggableOnTop()}>
        <CwServiceContext.Provider value={getCwService()}>
          <Whiteboard />
        </CwServiceContext.Provider>
      </DraggableOnTopContext.Provider>
    </>
  );
};
