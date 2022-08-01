import VirtualNode from '../virtual-node/VirtualNode';

function renderDOM(root: HTMLElement, node: VirtualNode): void {
  root.insertAdjacentElement('beforeend', node.element);
}

export default renderDOM;
