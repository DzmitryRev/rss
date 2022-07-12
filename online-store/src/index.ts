// styles
import "./scss/index.scss";
// images
import "./assets/card-icon.svg";
//
import { Model } from "./script/model/Model";
import { Controller } from "./script/controller/Controller";
import { View } from "./script/view/View";

const test = document.querySelector("#test");
const el = document.querySelector("#el");

test?.addEventListener("click", () => {
    el?.classList.toggle("open");
});

// const model: IModel = new Model();

// document.querySelector("#test2")?.addEventListener("click", () => {
//     model.addToCard(
//         {
//             id: 1,
//             title: "apple",
//             manufacturer: "aaaa",
//             year: "aaa",
//             color: "aaa",
//             price: "aaa",
//             image: "sss"
//         },
//         () => {
//             console.log("aaa");
//         }
//     );
//     console.log(model);
// });

const app = new Controller(new Model(), new View());
