// styles
import "./scss/index.scss";
// images
import "./assets/card-icon.svg";
//
import { Model } from "./script/model/Model";
import { Controller, IController } from "./script/controller/Controller";
import { View } from "./script/view/View";

const test = document.querySelector("#test");
const el = document.querySelector("#el");

test?.addEventListener("click", () => {
    el?.classList.toggle("open");
});

const app: IController = new Controller(new Model(), new View());
app.start();
