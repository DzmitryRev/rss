import { IVirtualNode, EventType } from './types';

class VirtualNode implements IVirtualNode {
  element: HTMLElement;

  children: (IVirtualNode | string)[];

  constructor(
    tag: keyof HTMLElementTagNameMap,
    className: string,
    children: (IVirtualNode | string)[] = [],
    event: EventType | null = null,
  ) {
    this.element = document.createElement(tag);
    if (className) this.element.className = className;
    this.children = children;
    if (event) {
      this.element.addEventListener(event.type, () => {
        event.callback();
      });
    }
    this.renderChildren();
  }

  renderChildren(): void {
    this.element.innerHTML = '';
    this.children.forEach((item) => {
      if (typeof item === 'string') {
        this.element.insertAdjacentText('beforeend', item);
        return;
      }
      this.element.insertAdjacentElement('beforeend', item.element);
    });
  }
}
export default VirtualNode;
