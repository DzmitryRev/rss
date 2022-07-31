// styles
import "./scss/index.scss";
// images
import "./assets/card-icon.svg";
//
import { Model } from "./script/model/Model";
import { Controller } from "./script/controller/Controller";
import { View } from "./script/view/View";
import { products } from "./data/products";

const app: Controller = new Controller(new Model(products), new View());
app.start();
