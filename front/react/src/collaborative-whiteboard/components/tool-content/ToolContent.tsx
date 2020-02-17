import React from 'react';
import { createPortal } from 'react-dom';
import Draggable from 'react-draggable';
import Icon from '../icon/Icon';
import { DragPosition } from '../models';

export interface ToolContentProps {
  title: string;
  dispose: () => void;
  dragBounds?: string;
  dragPosition?: DragPosition;
  dragPositionHandler?: (position: DragPosition) => void;
}

const ToolContent: React.FC<ToolContentProps> = ({
  title,
  dispose,
  dragBounds,
  dragPosition,
  dragPositionHandler,
  children
}) => {
  return createPortal(
    <Draggable
      handle=".cw-tool-content__action--drag"
      bounds={dragBounds}
      position={dragPosition}
      onStop={(e, { x, y }) => dragPositionHandler({ x, y })}
    >
      <div className="cw-tool-content">
        <div className="cw-tool-content__header">
          <button className="cw-button--less cw-tool-content__action cw-tool-content__action--drag">
            <Icon icon="drag" />
          </button>
          <span className="cw-tool-content__title">{title}</span>
          <button
            type="button"
            className="cw-button--less cw-tool-content__action"
            onClick={dispose}
          >
            <Icon icon="dispose" />
          </button>
        </div>
        <div className="cw-tool-content__content">{children}</div>
      </div>
    </Draggable>,
    document.body
  );
};

ToolContent.defaultProps = {
  dragBounds: 'body',
  dragPositionHandler: () => {}
};

export default ToolContent;
