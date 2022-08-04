import Component from '../../../core/component/Component';
import VirtualNode from '../../../core/virtual-node/VirtualNode';
import Button from '../Button/Button';
import { IHeaderProps } from './Header.types';
import './Header.css';

class Header extends Component<IHeaderProps> {
  render() {
    const element = new VirtualNode('header', 'header', [
      ...this.props.availableRoutes.map((route) => new Button({
        title: `to ${route}`,
        color: 'green',
        disabled: false,
        event: () => {
          this.props.changeRoute(route);
        },
      }).render()),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Header;
