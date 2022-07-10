import { IModel } from "../model/Model";
import { IView } from "../view/View";

export class Controller {
    model: IModel;
    view: IView;
    constructor(model: IModel, view: IView) {
        this.model = model;
        this.view = view;
        this.view.addToCardEvent((id: string) => {
            this.hanlerAddToCard(id);
        });
        this.view.render(this.model.products);
    }
    hanlerAddToCard(id: string) {
        this.model.addToCard(id, () => {
            console.log(" ")
        });
    }
}
