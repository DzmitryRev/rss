import { ProductType } from "../../data/products";
import { IModel } from "../model/Model";
import { IView } from "../view/View";

// interface IController {
//     model: IModel
//     view: IView
// }

export class Controller {
    model: IModel;
    view: IView;
    constructor(model: IModel, view: IView) {
        this.model = model;
        this.view = view;
    }
    start() {
        // set up events
        this.view.addToCardEvent((id: string) => {
            this.hanlerAddToCard(id);
        });
        this.view.removeFromCardEvent((id: string) => {
            this.hanlerRemoveFromCard(id);
        });
        // init card local storage
        this.model.refreshCard();
        // init render
        this.render();
    }
    // render All
    render() {
        this.view.renderProducts(this.model.products, this.model.card);
        this.view.renderCard(this.model.card);
    }
    //
    hanlerAddToCard(id: string) {
        console.log("add to card");
        this.model.addToCard(
            id,
            (products: ProductType[], card: ProductType[], productId: string) => {
                this.view.renderCard(card);
                this.view.renderProductFooter(productId);
            }
        );
    }
    hanlerRemoveFromCard(id: string) {
        console.log("remove from card");
        this.model.removeFromCard(
            id,
            (products: ProductType[], card: ProductType[], productId: string) => {
                this.view.renderCard(card);
                this.view.renderProductFooter(productId);
            }
        );
    }
}
