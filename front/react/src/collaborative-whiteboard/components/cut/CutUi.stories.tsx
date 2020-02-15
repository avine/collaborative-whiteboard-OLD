import React, { useState } from 'react';
import CutUi from './CutUi';
import { CutRange } from '../../models';

export default {
  title: 'CutUi',
  component: CutUi
};

export const Default = () => {
  const cutLength = 5;
  const [cutRange, setCutRange] = useState<CutRange>([0, 0]);

  return (
    <>
      <CutUi
        cutLength={cutLength}
        cutRange={cutRange}
        cutRangeHandler={setCutRange}
      />
      <br />
      {`${cutRange[0]}/${cutRange[1]}`}
    </>
  );
};
