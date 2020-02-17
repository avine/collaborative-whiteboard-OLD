/* eslint-disable react/prop-types */
import classNames from 'classnames';
import React from 'react';

export interface ToolProps {
  title?: string;
  classNameModifier?: string;
  active?: boolean;
  clickHandler?: () => void;
  doubleClickHandler?: () => void;
}

const Tool: React.FC<ToolProps> = ({
  title,
  classNameModifier,
  active,
  clickHandler,
  doubleClickHandler,
  children
}) => {
  const className = classNames(
    'cw-button--less',
    'cw-tool-group__action',
    classNameModifier,
    {
      'cw-tool-group__action--active': active
    }
  );

  return (
    <button
      type="button"
      title={title}
      className={className}
      onClick={clickHandler}
      onDoubleClick={doubleClickHandler}
    >
      {children}
    </button>
  );
};

Tool.defaultProps = {
  classNameModifier: 'cw-tool-group__action--tool',
  active: false,
  clickHandler: () => {},
  doubleClickHandler: () => {}
};

export default Tool;
