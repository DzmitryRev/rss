/* eslint-disable class-methods-use-this */
import Component from '../../../core/component/Component';
import VirtualNode from '../../../core/virtual-node/VirtualNode';
import API from '../../API/Api';
import Button from '../Button/Button';
import { CarPropsType } from './Car.types';
import './Car.css';

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

  deleteCar(): void {
    API.removeCar(this.props.id, () => {
      this.props.getCars();
    });
  }

  createSvg(color: string): SVGSVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const useit = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useit.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './assets/car.svg#svg2');
    svg.style.fill = color;
    svg.insertAdjacentElement('beforeend', useit);
    svg.style.height = '60px';
    svg.style.width = '60px';
    return svg;
  }

  render() {
    const input = this.createInput(this.props.name, 'text', 'text-input small-text-input');
    const color = this.createInput(this.props.color, 'color', 'color-input small small-color-input');

    const element = new VirtualNode('div', 'car', [
      new Button({
        title: this.state.editMode ? 'save' : 'edit',
        color: 'green',
        size: 'small',
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
      new Button({
        title: 'delete',
        color: 'red',
        size: 'small',
        event: () => {
          this.deleteCar();
        },
      }).render(),
      this.state.editMode ? input : new VirtualNode('span', 'car-name', [this.props.name]),
      this.state.editMode ? color : this.createSvg(this.props.color),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Car;
