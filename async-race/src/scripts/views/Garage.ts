import Component from '../../core/component/Component';
import VirtualNode from '../../core/virtual-node/VirtualNode';
import API from '../API/Api';

class Garage extends Component {
  // constructor() {}

  onMount(): void {
    API.getCars(1, (cars) => {
      console.log(cars, this);
    });
  }

  render() {
    const element = new VirtualNode('div', '', ['GARAGE']);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Garage;
