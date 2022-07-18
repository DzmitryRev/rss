// styles
import "./scss/index.scss";
// images
import "./assets/card-icon.svg";
import "./assets/product-1.jpg";
//
import { Model } from "./script/Model";
import { Controller, IController } from "./script/Controller";
import { View } from "./script/View";
import { products } from "./data/products";
import noUiSlider, { target } from "../node_modules/nouislider/dist/nouislider";

// import

// const range = <HTMLInputElement>document.querySelector("#range");

// let a: string = multirange();
// document.addEventListener("DOMContentLoaded", () => {

// });

const slider = <target>document.getElementById("slider");
const btn = <HTMLButtonElement>document.getElementById("test");
const a = noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
        min: 0,
        max: 100,
    },
});

btn.addEventListener("click", () => {
    // a.destroy(); // delete range
    // a.reset(); // reset to default
    // console.log(a.get()); // get values [string, string]
    // a.set([0, 100]);
});

const app: IController = new Controller(new Model(products), new View());
app.start();

// TODO:
// 1. Add reset filters -- finish
// 1.1 IMAGES
// 2. Add search -- finish
// 3. Add range filters
// 4. Add close btn for sidebar
// 5. Convert Template to class and insert them into View
// ??????
// 6. Add modal, Add card
