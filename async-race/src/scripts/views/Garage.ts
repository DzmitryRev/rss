import Component from '../../core/component/Component';
import VirtualNode from '../../core/virtual-node/VirtualNode';
import API from '../API/Api';
import { CarType } from '../API/types';
import Car from '../components/Car/Car';
import Form from '../components/Form/Form';

interface IGarageState {
  cars: CarType[];
}

class Garage extends Component {
  state: IGarageState;

  constructor() {
    super();
    this.state = {
      cars: [],
    };
  }

  onMount(): void {
    API.getCars(1, (cars) => {
      this.setState({
        ...this.state,
        cars,
      });
    });
  }

  render() {
    console.log('Garage rendered');
    const element = new VirtualNode('div', '', [
      'GARAGE',
      new VirtualNode('div', '', [
        new Form().render(),
        ...this.state.cars.map((car) => new Car({ name: car.name, color: car.color }).render()),
      ]),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Garage;
