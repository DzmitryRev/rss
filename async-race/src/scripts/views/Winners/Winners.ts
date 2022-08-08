import Component from '../../../core/component/Component';
import createSvg from '../../../core/createSVG/createSvg';
import VirtualNode from '../../../core/virtual-node/VirtualNode';
import API from '../../API/Api';
import { CarType } from '../../API/types';

interface IWinnersState {
  winners: {
    id: number;
    time: number;
    wins: number;
  }[];
  cars: CarType[];
}

type WinnersPropsType = { bindGarageToWinners: (cb: () => void) => void };

class Winners extends Component<WinnersPropsType> {
  state: IWinnersState;

  constructor(props: WinnersPropsType) {
    super(props);
    this.state = {
      winners: [],
      cars: [],
    };
  }

  getWinners() {
    API.getWinners()
      .then((res) => res.json())
      .then((res) => {
        API.getCars()
          .then((carsRes) => carsRes.json())
          .then((carsRes: CarType) => {
            this.setState({
              ...this.state,
              winners: res,
              cars: carsRes,
            });
          });
      });
  }

  findCar(id: number) {
    const result = this.state.cars.find((item) => item.id === id);
    if (!result) return null;
    return result;
  }

  render() {
    console.log('aaa');
    this.props.bindGarageToWinners(this.getWinners.bind(this));
    const element = new VirtualNode('div', '', [
      new VirtualNode('h3', '', ['WINNERS']),
      new VirtualNode('table', 'table', [
        new VirtualNode('tr', '', [
          new VirtualNode('td', '', ['id']),
          new VirtualNode('td', '', ['color']),
          new VirtualNode('td', '', ['name']),
          new VirtualNode('td', '', ['wins']),
          new VirtualNode('td', '', ['time'], {
            type: 'click',
            callback: () => {
              this.setState({
                ...this.state,
                sort: 'ASC',
              });
            },
          }),
        ]),
        ...this.state.winners.map(
          (item) => new VirtualNode('tr', '', [
            new VirtualNode('td', '', [`${item.id}`]),
            new VirtualNode('td', '', [
              this.findCar(item.id) ? createSvg(this.findCar(item.id).color) : '',
            ]),
            new VirtualNode('td', '', [
              `${this.findCar(item.id) ? this.findCar(item.id).name : ''}`,
            ]),
            new VirtualNode('td', '', [`${item.wins}`]),
            new VirtualNode('td', '', [`${item.time}`]),
          ]),
        ),
      ]),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Winners;
