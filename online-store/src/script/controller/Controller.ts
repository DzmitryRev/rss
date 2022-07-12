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
        // init card local storage
        this.model.refreshCard();
        // init render
        this.view.render(this.model.products);
    }
    hanlerAddToCard(id: string) {
        this.model.addToCard(id, () => {
            console.log(" ");
        });
    }
}
