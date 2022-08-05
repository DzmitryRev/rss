import { CarType, EngineSettingsType } from './types';

class API {
  static host = 'http://localhost:3000/';

  static async getCarsCount(callback: (carsLength: number) => void) {
    await fetch(`${this.host}garage/`)
      .then((res) => res.json())
      .then((res: CarType[]) => {
        console.log(res);
        callback(res.length);
      })
      .catch(() => {
        throw new Error();
      });
  }

  static async getCars(page: number, callback: (cars: CarType[]) => void) {
    await fetch(`${this.host}garage/?_limit=7&_page=${page}`)
      .then((res) => res.json())
      .then((res: CarType[]) => {
        callback(res);
      })
      .catch(() => {
        throw new Error();
      });
  }

  static async getCar(id: number, callback: (car: CarType) => void) {
    await fetch(`${this.host}garage/${id}`)
      .then((res) => res.json())
      .then((res: CarType) => {
        callback(res);
      })
      .catch(() => {
        throw new Error();
      });
  }

  static async createCar(car: Omit<CarType, 'id'>, callback: () => void) {
    await fetch(`${this.host}garage/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    })
      .then(() => callback())
      .catch(() => {
        throw new Error();
      });
  }

  static async removeCar(id: number, callback: () => void) {
    await fetch(`${this.host}garage/${id}`, {
      method: 'DELETE',
    })
      .then(() => callback())
      .catch(() => {
        throw new Error();
      });
  }

  static async updateCar(id: number, car: Omit<CarType, 'id'>, callback: () => void) {
    await fetch(`${this.host}garage/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    })
      .then(() => callback())
      .catch(() => {
        throw new Error();
      });
  }

  static async startEngine(id: number, callback: (engineSettings: EngineSettingsType) => void) {
    await fetch(`${this.host}engine/${id}/?status='started'`, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((res: EngineSettingsType) => {
        callback(res);
      })
      .catch(() => {
        throw new Error();
      });
  }
}

export default API;
