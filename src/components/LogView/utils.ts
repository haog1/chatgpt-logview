export const scrollToBottom = (element: HTMLElement) => {
  element.scrollTop = element.scrollHeight;
};

export const scrollUp = (element: HTMLElement) => {
  element.scrollTop -= element.clientHeight;
};
