import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
// eslint-disable-next-line import/no-extraneous-dependencies
import centered from '@storybook/addon-centered/react';
import { defaultColor, getDefaultColors } from '../../operators';
import ColorPicker from './ColorPicker';

export default {
  title: 'ColorPicker',
  component: ColorPicker,
  decorators: [centered]
};

export const Default = () => {
  const [color, setColor] = useState(defaultColor);

  return (
    <ColorPicker
      colors={getDefaultColors()}
      color={color}
      colorHandler={clr => {
        setColor(clr);
        action('colorHandler')(clr);
      }}
    />
  );
};
