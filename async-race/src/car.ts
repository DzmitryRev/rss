import VirtualNode from './core/virtual-node/VirtualNode';
import renderDOM from './core/render/renderDOM';
import Component from './core/component/Component';
import API from './scripts/API/Api';

import { IState } from './core/component/types';
import { CarType } from './scripts/API/types';

interface ICarProps {
  name: string;
  color: string;
}
interface ICarState {
  cars: CarType[];
}
class CarE extends Component<ICarProps> {
  state: ICarState;

  constructor(props: ICarProps) {
    super(props);
    this.state = {
      cars: [],
    };
  }

  fetchCars() {
    API.getCars(1, (cars) => {
      this.setState({ ...this.state, cars });
    });
  }

  onMount(): void {
    this.fetchCars();
  }

  render(): VirtualNode {
    console.log('render component!!!!!!!!!');
    const element = new VirtualNode('div', '', [
      new VirtualNode('span', '', [
        this.props.name,
        this.props.color,
        new VirtualNode('div', '', [
          ...this.state.cars.map((car) => new VirtualNode('span', '', [car.name])),
        ]),
      ]),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default CarE;
