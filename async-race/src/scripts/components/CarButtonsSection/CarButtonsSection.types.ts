export type CarControllerPropsType = {
  editMode: boolean;
  raceMode: boolean;
  updateCar(): void;
  deleteCar(): void;
  cancelEdit(): void;
  startCar(): Promise<void>;
  stopCar(): Promise<void>;
};

export interface ICarState {
  driveMode: boolean;
  buttonStopRace: boolean;
}
