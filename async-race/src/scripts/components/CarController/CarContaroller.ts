/* eslint-disable class-methods-use-this */
import Component from '../../../core/component/Component';
import VirtualNode from '../../../core/virtual-node/VirtualNode';
import Button from '../Button/Button';

type CarControllerPropsType = {
  editMode: boolean;
  updateCar(): void;
  deleteCar(): void;
  cancelEdit(): void;
  runCar(): void;
  stopCar(): void;
};

class CarController extends Component<CarControllerPropsType> {
  state: {
    driveMode: boolean
  };

  constructor(props: CarControllerPropsType) {
    super(props);
    this.state = {
      driveMode: false,
    };
  }

  render() {
    const element = new VirtualNode('div', '', [
      new Button({
        title: this.props.editMode ? 'save' : 'edit',
        color: 'green',
        size: 'small',
        // disabled: this.state.raceMode || this.state.engineOnMode,
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
        // disabled: this.state.raceMode || this.state.engineOnMode,
        event: () => {
          this.props.deleteCar();
        },
      }).render(),
      new Button({
        title: 'D',
        color: 'blue',
        size: 'small',
        disabled: this.state.driveMode,
        event: () => {
          if (this.props.editMode) return;
          this.setState({
            ...this.state,
            driveMode: true,
          });
          this.props.runCar();
        },
      }).render(),
      new Button({
        title: 'P',
        color: 'green',
        size: 'small',
        disabled: !this.state.driveMode,
        event: () => {
          //   this.props.stopEngine(() => {
          //     this.setState({
          //       ...this.state,
          //       engineOnMode: true,
          //     });
          //   });
          this.setState({
            ...this.state,
            driveMode: false,
          });
          this.props.stopCar();
        },
      }).render(),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default CarController;
