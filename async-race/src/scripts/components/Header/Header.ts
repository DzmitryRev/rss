import Component from '../../../core/component/Component';
import VirtualNode from '../../../core/virtual-node/VirtualNode';
import Button from '../Button/Button';
import { IHeaderProps } from './Header.types';

class Header extends Component<IHeaderProps> {
  render() {
    const element = new VirtualNode('header', '', [
      'HEADER',
      //   ...this.props.availableRoutes.map(
      //     (route) => new VirtualNode('button', '', [route], {
      //       type: 'click',
      //       callback: () => {
      //         this.props.changeRoute(route);
      //       },
      //     }),
      //   ),
      new Button({
        title: 'Garage',
        color: 'green',
        event: () => {
          this.props.changeRoute('garage');
        },
      }).render(),
      new Button({
        title: 'Winners',
        color: 'blue',
        event: () => {
          this.props.changeRoute('winners');
        },
      }).render(),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Header;
