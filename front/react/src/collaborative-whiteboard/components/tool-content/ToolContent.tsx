import classNames from 'classnames';
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';
import Draggable from 'react-draggable';
import DraggableOnTopContext, { getNewId } from '../draggableOnTopContext';
import Icon from '../icon/Icon';
import { DragPosition } from '../models';
import { centerDomElement } from '../operators';

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
  const ref = useRef<HTMLDivElement>();
  useLayoutEffect(() => centerDomElement(ref.current), []);

  const draggableOnTopContext = useContext(DraggableOnTopContext);

  const [id, setId] = useState<number>();
  useEffect(() => {
    const newId = getNewId();
    setId(newId);
    draggableOnTopContext.setId(newId);
  }, [draggableOnTopContext]);

  const [className, setClassName] = useState('cw-tool-content');

  useEffect(() => {
    const subscription = draggableOnTopContext.id$.subscribe(_id => {
      setClassName(
        classNames('cw-tool-content', { 'cw-tool-content--on-top': id === _id })
      );
    });
    return () => subscription.unsubscribe();
  }, [draggableOnTopContext, id]);

  const displayOnTop = () => draggableOnTopContext.setId(id);

  return createPortal(
    <Draggable
      handle=".cw-tool-content__action--drag"
      bounds={dragBounds}
      position={dragPosition}
      onStop={(e, { x, y }) => dragPositionHandler({ x, y })}
    >
      <div
        ref={ref}
        className={className}
        onMouseEnter={displayOnTop}
        onClick={displayOnTop}
      >
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
