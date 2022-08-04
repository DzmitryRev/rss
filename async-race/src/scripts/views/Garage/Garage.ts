import Component from '../../../core/component/Component';
import VirtualNode from '../../../core/virtual-node/VirtualNode';
import API from '../../API/Api';
import Car from '../../components/Car/Car';
import Form from '../../components/Form/Form';
import { IGarageState } from './Garage.types';

class Garage extends Component {
  state: IGarageState;

  constructor() {
    super();
    this.state = {
      cars: [],
    };
  }

  getCars() {
    API.getCars(1, (cars) => {
      this.setState({
        ...this.state,
        cars,
      });
    });
  }

  onMount(): void {
    this.getCars();
  }

  render() {
    const element = new VirtualNode('div', '', [
      'GARAGE',
      new VirtualNode('div', '', [
        new Form({
          buttonTitle: 'create',
          getCars: () => {
            this.getCars();
          },
        }).render(),
        ...this.state.cars.map((car) => new Car({
          name: car.name,
          color: car.color,
          id: car.id,
          getCars: () => {
            this.getCars();
          },
        }).render()),
      ]),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Garage;
