import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import { getDefaultDrawOptions } from '../../operators';
import CanvasTool from './CanvasTool';

export default {
  title: 'CanvasTool',
  component: CanvasTool
};

export const Default = () => {
  const [drawOptions, setDrawOptions] = useState(getDefaultDrawOptions());
  const [showCut, setShowCut] = useState(false);
  const [showGuides, setShowGuides] = useState(true);

  return (
    <CanvasTool
      drawOptions={drawOptions}
      drawOptionsHandler={_drawOptions => {
        setDrawOptions(_drawOptions);
        action('drawOptionsHandler')(_drawOptions);
      }}
      showCut={showCut}
      showCutHandler={setShowCut}
      showGuides={showGuides}
      showGuidesHandler={setShowGuides}
    />
  );
};
