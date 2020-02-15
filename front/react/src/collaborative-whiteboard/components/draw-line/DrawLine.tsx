/* eslint-disable react/prop-types */
import React from 'react';
import { DrawOptions } from '../../models';
import { getDefaultDrawOptions, defaultLineWidthMax } from '../../operators';
import ColorPicker from '../color-picker/ColorPicker';

export interface DrawLineProps {
  lineWidthMax?: number;
  drawOptions: DrawOptions;
  drawOptionsHandler?: (drawOptions: DrawOptions) => void;
}
const DrawLine: React.FC<DrawLineProps> = ({
  lineWidthMax,
  drawOptions,
  drawOptionsHandler
}) => {
  const lineWidthHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    drawOptionsHandler({ ...drawOptions, lineWidth: +event.target.value });
  };

  const colorHandler = (color: string) => {
    drawOptionsHandler({ ...drawOptions, strokeStyle: color });
  };

  return (
    <>
      <div className="cw-draw-line__controller">
        <input
          className="cw-draw-line__field"
          type="range"
          min="1"
          max={lineWidthMax}
          value={drawOptions.lineWidth}
          onChange={lineWidthHandler}
        />
        <span className="cw-draw-line__number">{drawOptions.lineWidth}</span>
      </div>
      <div className="cw-draw-line__controller">
        <ColorPicker
          color={drawOptions.strokeStyle}
          colorHandler={colorHandler}
        />
      </div>
    </>
  );
};

DrawLine.defaultProps = {
  lineWidthMax: defaultLineWidthMax,
  drawOptions: getDefaultDrawOptions(),
  drawOptionsHandler: () => {}
};

export default DrawLine;
