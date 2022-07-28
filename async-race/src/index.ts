import { createCar, getCar, getCars } from "./scripts/API/Api";

getCars();
getCar(1);
createCar({
  name: "Tesla Model X",
  color: "#fff",
});

getCars();
