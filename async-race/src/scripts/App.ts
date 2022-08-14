import Component from '../core/component/Component';
import VirtualNode from '../core/virtual-node/VirtualNode';
import './App.css';
import { AvailableRoutesType } from './App.types';
import Header from './components/Header/Header';
import Garage from './views/Garage/Garage';
import Winners from './views/Winners/Winners';

class App extends Component {
  render() {
    let bindGarageToWinners: (() => void) | null = null;
    // 'CSS' routing logic
    const availableRoutes: AvailableRoutesType[] = ['garage', 'winners'];
    const routesView = [
      new VirtualNode('div', 'garage', [new Garage().render()]),
      new VirtualNode('div', 'winners', [
        new Winners({
          bindGarageToWinners: (cb: () => void) => {
            bindGarageToWinners = cb;
          },
        }).render(),
      ]),
    ];
    const changeRoute = (newRoute?: AvailableRoutesType) => {
      routesView.forEach((route) => {
        switch (newRoute) {
          case 'garage': {
            if (route.element.classList.contains('garage')) {
              route.element.classList.remove('hidden-view');
            } else {
              route.element.classList.add('hidden-view');
            }
            break;
          }
          case 'winners': {
            bindGarageToWinners();
            if (route.element.classList.contains('winners')) {
              route.element.classList.remove('hidden-view');
            } else {
              route.element.classList.add('hidden-view');
            }
            break;
          }
          default: {
            if (route.element.classList.contains('garage')) {
              route.element.classList.remove('hidden-view');
            } else {
              route.element.classList.add('hidden-view');
            }
          }
        }
      });
    };
    // Initial call
    changeRoute();
    //

    const element = new VirtualNode('div', 'app', [
      new VirtualNode('div', 'wrapper', [
        new Header({
          availableRoutes,
          changeRoute: (newRoute) => {
            changeRoute(newRoute);
          },
        }).render(),
        new VirtualNode('main', 'main', [...routesView]),
      ]),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default App;
