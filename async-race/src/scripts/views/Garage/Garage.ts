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

  updateCar(name: string, color: string, id: number) {
    API.updateCar(id, { name, color }, () => {
      this.getCars();
    });
  }

  deleteCar(id: number) {
    API.removeCar(id, () => {
      this.getCars();
    });
  }

  onMount(): void {
    this.getCars();
  }

  render() {
    const element = new VirtualNode('div', '', [
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
          deleteCar: (id: number) => {
            this.deleteCar(id);
          },
          updateCar: (name: string, color: string, id: number) => {
            this.updateCar(name, color, id);
          },
        }).render()),
      ]),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Garage;
