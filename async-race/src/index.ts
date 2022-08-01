/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */

import VirtualNode from './core/virtual-node/VirtualNode';
import renderDOM from './core/render/renderDOM';
import Component from './core/component/Component';
import API from './scripts/API/Api';
import CarE from './car';

import { IState } from './core/component/types';
import { CarType } from './scripts/API/types';

interface IAppState extends IState {
  count: number;
  cars: CarType[];
}
class App extends Component {
  state: IAppState;

  constructor() {
    super();
    this.state = {
      count: 0,
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
    console.log('render App');
    const element = new VirtualNode('div', '', [
      'hello',
      new VirtualNode('h1', '', ['hello']),
      new VirtualNode('h4', '', ['world']),
      new VirtualNode('div', '', [
        new VirtualNode('span', '', [`${this.state.count}`], {
          type: 'click',
          callback: () => {
            this.setState<IAppState>({
              ...this.state,
              count: this.state.count + 1,
            });
          },
        }),
        new VirtualNode('span', '', ['world']),
        ...this.state.cars.map((car) => new CarE({ name: car.name, color: car.color }).render()),
      ]),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

const root = document.getElementById('app');

renderDOM(root, new App().render());
