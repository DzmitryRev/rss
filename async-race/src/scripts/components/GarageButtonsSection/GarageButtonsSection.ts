/* eslint-disable class-methods-use-this */
import Component from '../../../core/component/Component';
import VirtualNode from '../../../core/virtual-node/VirtualNode';
import Button from '../Button/Button';
import Form from '../Form/Form';
import { GarageButtonsSectionProps } from './GarageButtonsSection.types';

class GarageButtonsSection extends Component<GarageButtonsSectionProps> {
  render(): VirtualNode {
    const element = new VirtualNode('div', '', [
      new Form({
        buttonTitle: 'create',
        disabled: this.props.raceMode,
        getCars: () => {
          this.props.getCars();
        },
      }).render(),
      new Button({
        title: 'race',
        color: 'blue',
        size: 'big',
        disabled: this.props.raceMode,
        event: () => {
          this.props.startRace();
        },
      }).render(),
      new Button({
        title: 'reset',
        color: 'blue',
        size: 'big',
        disabled: this.props.resetButtonDisable,
        event: () => {
          this.props.stopRace();
        },
      }).render(),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default GarageButtonsSection;
