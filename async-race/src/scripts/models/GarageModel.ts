import API from '../API/Api';
import { CarType } from '../API/types';

type CarFormType = {
  name: string;
  color: string;
};

class GarageModel {
  page: number;

  createCarForm: CarFormType;

  updateCarForm: CarFormType;

  constructor() {
    this.page = 1;
  }

  inputCreateCarForm(name: string, color: string): void {
    const newValue = { name, color };
    this.createCarForm = newValue;
  }

  inputUpdateCarForm(name: string, color: string): void {
    const newValue = { name, color };
    this.updateCarForm = newValue;
  }

  // API
  // FINISH
  getCars(callback: (cars: CarType[]) => void): void {
    API.getCars(this.page, callback);
  }

  // FINISH
  submitCreateCar(callback: (cars: CarType[]) => void): void {
    if (this.createCarForm.color.trim() === '' || this.createCarForm.name.trim() === '') return;
    API.createCar(this.createCarForm, () => {
      this.getCars(callback);
    });
  }

  // FINISH
  editCar(id: number, callback: (updateCarForm: CarFormType) => void) {
    API.getCar(id, ({ name, color }) => {
      const newValue = { name, color };
      this.updateCarForm = newValue;
      callback(this.updateCarForm);
    });
  }

  // FINISH
  submitEditCar(id: number, callback: (cars: CarType[]) => void) {
    API.updateCar(id, this.updateCarForm, () => {
      this.getCars(callback);
    });
  }
}

export default GarageModel;
