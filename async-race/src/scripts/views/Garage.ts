import Component from '../../core/component/Component';
import VirtualNode from '../../core/virtual-node/VirtualNode';

class Garage extends Component {
  //   constructor() {}

  render() {
    const element = new VirtualNode('div', '', ['GARAGE']);
    if (!this.element) this.element = element;
    return element;
  }
}
