import Component from '../../../core/component/Component';
import VirtualNode from '../../../core/virtual-node/VirtualNode';
import API from '../../API/Api';
import Button from '../Button/Button';
import './Form.css';
import { FormPropsType } from './Form.types';

class Form extends Component<FormPropsType> {
  createCar(name: string, color: string) {
    API.createCar({ name, color }, () => {
      this.props.getCars();
    });
  }

  createInputs(): VirtualNode<HTMLInputElement>[] {
    const text = new VirtualNode<HTMLInputElement>('input', 'text-input', []);
    const color = new VirtualNode<HTMLInputElement>('input', 'color-input', []);
    color.element.type = 'color';
    text.element.required = true;
    text.element.minLength = 2;
    text.element.maxLength = 20;
    color.element.required = true;
    if (this.props.disabled) {
      text.element.disabled = true;
      color.element.disabled = true;
    }
    return [text, color];
  }

  render() {
    const [text, color] = this.createInputs();
    const element = new VirtualNode('form', 'form', [
      text,
      color,
      new Button({
        title: this.props.buttonTitle,
        color: 'blue',
        disabled: this.props.disabled || false,
        event: () => {
          if (text.element.validity.valid && color.element.validity.valid) {
            this.createCar(text.element.value, color.element.value);
            text.element.value = '';
            color.element.value = '#000000';
          }
        },
      }).render(),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Form;
