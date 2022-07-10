// styles
import "./scss/index.scss";
// images
import "./assets/card-icon.svg";
import "./assets/iphone-12-test.png";
//
import { IStoreModel, StoreModel } from "./model/StoreModel";

const test = document.querySelector("#test");
const el = document.querySelector("#el");

test?.addEventListener("click", () => {
    el?.classList.toggle("open");
});

const model: IStoreModel = new StoreModel();

document.querySelector("#test2")?.addEventListener("click", () => {
    model.addToCard({
        id: 1,
        title: "apple",
        manufacturer: "aaaa",
        year: "aaa",
        color: "aaa",
        price: "aaa",
    });
    console.log(model);
});
