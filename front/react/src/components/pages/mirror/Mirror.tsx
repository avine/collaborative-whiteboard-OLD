import './Mirror.scss';
import React, { useState } from 'react';
import Canvas from '../../../collaborative-whiteboard/components/canvas/Canvas';
import {
  DrawEvent,
  DrawEventsBroadcast
} from '../../../collaborative-whiteboard/models';
import {
  drawLineSerieToLinesMapper,
  getDefaultDrawOptions
} from '../../../collaborative-whiteboard/operators';

const Mirror: React.FC = () => {
  const [animate, setAnimate] = useState(true);

  const [broadcast, setBroadcast] = useState<DrawEventsBroadcast>();

  const animateHandler = () => {
    setAnimate(!animate);
  };

  const drawHandler = (drawEvent: DrawEvent) => {
    setBroadcast({ animate, events: drawLineSerieToLinesMapper([drawEvent]) });
  };

  const drawOptions = getDefaultDrawOptions();

  return (
    <div className="mirror__container">
      <div className="mirror__container-inner">
        <div className="mirror__canvas-source">
          <Canvas drawOptions={drawOptions} draw={drawHandler} />
        </div>
        <div className="mirror__canvas-target">
          <Canvas
            drawDisabled
            drawOptions={drawOptions}
            broadcast={broadcast}
          />
        </div>
        <br />
        <br />
        <button type="button" className="app-button" onClick={animateHandler}>
          {animate ? 'disable ' : 'enable '}
          animation
        </button>
      </div>
    </div>
  );
};

export default Mirror;
