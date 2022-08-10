export type GarageButtonsSectionProps = {
  raceMode: boolean;
  resetButtonDisable: boolean;
  startRace(): Promise<void>;
  stopRace(): Promise<void[]>;
  getCars(): void;
};
