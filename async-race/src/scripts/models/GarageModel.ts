import API from '../API/Api';
import { CarType } from '../API/types';

class GarageModel {
  page: number;

  createCarForm: {
    name: string;
    color: string;
  };

  constructor() {
    this.page = 1;
  }

  getCars(callback: (cars: CarType[]) => void) {
    API.getCars(this.page, callback);
  }

  submitCreateCar(callback: () => void) {
    if (this.createCarForm.color.trim() === '' || this.createCarForm.name.trim() === '') return;
    API.createCar(this.createCarForm, callback);
  }
}

export default GarageModel;
