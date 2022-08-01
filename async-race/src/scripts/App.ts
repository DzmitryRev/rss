import Component from '../core/component/Component';
import { IState } from '../core/component/types';
import VirtualNode from '../core/virtual-node/VirtualNode';
import Header from './components/Header';
import Garage from './views/Garage';
import Winners from './views/Winners';

type RouteType = 'garage' | 'winners';

type availableRoutesType = RouteType[];

interface IAppState extends IState {
  availableRoutes: availableRoutesType;
  activeRoute: RouteType;
}

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
    this.setState({ ...this.state, route });
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
    const element = new VirtualNode('div', '', [
      new Header().render(),
      new VirtualNode('main', '', [this.renderRoute()]),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default App;
