import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import ToolContent from './ToolContent';

export default {
  title: 'ToolContent',
  component: ToolContent
};

export const Default = () => (
  <ToolContent title="Lorem ipsum" dispose={action('dispose')}>
    Lorem ipsum dolor sit amet,
    <br />
    consectetur adipiscing elit,
    <br />
    sed do eiusmod tempor incididunt
    <br />
    ut labore et dolore magna aliqua.
  </ToolContent>
);
