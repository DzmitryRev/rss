import { IModel } from "../model/Model";
import { IView } from "../view/View";

export interface IController {
    model: IModel;
    view: IView;
    start(): void;
    render(): void;
    handleAddToCard(id: string): void;
    handleRemoveFromCard(id: string): void;
}

export class Controller implements IController {
    model: IModel;
    view: IView;
    constructor(model: IModel, view: IView) {
        this.model = model;
        this.view = view;
    }
    start() {
        // set up events
        this.view.addToCardEvent((id: string) => {
            this.handleAddToCard(id);
        });
        this.view.removeFromCardEvent((id: string) => {
            this.handleRemoveFromCard(id);
        });
        this.view.filterEvent((filter: string, value: string) => {
            this.handleChangeFilter(filter, value);
        });

        //
        this.render();
    }

    // render all

    render() {
        this._getProducts();
        this._getCard();
    }

    // card handlers

    handleAddToCard(id: string) {
        this.model.addToCard(id, () => {
            this._getCard();
        });
    }
    handleRemoveFromCard(id: string) {
        this.model.removeFromCard(id, () => {
            this._getCard();
        });
    }
    handleChangeFilter(field: string, value: string) {
        this.model.changeFilter(field, value, () => {
            this._getProducts();
        });
    }
    // handleRemoveFilter(value: string) {
    //     this.model.removeFilter("color", value, () => {
    //         this._getProducts();
    //     });
    // }
    _getCard() {
        this.model.getCard((products, currentCard) => {
            this.view.renderCard(currentCard);
            this.model.getProducts((products) => {
                this.view.renderProductFooter(products, currentCard);
            });
            this.view.settingsBlock.render(products);
        });
    }
    _getProducts() {
        this.model.getProducts((products, currentCard) => {
            this.view.productsBlock.render(products);
            this.view.renderProductFooter(products, currentCard);
        });
    }
}
