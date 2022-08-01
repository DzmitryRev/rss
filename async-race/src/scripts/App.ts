import Component from '../core/component/Component';
import VirtualNode from '../core/virtual-node/VirtualNode';

class App extends Component {
  //   constructor() {}

  render() {
    const element = new VirtualNode('div', '');
    if (!this.element) this.element = element;
    return element;
  }
}
