import { IModel } from "../model/Model";
import { IView } from "../view/View";

export class Controller {
    model: IModel;
    view: IView;
    constructor(model: IModel, view: IView) {
        this.model = model;
        this.view = view;
        this.view.displayProducts(this.model.products);
    }
}
