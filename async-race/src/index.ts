// /* eslint-disable max-classes-per-file */
// import { CarType } from './scripts/API/types';
// import GarageModel from './scripts/models/GarageModel';
import { VirtualNode } from './scripts/core/virtual-node/VirtualNode';

// const a = new GarageModel();

// class Car {
//   el: Root;

//   state: {
//     name: string;
//     color: string;
//   };

//   props: {
//     name: string;
//     color: string;
//   };

//   constructor(props: { name: string; color: string }) {
//     this.props = props;
//     this.state = {
//       name: props.name,
//       color: props.color,
//     };
//   }

//   render() {
//     console.log('render car');
//     const el = new Root('div', [new Root('span',
// [`${this.props.name}`, `${this.props.color}`])]);
//     if (!this.el) this.el = el;
//     return el;
//   }
// }

// interface Component<T> {
//   el: Root;
//   render: () => Root;
//   state?: T;
// }

// class App {
//   el: Root;

//   model: GarageModel;

//   state: {
//     cars: CarType[];
//   };

//   constructor() {
//     this.state = {
//       cars: [],
//     };
//     this.model = a;
//     // this.fetchCars();
//     this.fetchCars();
//   }

//   setState(newState: { cars: CarType[] }) {
//     this.state = newState;
//     const newEl = this.render();
//     this.el.children = newEl.children;
//     this.el.update();
//   }

//   //   update() {
//   //     const newEl = this.render();
//   //     this.el.children = newEl.children;
//   //     this.el.update();
//   //   }

//   fetchCars() {
//     console.log(this.model);
//     this.model.getCars((cars) => {
//       this.setState({
//         cars,
//       });
//       console.log(cars);
//     });
//   }

//   render() {
//     console.log('render App');
//     const el = new Root(
//       'div',
//       ['Hello',
// ...this.state.cars.map((car) => new Car({ name: car.name, color: car.color }).render())],
//     );
//     if (!this.el) this.el = el;
//     return el;
//   }
// }

// document
//   .getElementById('app')
//   .insertAdjacentElement(
//     'beforeend',
//     new VirtualNode('div', '', [
//       'Hello',
//       new VirtualNode('h1', '', ['Hello', new VirtualNode('h3', '', ['hello'])]),
//     ]).element,
//   );
