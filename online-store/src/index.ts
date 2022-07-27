// styles
import "./scss/index.scss";
// images
import "./assets/card-icon.svg";
//
import { Model } from "./script/model/Model";
import { Controller } from "./script/controller/Controller";
import { View } from "./script/view/View";
import { products } from "./data/products";

const root = document.querySelector("#root");
if (!root) throw new Error("Can't find #root element");
const app: Controller = new Controller(new Model(products), new View(<HTMLElement>root));
app.start();
