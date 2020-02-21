import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
// eslint-disable-next-line import/no-extraneous-dependencies
import centered from '@storybook/addon-centered/react';
import CutUi from './CutUi';
import { CutRange } from '../../models';

export default {
  title: 'CutUi',
  component: CutUi,
  decorators: [centered]
};

export const Default = () => {
  const cutLength = 10;
  const [cutRange, setCutRange] = useState<CutRange>([0, 0]);

  return (
    <CutUi
      cutLength={cutLength}
      cutRange={cutRange}
      cutRangeHandler={_cutRange => {
        setCutRange(_cutRange);
        action('cutRangeHandler')(_cutRange);
      }}
      cutHandler={action('cut')}
    />
  );
};
