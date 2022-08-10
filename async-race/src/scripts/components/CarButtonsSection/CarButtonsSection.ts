/* eslint-disable class-methods-use-this */
import Component from '../../../core/component/Component';
import VirtualNode from '../../../core/virtual-node/VirtualNode';
import Button from '../Button/Button';
import { CarControllerPropsType, ICarState } from './CarButtonsSection.types';

class CarButtonsSection extends Component<CarControllerPropsType> {
  state: ICarState;

  constructor(props: CarControllerPropsType) {
    super(props);
    this.state = {
      driveMode: false,
      buttonStopRace: true,
    };
  }

  render(): VirtualNode {
    const element = new VirtualNode('div', '', [
      new Button({
        title: this.props.editMode ? 'save' : 'edit',
        color: 'green',
        size: 'small',
        disabled: this.state.driveMode || this.props.raceMode,
        event: () => {
          this.props.updateCar();
        },
      }).render(),
      this.props.editMode
        ? new Button({
          title: 'cancel',
          color: 'blue',
          size: 'small',
          event: () => {
            this.props.cancelEdit();
          },
        }).render()
        : '',
      new Button({
        title: 'delete',
        color: 'red',
        size: 'small',
        disabled: this.state.driveMode || this.props.raceMode,
        event: () => {
          this.props.deleteCar();
        },
      }).render(),
      new Button({
        title: 'D',
        color: 'blue',
        size: 'small',
        disabled: this.props.editMode || this.state.driveMode || this.props.raceMode,
        event: () => {
          if (this.props.editMode) return;
          this.setState({
            ...this.state,
            driveMode: true,
          });
          this.props.startCar().then(() => {
            this.setState({
              ...this.state,
              buttonStopRace: false,
            });
          });
        },
      }).render(),
      new Button({
        title: 'P',
        color: 'green',
        size: 'small',
        disabled: this.props.editMode || this.state.buttonStopRace || this.props.raceMode,
        event: () => {
          this.props.stopCar().then(() => {
            this.setState({
              ...this.state,
              driveMode: false,
              buttonStopRace: true,
            });
          });
        },
      }).render(),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default CarButtonsSection;
