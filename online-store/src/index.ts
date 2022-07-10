// styles
import "./scss/index.scss";
// images
import "./assets/card-icon.svg";
import "./assets/iphone-12-test.png";
//
import { IModel, Model } from "./model/Model";

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
//         },
//         () => {
//             console.log("aaa");
//         }
//     );
//     console.log(model);
// });
