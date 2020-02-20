// eslint-disable-next-line import/prefer-default-export
export const getDefaultDragPosition = () => ({ x: 16, y: 56 });

export const centerDomElement = (element: HTMLElement) => {
  element.style.position = 'absolute';

  const { offsetWidth, offsetHeight } = element;
  const getPosition = (offset: number) =>
    `calc(50% - ${Math.round(offset / 2)}px)`;

  element.style.top = getPosition(offsetHeight);
  element.style.left = getPosition(offsetWidth);
};

export const fitParentDomElement = (element: HTMLElement) => {
  // Fit the parent element
  element.style.position = 'absolute';
  element.style.width = '100%';
  element.style.height = '100%';

  // Freeze element size
  const { width, height } = element.getBoundingClientRect();
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;

  return { width, height };
};
