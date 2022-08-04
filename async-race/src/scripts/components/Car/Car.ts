/* eslint-disable class-methods-use-this */
import Component from '../../../core/component/Component';
import VirtualNode from '../../../core/virtual-node/VirtualNode';
import API from '../../API/Api';
import Button from '../Button/Button';
import { CarPropsType } from './Car.types';

interface ICarState {
  editMode: boolean;
}

class Car extends Component<CarPropsType> {
  state: ICarState;

  constructor(props: CarPropsType) {
    super(props);
    this.state = {
      editMode: false,
    };
  }

  createInput(
    value: string,
    type: 'text' | 'color',
    className: string,
  ): VirtualNode<HTMLInputElement> {
    const input = new VirtualNode<HTMLInputElement>('input', className);
    input.element.type = type;
    input.element.value = value;
    return input;
  }

  updateCar(name: string, color: string): void {
    API.updateCar(this.props.id, { name, color }, () => {
      this.props.getCars();
    });
  }

  render() {
    const input = this.createInput(this.props.name, 'text', 'text-input');
    const color = this.createInput(this.props.color, 'color', 'color-input');
    const element = new VirtualNode('div', 'car', [
      new Button({
        title: this.state.editMode ? 'save' : 'edit',
        color: 'green',
        event: () => {
          if (this.state.editMode) {
            this.updateCar(input.element.value, color.element.value);
          }
          this.setState({
            ...this.state,
            editMode: !this.state.editMode,
          });
        },
      }).render(),
      ' => ',
      this.state.editMode ? input : new VirtualNode('span', '', [this.props.name]),
      ' => ',
      this.state.editMode ? color : new VirtualNode('span', '', [this.props.color]),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Car;
