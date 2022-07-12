import { ProductType } from "../../data/products";
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
        this.view.removeFromCardEvent((id: string) => {
            this.hanlerRemoveFromCard(id);
        });
        // init card local storage
        this.model.refreshCard();
        // init render
        this.view.render(this.model.products, this.model.card);
    }
    hanlerAddToCard(id: string) {
        this.model.addToCard(id, (products: ProductType[], card: ProductType[]) => {
            this.view.render(products, card);
        });
    }
    hanlerRemoveFromCard(id: string) {
        this.model.removeFromCard(id, (products: ProductType[], card: ProductType[]) => {
            this.view.render(products, card);
        });
    }
}
