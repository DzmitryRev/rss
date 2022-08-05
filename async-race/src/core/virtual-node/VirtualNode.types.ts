export interface IVirtualNode<T = HTMLElement> {
  element: T;
  children: (IVirtualNode | string | SVGSVGElement)[];
}

export type EventType = {
  type: keyof HTMLElementEventMap;
  callback(e: Event): void;
};
