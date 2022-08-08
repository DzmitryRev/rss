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
    input.element.required = true;
    input.element.minLength = 2;
    input.element.maxLength = 20;
    return input;
  }

  createSvg(color: string): SVGSVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const useit = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useit.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './assets/car.svg#svg2');
    svg.style.fill = color;
    svg.insertAdjacentElement('beforeend', useit);
    svg.style.height = '40px';
    svg.style.width = '60px';
    return svg;
  }

  render() {
    const input = this.createInput(this.props.name, 'text', 'text-input small-text-input');
    const color = this.createInput(
      this.props.color,
      'color',
      'color-input small small-color-input',
    );

    const element = new VirtualNode('div', 'car', [
      new VirtualNode('div', '', [
        new Button({
          title: this.state.editMode ? 'save' : 'edit',
          color: 'green',
          size: 'small',
          event: () => {
            if (this.state.editMode) {
              if (input.element.validity.valid && color.element.validity.valid) {
                if (
                  input.element.value === this.props.name
                  && color.element.value === this.props.color
                ) {
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
          },
        }).render(),
        this.state.editMode
          ? new Button({
            title: 'cancel',
            color: 'blue',
            size: 'small',
            event: () => {
              this.setState({
                ...this.state,
                editMode: false,
              });
            },
          }).render()
          : '',
        new Button({
          title: 'delete',
          color: 'red',
          size: 'small',
          event: () => {
            this.props.deleteCar(this.props.id);
          },
        }).render(),
      ]),
      new VirtualNode('div', 'car-container', [
        this.state.editMode ? input : new VirtualNode('span', 'car-name', [this.props.name]),
        this.state.editMode ? color : this.createSvg(this.props.color),
      ]),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Car;
