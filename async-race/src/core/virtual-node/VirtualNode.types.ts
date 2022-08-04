export interface IVirtualNode<T = HTMLElement> {
  element: T;
  children: (IVirtualNode | string)[];
}

export type EventType = {
  type: keyof HTMLElementEventMap;
  callback(e: Event): void;
};
