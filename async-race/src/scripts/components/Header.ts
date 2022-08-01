import Component from '../../core/component/Component';
import VirtualNode from '../../core/virtual-node/VirtualNode';

class Header extends Component {
  //   constructor() {}

  render() {
    const element = new VirtualNode('header', '', ['HEADER']);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Header;
