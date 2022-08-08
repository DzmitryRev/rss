import { CarType, EngineSettingsType } from './types';

class API {
  static host = 'http://localhost:3000/';

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

  static async createWinner(winner: { id: number; time: number; wins: number }) {
    return fetch(`${this.host}winners/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
  }

  static async removeCar(id: number) {
    return fetch(`${this.host}garage/${id}`, {
      method: 'DELETE',
    });
  }

  static async removeWinner(id: number) {
    return fetch(`${this.host}winners/${id}`, {
      method: 'DELETE',
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

  static async updateWinner(
    id: number,
    winner: {
      time: number;
      wins: number;
    },
  ) {
    return fetch(`${this.host}winners/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
  }

  static async startEngine(id: number) {
    return fetch(`${this.host}engine/?id=${id}&status=started`, {
      method: 'PATCH',
    });
  }

  static async driveMode(id: number) {
    return fetch(`${this.host}engine/?id=${id}&status=drive`, {
      method: 'PATCH',
    });
  }

  static async stopEngine(id: number): Promise<Response> {
    return fetch(`${this.host}engine/?id=${id}&status=stopped`, {
      method: 'PATCH',
    });
  }

  static async getWinners(): Promise<Response> {
    return fetch(`${this.host}winners/`, {
      method: 'GET',
    });
  }
}

export default API;
