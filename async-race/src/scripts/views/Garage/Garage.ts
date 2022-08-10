/* eslint-disable class-methods-use-this */
import VirtualNode from '../../../core/virtual-node/VirtualNode';
import API from '../../API/Api';
import createSvg from '../../../core/createSVG/createSvg';
import createAnimation from '../../../core/createAnimation/CreateAnimation';

import Component from '../../../core/component/Component';
import Button from '../../components/Button/Button';
import Car from '../../components/Car/Car';

import { IGarageState } from './Garage.types';
import { CarType, EngineSettingsType } from '../../API/types';
import GarageButtonsSection from '../../components/GarageButtonsSection/GarageButtonsSection';
import setWinnerHOC from '../../../core/setWinner/setWinner';

class Garage extends Component {
  state: IGarageState;

  constructor() {
    super();
    this.state = {
      cars: [],
      raceMode: false,
      resetButtonDisable: true,
      currentPage: 1,
      totalCars: 1,
      setWinner: setWinnerHOC(),
    };
  }

  getCars(page: number): void {
    API.getCars(page)
      .then((res) => {
        this.setState({
          ...this.state,
          totalCars: +res.headers.get('X-Total-Count'),
        });
        return res.json();
      })
      .then((res: CarType[]) => {
        if (res) {
          const newCar = res.map((item) => {
            const svg = createSvg(item.color);
            const animation = createAnimation(svg);
            return {
              ...item,
              svg,
              animation,
              start: this.startEngine(item.id, animation),
              stop: this.stopEngine(item.id, animation),
            };
          });
          this.setState({
            ...this.state,
            cars: newCar,
            currentPage: page,
          });
        }
      });
  }

  startEngine(
    id: number,
    animation: [() => void, () => void, () => void, (time: number) => void],
  ): () => Promise<void> {
    return async () => {
      const req = await API.startEngine(id);
      const res: EngineSettingsType = await req.json();
      const [start, stop, moveToStart, setTime] = animation;
      setTime(res.distance / res.velocity);
      start();
      const time = performance.now();
      return API.driveMode(id).then((res3) => {
        if (!res3.ok) {
          stop();
        } else if (this.state.raceMode) {
          this.state.setWinner(id, performance.now() - time);
        }
      });
    };
  }

  stopEngine(
    id: number,
    animation: [() => void, () => void, () => void, (time: number) => void],
  ): () => Promise<void> {
    return async () => {
      await API.stopEngine(id);
      animation[2]();
    };
  }

  async startRace(): Promise<void> {
    this.setState({
      ...this.state,
      raceMode: true,
    });
    return Promise.all(this.state.cars.map((item) => item.start())).then(() => {
      this.setState({
        ...this.state,
        resetButtonDisable: false,
      });
    });
  }

  async resetRace(): Promise<void> {
    return Promise.all(this.state.cars.map((item) => item.stop())).then(() => {
      this.setState({
        ...this.state,
        raceMode: false,
        resetButtonDisable: true,
        setWinner: setWinnerHOC(),
      });
    });
  }

  updateCar(name: string, color: string, id: number): void {
    API.updateCar(id, { name, color }, () => {
      this.getCars(this.state.currentPage);
    });
  }

  deleteCar(id: number) {
    API.removeCar(id).then(() => {
      API.removeWinner(id).then(() => {
        this.getCars(this.state.currentPage);
      });
    });
  }

  onMount(): void {
    this.getCars(1);
  }

  render(): VirtualNode {
    const element = new VirtualNode('div', '', [
      new VirtualNode('div', '', [
        new GarageButtonsSection({
          raceMode: this.state.raceMode,
          startRace: this.startRace.bind(this),
          stopRace: this.resetRace.bind(this),
          resetButtonDisable: this.state.resetButtonDisable,
          getCars: () => {
            this.getCars(this.state.currentPage);
          },
        }).render(),
        new VirtualNode('div', '', [
          new VirtualNode('h3', '', [
            `GARAGE(${this.state.totalCars})`,
            `  page #${this.state.currentPage}`,
          ]),
        ]),
        ...this.state.cars.map((car) => new Car({
          name: car.name,
          color: car.color,
          id: car.id,
          svg: car.svg,
          raceMode: this.state.raceMode,
          deleteCar: (id: number) => {
            this.deleteCar(id);
          },
          updateCar: (name: string, color: string, id: number) => {
            this.updateCar(name, color, id);
          },
          startCar: car.start,
          stopCar: car.stop,
        }).render()),
        new VirtualNode('div', '', [
          new Button({
            title: 'prev page',
            color: 'green',
            size: 'small',
            disabled: this.state.currentPage === 1 || this.state.raceMode,
            event: () => {
              this.getCars(this.state.currentPage - 1);
            },
          }).render(),
          new Button({
            title: 'next page',
            color: 'green',
            size: 'small',
            disabled:
              this.state.currentPage === Math.ceil(this.state.totalCars / 7) || this.state.raceMode,
            event: () => {
              this.getCars(this.state.currentPage + 1);
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
