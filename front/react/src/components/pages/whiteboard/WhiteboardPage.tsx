import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DraggableOnTopContext, {
  getDraggableOnTop
} from '../../../collaborative-whiteboard/components/draggableOnTopContext';
import Whiteboard from '../../../collaborative-whiteboard/components/whiteboard/Whiteboard2';
import CwServiceContext, {
  getCwService
} from '../../../collaborative-whiteboard/serviceContext';
import { getWhiteboard, updateWhiteboard } from '../../../services/whiteboard';

const WhiteboardPage: React.FC = () => {
  const [cwService] = useState(getCwService());

  const { whiteboardId } = useParams();

  useEffect(() => {
    getWhiteboard(whiteboardId).then(({ data }) => {
      cwService.broadcast({ action: 'add', events: data.events });
    });

    const subscription = cwService.emit$.subscribe(transport => {
      updateWhiteboard(whiteboardId, transport);
    });
    return () => subscription.unsubscribe();
  }, [cwService, whiteboardId]);

  return (
    <DraggableOnTopContext.Provider value={getDraggableOnTop()}>
      <CwServiceContext.Provider value={cwService}>
        <Whiteboard />
      </CwServiceContext.Provider>
    </DraggableOnTopContext.Provider>
  );
};

export default WhiteboardPage;
