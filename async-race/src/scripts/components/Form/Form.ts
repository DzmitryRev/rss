import Component from '../../../core/component/Component';
import VirtualNode from '../../../core/virtual-node/VirtualNode';
import API from '../../API/Api';
import Button from '../Button/Button';
import './Form.css';

type FormPropsType = {
  buttonTitle: string;
  getCars(): void;
  disabled?: boolean;
};

class Form extends Component<FormPropsType> {
  createCar(name: string, color: string) {
    API.createCar({ name, color }, () => {
      this.props.getCars();
    });
  }

  render() {
    const input = new VirtualNode<HTMLInputElement>('input', 'text-input', []);
    const color = new VirtualNode<HTMLInputElement>('input', 'color-input', []);
    color.element.type = 'color';
    input.element.required = true;
    input.element.minLength = 2;
    input.element.maxLength = 20;
    color.element.required = true;
    if (this.props.disabled) {
      input.element.disabled = true;
      color.element.disabled = true;
    }
    const element = new VirtualNode('form', 'form', [
      input,
      color,
      new Button({
        title: this.props.buttonTitle,
        color: 'blue',
        disabled: this.props.disabled || false,
        event: () => {
          if (input.element.validity.valid && color.element.validity.valid) {
            this.createCar(input.element.value, color.element.value);
            input.element.value = '';
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
