import React, { useState } from 'react';
import Icon from '../icon/Icon';
import ToolContent from '../tool-content/ToolContent';
import Tool from './Tool';
import ToolGroup from './ToolGroup';

export default {
  title: 'ToolGroup',
  component: ToolGroup
};

export const Default = () => {
  const [showDrawLine, setShowDrawLine] = useState(false);
  const [showGuides, setShowGuides] = useState(true);

  const drawLine = (
    <ToolContent
      title="Draw line"
      dispose={() => setShowDrawLine(!showDrawLine)}
    >
      Draw line tool...
    </ToolContent>
  );

  return (
    <>
      <ToolGroup>
        <Tool
          title="Draw line"
          active={showDrawLine}
          clickHandler={() => setShowDrawLine(!showDrawLine)}
        >
          <Icon icon="drawLine" />
        </Tool>

        <Tool title="Undo">
          <Icon icon="undo" />
        </Tool>

        <Tool title="Redo">
          <Icon icon="redo" />
        </Tool>

        <Tool title="Undo all">
          <Icon icon="undoAll" />
        </Tool>

        <Tool
          title="Guides"
          active={showGuides}
          clickHandler={() => setShowGuides(!showGuides)}
        >
          <Icon icon="guides" />
        </Tool>
      </ToolGroup>
      {showDrawLine ? drawLine : null}
    </>
  );
};
