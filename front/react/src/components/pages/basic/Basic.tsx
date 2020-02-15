import React from 'react';
import Canvas from '../../../collaborative-whiteboard/components/canvas/Canvas';

const Basic: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ margin: 'auto', backgroundColor: 'white' }}>
        <Canvas />
      </div>
    </div>
  );
};

export default Basic;
