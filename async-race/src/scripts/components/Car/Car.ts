/* eslint-disable class-methods-use-this */
import Component from '../../../core/component/Component';
import VirtualNode from '../../../core/virtual-node/VirtualNode';

import CarButtonsSection from '../CarButtonsSection/CarButtonsSection';

import { CarPropsType, ICarState } from './Car.types';
import './Car.css';

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
    input.element.required = true;
    input.element.minLength = 2;
    input.element.maxLength = 20;
    return input;
  }

  render(): VirtualNode {
    const input = this.createInput(this.props.name, 'text', 'text-input small-text-input');
    const color = this.createInput(
      this.props.color,
      'color',
      'color-input small small-color-input',
    );

    const updateCar = () => {
      if (this.state.editMode) {
        if (input.element.validity.valid && color.element.validity.valid) {
          if (input.element.value === this.props.name && color.element.value === this.props.color) {
            this.setState({
              ...this.state,
              editMode: !this.state.editMode,
            });
            return;
          }
          this.props.updateCar(input.element.value, color.element.value, this.props.id);
        }
        return;
      }
      this.setState({
        ...this.state,
        editMode: !this.state.editMode,
      });
    };

    const element = new VirtualNode('div', 'car', [
      new CarButtonsSection({
        editMode: this.state.editMode,
        updateCar: () => {
          updateCar();
        },
        deleteCar: () => {
          this.props.deleteCar(this.props.id);
        },
        cancelEdit: () => {
          this.setState({
            ...this.state,
            editMode: false,
          });
        },
        startCar: this.props.startCar,
        stopCar: this.props.stopCar,
        raceMode: this.props.raceMode,
      }).render(),
      new VirtualNode('div', 'car-container', [
        this.state.editMode ? input : new VirtualNode('span', 'car-name', [this.props.name]),
        this.state.editMode ? color : this.props.svg,
      ]),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Car;
