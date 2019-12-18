export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};


export const RENDER_POSITION = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`
};

export const render = (container, template, place = RENDER_POSITION.BEFOREEND) => {
  switch (place) {
    case RENDER_POSITION.AFTERBEGIN:
      container.prepend(template);
      break;
    case RENDER_POSITION.BEFOREEND:
      container.append(template);
      break;
    case RENDER_POSITION.AFTEREND:
      container.after(template);
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};
