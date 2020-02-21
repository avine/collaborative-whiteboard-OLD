import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import centered from '@storybook/addon-centered/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { select, withKnobs } from '@storybook/addon-knobs';

import Icon, { IconType } from './Icon';

export default {
  title: 'Icon',
  component: Icon,
  decorators: [centered, withKnobs]
};

export const Default = () => {
  const iconType = select<IconType>(
    'iconType',
    [
      'drawLine',
      'undo',
      'redo',
      'cut',
      'undoAll',
      'guides',
      'redraw',
      'expand',
      'collapse',
      'drag',
      'dispose'
    ],
    'drawLine'
  );

  return <Icon icon={iconType} />;
};
