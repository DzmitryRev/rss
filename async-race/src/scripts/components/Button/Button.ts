import Component from '../../../core/component/Component';
import VirtualNode from '../../../core/virtual-node/VirtualNode';
import { ButtonPropsType } from './Button.types';
import './Button.css';

class Button extends Component<ButtonPropsType> {
  render() {
    const element = new VirtualNode('button', `button ${this.props.color}`, [this.props.title], {
      type: 'click',
      callback: () => {
        this.props.event();
      },
    });
    if (!this.element) this.element = element;
    return element;
  }
}

export default Button;
