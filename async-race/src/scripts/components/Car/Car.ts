/* eslint-disable class-methods-use-this */
import Component from '../../../core/component/Component';
import VirtualNode from '../../../core/virtual-node/VirtualNode';
import { CarPropsType } from './Car.types';
import './Car.css';
import CarController from '../CarController/CarContaroller';
import API from '../../API/Api';
import { EngineSettingsType } from '../../API/types';

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

  createAnimation(time: number, svg: SVGSVGElement): [() => void, () => void, () => void] {
    let animationId: number;
    let start: number | null = null;
    const svgCar = svg;
    const animation = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      svgCar.style.transform = `translateX(${Math.min(
        ((svgCar.parentElement.clientWidth - 200) / time) * progress,
        svgCar.parentElement.clientWidth - 200,
      )}px)`;
      if (progress < time) {
        animationId = requestAnimationFrame(animation);
      }
    };
    const run = () => {
      animationId = requestAnimationFrame(animation);
    };
    const stop = async () => {
      cancelAnimationFrame(animationId);
      start = null;
    };
    const moveCarToStart = () => {
      svgCar.style.transform = 'translateX(0)';
    };
    return [run, stop, moveCarToStart];
  }

  render() {
    const input = this.createInput(this.props.name, 'text', 'text-input small-text-input');
    const color = this.createInput(
      this.props.color,
      'color',
      'color-input small small-color-input',
    );
    const svg = this.createSvg(this.props.color);

    let animation: (() => void)[];
    const run = () => {
      API.startEngine(this.props.id)
        .then((res) => res.json())
        .then((res: EngineSettingsType) => {
          animation = this.createAnimation(res.distance / res.velocity, svg);
          animation[0]();
          const time = performance.now();
          API.driveMode(this.props.id).then((driveModeRes) => {
            if (!driveModeRes.ok) {
              console.log('Engine broke');
              animation[1]();
            } else if (this.props.raceMode) {
              this.props.setWinner(this.props.id, performance.now() - time);
            }
          });
        });
    };

    const stop = (cb: () => void) => {
      API.stopEngine(this.props.id)
        .then((res) => res)
        .then(() => {
          animation[1]();
          animation[2]();
          cb();
        });
    };

    if (this.props.raceMode) {
      run();
    }

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
      new CarController({
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
        runCar: () => {
          run();
        },
        stopCar: (cb: () => void) => {
          stop(() => {
            cb();
          });
        },
        raceMode: this.props.raceMode,
      }).render(),
      new VirtualNode('div', 'car-container', [
        this.state.editMode ? input : new VirtualNode('span', 'car-name', [this.props.name]),
        this.state.editMode ? color : svg,
      ]),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Car;
