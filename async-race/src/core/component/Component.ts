import VirtualNode from '../virtual-node/VirtualNode';

abstract class Component<P = null> {
  element: VirtualNode;

  state: unknown;

  props: P | null;

  constructor(props: P = null) {
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
    // TODO: this!
    console.log(this);
    // runs once
  }

  abstract render(): VirtualNode;
}

export default Component;
