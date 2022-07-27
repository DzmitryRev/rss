// styles
import "./scss/index.scss";
// images
import "./assets/card-icon.svg";
import "./assets/product-1.jpg";
//
import { Model } from "./script/model/Model";
import { Controller, IController } from "./script/controller/Controller";
import { View } from "./script/view/View";
import { products } from "./data/products";
// import noUiSlider, { Formatter, target } from "../node_modules/nouislider/dist/nouislider";

// import

// const range = <HTMLInputElement>document.querySelector("#range");

// let a: string = multirange();
// document.addEventListener("DOMContentLoaded", () => {

// });
// const formatForSlider: Formatter = {
//     from: function (formattedValue) {
//         return Number(formattedValue);
//     },
//     to: function (numericValue) {
//         return Math.round(numericValue);
//     },
// };
// // Range
// const slider = <target>document.getElementById("slider");
// const btn = <HTMLButtonElement>document.getElementById("test");
// const a = noUiSlider.create(slider, {
//     start: [20, 80],
//     connect: true,
//     // snap: true,
//     format: formatForSlider,
//     range: {
//         min: 0,
//         max: 200,
//     },
// });

// const inputs = <HTMLInputElement[]>[
//     document.querySelector(".skip-value-lower"),
//     document.querySelector(".skip-value-upper"),
// ];
// a.on("update", function (values, handle) {
//     inputs[handle].value = <string>values[handle];
// });

// inputs.forEach(function (input, handle) {
//     input.addEventListener("change", function () {
//         a.setHandle(handle, this.value);
//     });
//     input.addEventListener("keydown", function (e) {
//         const values = a.get();
//         const value = Number(values[handle]);
//         const steps = a.steps();
//         const step = steps[handle];
//         let position;
//         switch (e.which) {
//             case 13:
//                 a.setHandle(handle, this.value);
//                 break;
//             case 38:
//                 position = step[1];
//                 if (position === false) {
//                     position = 1;
//                 }
//                 if (position !== null) {
//                     a.setHandle(handle, value - Number(position));
//                 }
//                 break;
//             case 40:
//                 position = step[0];
//                 if (position === false) {
//                     position = 1;
//                 }
//                 if (position !== null) {
//                     a.setHandle(handle, value - Number(position));
//                 }
//                 break;
//         }
//     });
// });

// btn.addEventListener("click", () => {
//     // a.destroy(); // delete range
//     // a.reset(); // reset to default
//     // console.log(a.get()); // get values [string, string]
//     // a.set([0, 100]);
// });

const root = document.querySelector("#root");
if (!root) throw new Error("Can't find #root element");
const app: IController = new Controller(new Model(products), new View(<HTMLElement>root));
app.start();

// TODO:
// 1. Add reset filters -- finish
// 1.1 IMAGES
// 2. Add search -- finish
// 3. Add range filters
// 4. Add close btn for sidebar ???
// 5. Convert Template to class and insert them into View -- finish
// ??????
// 6. Add modal, Add card
