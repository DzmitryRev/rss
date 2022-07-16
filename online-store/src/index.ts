// styles
import "./scss/index.scss";
// images
import "./assets/card-icon.svg";
//
import { Model } from "./script/model/Model";
import { Controller, IController } from "./script/controller/Controller";
import { View } from "./script/view/View";
import { products } from "./data/products";

const app: IController = new Controller(new Model(products), new View());
app.start();

// TODO:
// 1. Add reset filters
// 1.1 IMAGES
// 2. Add search
// 3. Add range filters
// 4. Add close btn for sidebar
// 5. Convert Template to class and insert them into View
// ??????
// 6. Add modal, Add card
