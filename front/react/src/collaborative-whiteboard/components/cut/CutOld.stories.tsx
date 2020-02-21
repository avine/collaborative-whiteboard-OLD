import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import centered from '@storybook/addon-centered/react';
import Cut from './CutOld';

export default {
  title: 'CutOld',
  component: Cut,
  decorators: [centered]
};

export const Default = () => <Cut />;
