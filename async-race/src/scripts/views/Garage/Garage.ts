import Component from '../../../core/component/Component';
import VirtualNode from '../../../core/virtual-node/VirtualNode';
import API from '../../API/Api';
import { CarType } from '../../API/types';
import Button from '../../components/Button/Button';
import Car from '../../components/Car/Car';
import Form from '../../components/Form/Form';
import { IGarageState } from './Garage.types';

class Garage extends Component {
  state: IGarageState;

  constructor() {
    super();
    this.state = {
      cars: [],
      raceMode: false,
      page: 1,
      totalCarCount: 1,
    };
  }

  getCars(page: number) {
    API.getCars(page)
      .then((res) => {
        this.setState({
          ...this.state,
          totalCarCount: +res.headers.get('X-Total-Count'),
        });
        return res.json();
      })
      .then((res: CarType[]) => {
        if (res) {
          this.setState({
            ...this.state,
            cars: res,
            page,
          });
        }
      });
  }

  updateCar(name: string, color: string, id: number) {
    API.updateCar(id, { name, color }, () => {
      this.getCars(this.state.page);
    });
  }

  deleteCar(id: number) {
    API.removeCar(id).then(() => {
      API.removeWinner(id).then(() => {
        this.getCars(this.state.page);
      });
    });
  }

  onMount(): void {
    this.getCars(1);
  }

  render() {
    let winner: {
      id: number;
      time: number;
    } | null = null;
    const setWinner = (id: number, time: number) => {
      if (!winner) {
        winner = {
          id,
          time: +(time / 1000).toFixed(2),
        };
        API.getWinners()
          .then((res) => res.json())
          .then(
            (
              res: {
                id: number;
                time: number;
                wins: number;
              }[],
            ) => {
              const isWinner = res.filter(
                (item: { id: number; wins: number; time: number }) => item.id === winner.id,
              );
              if (isWinner.length) {
                API.updateWinner(winner.id, {
                  time: isWinner[0].time > winner.time ? isWinner[0].time : winner.time,
                  wins: isWinner[0].wins + 1,
                });
              } else {
                API.createWinner({
                  id: winner.id,
                  time: winner.time,
                  wins: 1,
                });
              }
            },
          );
      }
    };

    const startRace = () => {
      this.state.cars.forEach((car) => {
        API.stopEngine(car.id);
      });
      this.setState({
        ...this.state,
        raceMode: true,
      });
    };
    const stopRace = () => {
      if (winner) {
        Promise.all(this.state.cars.map((car) => API.stopEngine(car.id))).then(() => {
          this.setState({
            ...this.state,
            raceMode: false,
          });
        });
      }
    };

    const element = new VirtualNode('div', '', [
      new VirtualNode('div', '', [
        new Form({
          buttonTitle: 'create',
          disabled: this.state.raceMode,
          getCars: () => {
            this.getCars(this.state.page);
          },
        }).render(),
        new Button({
          title: 'race',
          color: 'blue',
          size: 'big',
          disabled: this.state.raceMode,
          event() {
            startRace();
          },
        }).render(),
        new Button({
          title: 'reset',
          color: 'blue',
          size: 'big',
          disabled: !this.state.raceMode,
          event() {
            stopRace();
          },
        }).render(),
        new VirtualNode('div', '', [
          new VirtualNode('h3', '', [
            `GARAGE(${this.state.totalCarCount})`,
            `  page #${this.state.page}`,
          ]),
        ]),
        ...this.state.cars.map((car) => new Car({
          name: car.name,
          color: car.color,
          id: car.id,
          getCars: () => {
            this.getCars(this.state.page);
          },
          deleteCar: (id: number) => {
            this.deleteCar(id);
          },
          updateCar: (name: string, color: string, id: number) => {
            this.updateCar(name, color, id);
          },
          setWinner: (id: number, time: number) => {
            setWinner(id, time);
          },
          raceMode: this.state.raceMode,
        }).render()),
        new VirtualNode('div', '', [
          new Button({
            title: 'prev page',
            color: 'green',
            size: 'small',
            disabled: this.state.page === 1 || this.state.raceMode,
            event: () => {
              this.getCars(this.state.page - 1);
            },
          }).render(),
          new Button({
            title: 'next page',
            color: 'green',
            size: 'small',
            disabled:
              this.state.page === Math.ceil(this.state.totalCarCount / 7) || this.state.raceMode,
            event: () => {
              this.getCars(this.state.page + 1);
            },
          }).render(),
        ]),
      ]),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Garage;
