import Component from '../core/component/Component';
import VirtualNode from '../core/virtual-node/VirtualNode';
import '../styles/app.css';
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
      activeRoute: 'garage',
    };
  }

  changeRoute(route: RouteType) {
    this.setState({ ...this.state, activeRoute: route });
  }

  renderRoute(): VirtualNode {
    switch (this.state.activeRoute) {
      case 'garage': {
        return new Garage().render();
      }
      case 'winners': {
        return new Winners().render();
      }
      default: {
        return new Garage().render();
      }
    }
  }

  render() {
    const element = new VirtualNode('div', 'app', [
      new Header({
        availableRoutes: this.state.availableRoutes,
        activeRoute: this.state.activeRoute,
        changeRoute: (newRoute) => {
          this.changeRoute(newRoute);
        },
      }).render(),
      new VirtualNode('main', '', [this.renderRoute()]),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default App;
