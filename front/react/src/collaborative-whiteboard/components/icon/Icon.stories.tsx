import React from 'react';
import Icon from './Icon';

export default {
  title: 'Icon',
  component: Icon
};

export const Default = () => {
  return (
    <>
      <Icon icon="drawLine" />
      &nbsp;
      <Icon icon="undo" />
      &nbsp;
      <Icon icon="redo" />
      &nbsp;
      <Icon icon="cut" />
      &nbsp;
      <Icon icon="undoAll" />
      &nbsp;
      <Icon icon="noGuides" />
      &nbsp;
      <Icon icon="redraw" />
      &nbsp;
      <Icon icon="expand" />
      &nbsp;
      <Icon icon="collapse" />
      &nbsp;
      <Icon icon="drag" />
      &nbsp;
      <Icon icon="dispose" />
    </>
  );
};
