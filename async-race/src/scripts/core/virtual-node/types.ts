export interface IVirtualNode {
  element: HTMLElement;
  children: (IVirtualNode | string)[];
}

export type EventType = {
  type: string;
  callback(): void;
};
