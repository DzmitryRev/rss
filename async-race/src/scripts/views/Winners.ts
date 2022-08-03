import Component from '../../core/component/Component';
import VirtualNode from '../../core/virtual-node/VirtualNode';

class Winners extends Component {
  //   constructor() {}

  render() {
    const element = new VirtualNode('div', '', ['WINNERS']);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Winners;
