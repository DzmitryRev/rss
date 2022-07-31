/* eslint-disable no-unused-vars */
// export function createCar(car: { name: string; color: string }) {
//   fetch('http://localhost:3000/garage', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(car),
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res);
//     });
// }

// export function deleteCar(id: number) {}

type CarType = {
  name: string;
  color: string;
  id: number;
};
type EngineSettingsType = {
  velocity: number;
  distance: number;
};

class API {
  host: string;

  constructor() {
    this.host = 'http://localhost:3000/';
  }

  async getCars(callback: (cars: CarType[]) => void) {
    await fetch(`${this.host}garage`)
      .then((res) => res.json())
      .then((res: CarType[]) => {
        callback(res);
      })
      .catch(() => {
        throw new Error();
      });
  }

  async getCar(id: number, callback: (car: CarType) => void) {
    await fetch(`${this.host}garage/${id}`)
      .then((res) => res.json())
      .then((res: CarType) => {
        callback(res);
      })
      .catch(() => {
        throw new Error();
      });
  }

  async createCar(car: Omit<CarType, 'id'>, callback: () => void) {
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

  async removeCar(id: number, callback: () => void) {
    await fetch(`${this.host}garage/${id}`, {
      method: 'DELETE',
    })
      .then(() => callback())
      .catch(() => {
        throw new Error();
      });
  }

  async updateCar(id: number, car: Omit<CarType, 'id'>, callback: () => void) {
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

  async startEngine(id: number, callback: (engineSettings: EngineSettingsType) => void) {
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
