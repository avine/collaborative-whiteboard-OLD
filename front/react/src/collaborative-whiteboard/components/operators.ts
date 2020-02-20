// eslint-disable-next-line import/prefer-default-export
export const getDefaultDragPosition = () => ({ x: 16, y: 56 });

export const centerDomElement = (element: HTMLElement) => {
  const { offsetWidth, offsetHeight } = element;
  const getPosition = (offset: number) =>
    `calc(50% - ${Math.round(offset / 2)}px)`;

  element.style.left = getPosition(offsetWidth);
  element.style.top = getPosition(offsetHeight);
};

export const fitParentDomElement = (element: HTMLElement) => {
  // Fit the parent element
  element.style.width = '100%';
  element.style.height = '100%';

  // Freeze element size
  const { offsetWidth: width, offsetHeight: height } = element;
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;

  return { width, height };
};
