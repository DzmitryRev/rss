import Component from '../../../core/component/Component';
import VirtualNode from '../../../core/virtual-node/VirtualNode';
import { CarPropsType } from './Car.types';

class Car extends Component<CarPropsType> {
  //   constructor(props: CarPropsType) {
  //     super(props);
  //   }

  render() {
    const element = new VirtualNode('div', 'car', [
      new VirtualNode('span', '', [this.props.name]),
      ' => ',
      new VirtualNode('span', '', [this.props.color]),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Car;
