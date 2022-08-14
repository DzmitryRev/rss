import { IVirtualNode, EventType } from './VirtualNode.types';

class VirtualNode<T extends HTMLElement = HTMLElement> implements IVirtualNode<T> {
  element: T;

  children: (IVirtualNode | string | SVGSVGElement)[];

  constructor(
    tag: keyof HTMLElementTagNameMap,
    className: string,
    children: (IVirtualNode | string | SVGSVGElement)[] = [],
    event: EventType | null = null,
  ) {
    this.element = <T>document.createElement(tag);
    if (className) this.element.className = className;
    this.children = children;
    if (event) {
      this.element.addEventListener(event.type, (e) => {
        e.preventDefault();
        event.callback(e);
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
      if (item instanceof SVGSVGElement) {
        this.element.insertAdjacentElement('beforeend', item);
        return;
      }
      this.element.insertAdjacentElement('beforeend', item.element);
    });
  }
}
export default VirtualNode;
