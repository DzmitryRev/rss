import { CarType } from '../../API/types';

type Car = CarType & {
  svg: SVGSVGElement;
  animation: [() => void, () => void, () => void, (time: number) => void];
  start: () => Promise<void>;
  stop: () => Promise<void>;
};

export interface IGarageState {
  cars: Car[];
  raceMode: boolean;
  resetButtonDisable: boolean;
  currentPage: number;
  totalCars: number;
  setWinner(id: number, time: number): void;
}
