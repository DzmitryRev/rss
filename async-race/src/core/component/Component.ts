/* eslint-disable class-methods-use-this */
import VirtualNode from '../virtual-node/VirtualNode';
import { IState, IProps } from './types';

abstract class Component<T = null> {
  element: VirtualNode;

  state: IState;

  props: T | null;

  constructor(props: T = null) {
    this.props = props;
    this.onMount();
  }

  setState<K>(newState: K) {
    this.state = newState;
    const newNode = this.render();
    this.element.children = newNode.children;
    this.element.renderChildren();
  }

  onMount(): void {
    // runs once
  }

  abstract render(): VirtualNode;
}

export default Component;
