import { CarType } from '../../API/types';

export interface IGarageState {
  cars: CarType[];
  raceMode: boolean;
  page: number;
  totalCarCount: number;
}
