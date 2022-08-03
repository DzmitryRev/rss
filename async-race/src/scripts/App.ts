import Component from '../core/component/Component';
import VirtualNode from '../core/virtual-node/VirtualNode';
import './App.css';
import { IAppState, RouteType } from './App.types';
import Header from './components/Header/Header';
import Garage from './views/Garage';
import Winners from './views/Winners';

class App extends Component {
  state: IAppState;

  constructor() {
    super();
    this.state = {
      availableRoutes: ['garage', 'winners'],
    //   activeRoute: 'garage',
    };
  }

  //   changeRoute(route: RouteType) {
  //     if (route === this.state.activeRoute) return;
  //     this.setState({ ...this.state, activeRoute: route });
  //   }

  //   renderRoute(): VirtualNode {
  //     switch (this.state.activeRoute) {
  //       case 'garage': {
  //         return new Garage().render();
  //       }
  //       case 'winners': {
  //         return new Winners().render();
  //       }
  //       default: {
  //         return new Garage().render();
  //       }
  //     }
  //   }

  render() {
    const views = [
      new VirtualNode('div', 'garage', [new Garage().render()]),
      new VirtualNode('div', 'winners', [new Winners().render()]),
    ];
    const toggleRoutes = (newRoute?: string) => {
      views.forEach((route) => {
        switch (newRoute) {
          case 'garage': {
            if (route.element.classList.contains('garage')) {
              route.element.classList.remove('none');
            } else {
              route.element.classList.add('none');
            }
            break;
          }
          case 'winners': {
            if (route.element.classList.contains('winners')) {
              route.element.classList.remove('none');
            } else {
              route.element.classList.add('none');
            }
            break;
          }
          default: {
            if (route.element.classList.contains('garage')) {
              route.element.classList.remove('none');
            } else {
              route.element.classList.add('none');
            }
          }
        }
      });
    };
    toggleRoutes();
    const element = new VirtualNode('div', 'app', [
      new VirtualNode('div', 'wrapper', [
        new Header({
          availableRoutes: this.state.availableRoutes,
          //   activeRoute: this.state.activeRoute,
          changeRoute: (newRoute) => {
            // this.changeRoute(newRoute);
            toggleRoutes(newRoute);
          },
        }).render(),
        // new VirtualNode('main', '', [this.renderRoute()]),
        new VirtualNode('main', '', [...views]),
      ]),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default App;
