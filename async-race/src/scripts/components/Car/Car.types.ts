export type CarPropsType = {
  name: string;
  color: string;
  id: number;
  getCars(): void;
  deleteCar(id: number): void;
  updateCar(name: string, color: string, id: number): void;
  setWinner: (id: number, time: number) => void;
  raceMode: boolean;
};
