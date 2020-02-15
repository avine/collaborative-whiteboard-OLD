import React, { useState } from 'react';
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
      drawOptionsHandler={setDrawOptions}
      showCut={showCut}
      showCutHandler={setShowCut}
      showGuides={showGuides}
      showGuidesHandler={setShowGuides}
    />
  );
};
