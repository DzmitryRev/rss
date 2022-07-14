import { ProductType } from "../../data/products";
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
    // finish
    start() {
        // set up events
        this.view.addToCardEvent((id: string) => {
            this.handleAddToCard(id);
        });
        this.view.removeFromCardEvent((id: string) => {
            this.handleRemoveFromCard(id);
        });
        // this.view.colorFilterEvent((method: "ADD" | "DELETE", value: string) => {
        //     this.handleAddFilter(value);
        // });
        // this.view.yearFilterEvent((method: "ADD" | "DELETE", value: string) => {
        //     this.handleYearFilter(method, value);
        // });
        // init card local storage
        // this.model.refreshCard();
        // init render
        this.render();
    }
    // render All
    // finish
    render() {
        // this.view.settingsBlock.render(this.model._products);
        // this.view.productsBlock.render(
        //     this.model.getProducts((products) => {
        //         console.log("Aaa");
        //     })
        // );
        this._getProducts();
        // this._getProducts();
        // this.view.renderCard(this.model.getCardStorage());
        // this.view.renderProductFooter(this.model._products, this.model.getCardStorage());
        this._getCard();
    }
    // // finish
    // hanlerAddToCard(id: string) {
    //     this.model.addToCard(id, (card: ProductType[], productId: string) => {
    //         this.view.renderCard(card);
    //         this.view.renderProductFooter(productId);
    //     });
    // }
    // // finish
    // hanlerRemoveFromCard(id: string) {
    //     this.model.removeFromCard(id, (card: ProductType[], productId: string) => {
    //         this.view.renderCard(card);
    //         this.view.renderProductFooter(productId);
    //     });
    // }
    // handleColorFilter(method: "ADD" | "DELETE", value: string) {
    //     this.model.toggleColor(method, value, (products) => {
    //         this.view.productsBlock.render(products);
    //     });
    // }
    // handleYearFilter(method: "ADD" | "DELETE", value: string) {
    //     this.model.toggleYear(method, value, (products) => {
    //         this.view.productsBlock.render(products);
    //     });
    // }

    // CARD
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
    // handleAddFilter(value: string) {
    //     this.model.addFilter("color", value, () => {
    //         this._getProducts();
    //     });
    // }
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
        });
    }
    _getProducts() {
        this.model.getProducts((products, currentCard) => {
            this.view.productsBlock.render(products);
            this.view.renderProductFooter(products, currentCard);
        });
    }
}

// TODO:
// 1. Стилизовать CardCount // +
// 1.1 Не больше 20 товаров в корзине!
// 2. Добавить логику открытия бокового меню
// 3. Сортировка
// 4. Фильтрация
// 5. Поиск
// 6. Корзина???
