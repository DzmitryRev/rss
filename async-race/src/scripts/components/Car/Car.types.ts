export type CarPropsType = {
  name: string;
  color: string;
  id: number;
  svg: SVGSVGElement;
  raceMode: boolean;
  deleteCar(id: number): void;
  updateCar(name: string, color: string, id: number): void;
  startCar(): Promise<void>;
  stopCar(): Promise<void>;
};

export interface ICarState {
  editMode: boolean;
}
