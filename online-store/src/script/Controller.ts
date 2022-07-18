import { IModel } from "./Model";
import { IView } from "./View";

export interface IController {
    model: IModel;
    view: IView;
    // run app
    start(): void;
    //
    render(): void;
    // handlers
    handleAddToCard(id: string): void;
    handleRemoveFromCard(id: string): void;
    handleChangeFilter(field: string, value: string): void;
    // connectors
    _getProducts(): void;
    _getCard(): void;
    _getFilters(): void;
}

export class Controller implements IController {
    model: IModel;
    view: IView;
    constructor(model: IModel, view: IView) {
        this.model = model;
        this.view = view;
    }
    start() {
        this.view.addToCardEvent((id: string) => {
            this.handleAddToCard(id);
        });
        this.view.removeFromCardEvent((id: string) => {
            this.handleRemoveFromCard(id);
        });
        this.view.filterEvent((filter: string, value: string) => {
            this.handleChangeFilter(filter, value);
        });
        this.view.resetFilterEvent(() => {
            this.handleResetFilter();
        });
        this.view.searchEvent((value) => {
            console.log(value);
            this.handleSearch(value);
        });
        this.render();
    }
    // Render all
    render() {
        this._getProducts();
        this._getFilters();
        this._getCard();
    }
    // Card handlers
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
    // Filters handlers
    handleChangeFilter(field: string, value: string) {
        this.model.changeFilter(field, value, () => {
            this._getProducts();
            this._getFilters();
        });
    }
    handleResetFilter() {
        this.model.resetFilters(() => {
            this._getProducts();
            this._getFilters();
        });
    }
    // Search handlers
    handleSearch(value: string) {
        this.model.inputSearch(value, () => {
            this._getProducts();
        });
    }
    // Connectors
    _getCard() {
        this.model.getCard((products, currentCard) => {
            this.view.renderCard(currentCard);
            this.model.getProducts((products) => {
                this.view.renderProductButton(products, currentCard);
            });
        });
    }
    _getProducts() {
        this.model.getProducts((products, currentCard) => {
            this.view.renderProducts(products);
            this.view.renderProductButton(products, currentCard);
        });
    }
    _getFilters() {
        this.model.getFilters((products, filters) => {
            this.view.renderSettings(products, filters);
        });
    }
}
