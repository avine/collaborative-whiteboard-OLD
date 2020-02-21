import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
// eslint-disable-next-line import/no-extraneous-dependencies
import centered from '@storybook/addon-centered/react';
import { getDefaultDrawOptions } from '../../operators';
import DrawLine from './DrawLine';

export default {
  title: 'DrawLine',
  component: DrawLine,
  decorators: [centered]
};

export const Default = () => {
  const [drawOptions, setDrawOptions] = useState(getDefaultDrawOptions());
  return (
    <DrawLine
      drawOptions={drawOptions}
      drawOptionsHandler={_drawOptions => {
        setDrawOptions(_drawOptions);
        action('drawOptionsHandler')(_drawOptions);
      }}
    />
  );
};
