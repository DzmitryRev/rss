// export function getCars() {
//   fetch('http://localhost:3000/garage', {
//     method: 'GET',
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res);
//     });
// }

export function getCar(id: number) {
  fetch(`http://localhost:3000/garage/${id}`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
}
export function createCar(car: { name: string; color: string }) {
  fetch('http://localhost:3000/garage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
}

// export function deleteCar(id: number) {}
