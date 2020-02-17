/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DrawEvent, DrawEventsBroadcast } from '../../models';
import { getDefaultCanvasSize, getDefaultDrawOptions } from '../../operators';
import CwServiceContext from '../../serviceContext';
import Canvas from '../canvas/Canvas';
import Cut from '../cut/Cut';
import DrawLine from '../draw-line/DrawLine';
import Icon from '../icon/Icon';
import ToolContent from '../tool-content/ToolContent';
import Tool from '../tool-group/Tool';
import ToolGroup from '../tool-group/ToolGroup';

export interface WhiteboardProps {
  fitParentElement?: boolean;
}

const Whiteboard: React.FC<WhiteboardProps> = ({ fitParentElement }) => {
  const service = useContext(CwServiceContext);

  const [historyCut, setHistoryCut] = useState<DrawEventsBroadcast>();

  const [canvasSize, setCanvasSize] = useState(getDefaultCanvasSize());
  const canvasContainer = useRef<HTMLDivElement>();

  useEffect(() => {
    if (fitParentElement) {
      const element = canvasContainer.current;
      // Fit the container
      element.style.width = '100%';
      element.style.height = '100%';
      // Freeze both container and canvas sizes
      const { width, height } = element.getBoundingClientRect();
      element.style.width = `${width}px`;
      element.style.height = `${height}px`;
      setCanvasSize({ width, height });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const subscription = service.broadcastHistoryCut$.subscribe(setHistoryCut);
    return () => subscription.unsubscribe();
  }, [service]);

  const [showDrawLine, setShowDrawLine] = useState(false);
  const [showCut, setShowCut] = useState(false);
  const [showGuides, setShowGuides] = useState(true);

  const [drawOptions, setDrawOptions] = useState(getDefaultDrawOptions());

  const [broadcast, setBroadcast] = useState<DrawEventsBroadcast>();
  service.broadcast$.subscribe(_broadcast => setBroadcast(_broadcast));

  const drawHandler = (event: DrawEvent) => service.emit(event);

  const drawLine = (
    <ToolContent
      title="Draw line"
      dispose={() => setShowDrawLine(!showDrawLine)}
    >
      <DrawLine drawOptions={drawOptions} drawOptionsHandler={setDrawOptions} />
    </ToolContent>
  );

  const cut = (
    <ToolContent title="Cut" dispose={() => setShowCut(!showCut)}>
      <Cut />
    </ToolContent>
  );

  return (
    <div className="cw-whiteboard">
      <div className="cw-whiteboard__canvas" ref={canvasContainer}>
        <Canvas
          className="cw-whiteboard__canvas-draw"
          drawOptions={drawOptions}
          canvasSize={canvasSize}
          showGuides={showGuides}
          broadcast={broadcast}
          draw={drawHandler}
        />
        {showCut && (
          <Canvas
            className="cw-whiteboard__canvas-cut"
            drawOptions={drawOptions}
            canvasSize={canvasSize}
            showGuides={!showGuides}
            drawDisabled
            broadcast={historyCut}
          />
        )}
      </div>
      <ToolGroup>
        <Tool
          title="Draw line"
          clickHandler={() => setShowDrawLine(!showDrawLine)}
        >
          <Icon icon="drawLine" />
        </Tool>

        <Tool title="Undo" clickHandler={() => service.undo()}>
          <Icon icon="undo" />
        </Tool>

        <Tool title="Redo" clickHandler={() => service.redo()}>
          <Icon icon="redo" />
        </Tool>

        <Tool title="Cut" clickHandler={() => setShowCut(!showCut)}>
          <Icon icon="cut" />
        </Tool>

        <Tool title="Undo all" clickHandler={() => service.undoAll()}>
          <Icon icon="undoAll" />
        </Tool>

        <Tool
          title="Guides"
          active={showGuides}
          clickHandler={() => setShowGuides(!showGuides)}
        >
          <Icon icon="noGuides" />
        </Tool>

        <Tool title="Redraw" clickHandler={() => service.redraw()}>
          <Icon icon="redraw" />
        </Tool>
      </ToolGroup>
      {showDrawLine ? drawLine : null}
      {showCut ? cut : null}
    </div>
  );
};

Whiteboard.defaultProps = {
  fitParentElement: true
};

export default Whiteboard;
