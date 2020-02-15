import React from 'react';

import ToolContent from './ToolContent';

export default {
  title: 'ToolContent',
  component: ToolContent
};

export const Default = () => {
  return (
    <ToolContent title="Lorem ipsum" dispose={() => {}}>
      Lorem ipsum dolor sit amet,
      <br />
      consectetur adipiscing elit,
      <br />
      sed do eiusmod tempor incididunt
      <br />
      ut labore et dolore magna aliqua.
    </ToolContent>
  );
};
