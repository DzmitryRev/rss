import API from '../API/Api';

class GarageModel {
  page: number;

  getCars(callback: () => void) {
    API.getCars(callback);
  }
}

export default GarageModel;
