import classNames from 'classnames';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Draggable from 'react-draggable';
import Icon from '../icon/Icon';
import { DragPosition } from '../models';
import Tool from './Tool';

export interface ToolGroupProps {
  dragBounds?: string;
  dragPosition?: DragPosition;
  dragPositionHandler?: (position: DragPosition) => void;
}

const ToolGroup: React.FC<ToolGroupProps> = ({
  dragBounds,
  dragPosition,
  dragPositionHandler,
  children
}) => {
  const [layoutVertical, setLayoutVertical] = useState(true);
  const [collapse, setCollapse] = useState(false);

  const className = classNames('cw-tool-group', {
    'cw-tool-group--vertical': layoutVertical
  });

  return createPortal(
    <Draggable
      handle=".cw-tool-group__action--drag"
      bounds={dragBounds}
      position={dragPosition}
      onStop={(e, { x, y }) => dragPositionHandler({ x, y })}
    >
      <div className={className}>
        <Tool
          title="Drag / Change direction"
          classNameModifier="cw-tool-group__action--drag"
          doubleClickHandler={() => setLayoutVertical(!layoutVertical)}
        >
          <Icon icon="drag" />
        </Tool>
        {!collapse && children}
        <Tool
          title={collapse ? 'Expand' : 'Collapse'}
          active={collapse}
          clickHandler={() => setCollapse(!collapse)}
        >
          <Icon icon={collapse ? 'expand' : 'collapse'} />
        </Tool>
      </div>
    </Draggable>,
    document.body
  );
};

ToolGroup.defaultProps = {
  dragBounds: 'body',
  dragPositionHandler: () => {}
};

export default ToolGroup;
