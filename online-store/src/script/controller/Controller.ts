import { Model } from "../model/Model";
import { SortValueType } from "../model/types";
import { View } from "../view/View";

export class Controller {
    model: Model;
    view: View;
    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
    }
    start(): void {
        this.view.addToCardEvent((id: string): void => {
            this.handleAddToCard(id);
        });
        this.view.removeFromCardEvent((id: string): void => {
            this.handleRemoveFromCard(id);
        });
        this.view.filterEvent((filter: string, value: string): void => {
            this.handleChangeFilter(filter, value);
        });
        this.view.resetFilterEvent((): void => {
            this.handleResetFilter();
        });
        this.view.searchEvent((value): void => {
            this.handleSearch(value);
        });
        this.view.sortEvent((value): void => {
            this.handleSort(value);
        });
        this.render();
    }
    // Render all
    render(): void {
        this._getProducts();
        this._getFilters();
        this._getCard();
        this._getSort();
        this.view.renderSearch();
    }
    // Card handlers
    handleAddToCard(id: string): void {
        this.model.addToCard(id, () => {
            this._getCard();
        });
    }
    handleRemoveFromCard(id: string): void {
        this.model.removeFromCard(id, () => {
            this._getCard();
        });
    }
    // Filters handlers
    handleChangeFilter(field: string, value: string): void {
        this.model.changeCheckboxFilter(field, value, () => {
            this._getProducts();
            this._getFilters();
        });
    }
    handleResetFilter(): void {
        this.model.resetFilters(() => {
            this._getProducts();
            this._getFilters();
        });
    }
    // Sort handlers
    handleSort(value: SortValueType): void {
        this.model.changeSort(value, () => {
            this._getSort();
            this._getProducts();
        });
    }
    // Search handlers
    handleSearch(value: string): void {
        this.model.inputSearch(value, () => {
            this._getProducts();
        });
    }
    // Connect View with Model
    _getCard(): void {
        this.model.getCard((products, currentCard) => {
            this.view.renderCard(currentCard);
            this.model.getProducts((products) => {
                this.view.renderProductButton(products, currentCard);
            });
        });
    }
    _getSort(): void {
        this.model.getSort((currentSort) => {
            this.view.renderSort(currentSort);
        });
    }
    _getProducts(): void {
        this.model.getProducts((products, currentCard) => {
            this.view.renderProducts(products);
            this.view.renderProductButton(products, currentCard);
        });
    }
    _getFilters(): void {
        this.model.getFilters((products, filters) => {
            this.view.renderCheckboxFilters(products, filters);
        });
    }
}
