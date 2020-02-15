import React, { useState } from 'react';
import { defaultColor, getDefaultColors } from '../../operators';
import ColorPicker from './ColorPicker';

export default {
  title: 'ColorPicker',
  component: ColorPicker
};

export const Default = () => {
  const [color, setColor] = useState(defaultColor);

  return (
    <ColorPicker
      colors={getDefaultColors()}
      color={color}
      colorHandler={setColor}
    />
  );
};
