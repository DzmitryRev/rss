import API from './scripts/API/Api';
import { CarType } from './scripts/API/types';
import GarageModel from './scripts/models/GarageModel';

const a = new GarageModel();

a.getCars((cars: CarType[]) => {
  console.log(cars);
});

a.page = 2;
console.log(a.page);
a.getCars((cars: CarType[]) => {
  console.log(cars);
});
