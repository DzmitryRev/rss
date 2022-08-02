import Component from '../../core/component/Component';
import VirtualNode from '../../core/virtual-node/VirtualNode';
import { IAppState, RouteType } from '../App.types';

type IHeaderProps = IAppState & {
  changeRoute(newRoute: RouteType): void;
};

class Header extends Component<IHeaderProps> {
  //   constructor(props: IHeaderProps) {
  //     super(props);
  //   }

  render() {
    const element = new VirtualNode('header', '', [
      'HEADER',
      ...this.props.availableRoutes.map(
        (route) => new VirtualNode('button', '', [route], {
          type: 'click',
          callback: () => {
            this.props.changeRoute(route);
          },
        }),
      ),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Header;
