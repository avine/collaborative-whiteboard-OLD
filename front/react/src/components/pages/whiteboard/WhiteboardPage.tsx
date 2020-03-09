import React, { useEffect, useState } from 'react';

import DraggableOnTopContext, {
  getDraggableOnTop
} from '../../../collaborative-whiteboard/components/draggableOnTopContext';
import Whiteboard from '../../../collaborative-whiteboard/components/whiteboard/Whiteboard2';
import CwServiceContext, {
  getCwService
} from '../../../collaborative-whiteboard/serviceContext';
import { getWhiteboard, updateWhiteboard } from '../../../services/whiteboard';

const WhiteboardPage: React.FC = () => {
  const whiteboardId = '5e5faced0850d12a3b8ccbb2';

  const [cwService] = useState(getCwService());

  useEffect(() => {
    getWhiteboard(whiteboardId).then(({ data }) => {
      cwService.broadcast({ action: 'add', events: data.data });
    });

    const subscription = cwService.emit$.subscribe(transport => {
      updateWhiteboard(whiteboardId, transport);
    });
    return () => subscription.unsubscribe();
  }, [cwService]);

  return (
    <DraggableOnTopContext.Provider value={getDraggableOnTop()}>
      <CwServiceContext.Provider value={cwService}>
        <Whiteboard />
      </CwServiceContext.Provider>
    </DraggableOnTopContext.Provider>
  );
};

export default WhiteboardPage;
