import { ProductType } from "../../data/products";
import { IModel } from "../model/Model";
import { IView } from "../view/View";

export interface IController {
    model: IModel;
    view: IView;
    start(): void;
    render(): void;
    hanlerAddToCard(id: string): void;
    hanlerRemoveFromCard(id: string): void;
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
            this.hanlerAddToCard(id);
        });
        this.view.removeFromCardEvent((id: string) => {
            this.hanlerRemoveFromCard(id);
        });
        this.view.colorFilterEvent((method: "ADD" | "DELETE", value: string) => {
            this.handleColorFilter(method, value);
        });
        this.view.yearFilterEvent((method: "ADD" | "DELETE", value: string) => {
            this.handleYearFilter(method, value);
        });
        // init card local storage
        this.model.refreshCard();
        // init render
        this.render();
    }
    // render All
    // finish
    render() {
        this.view.productsBlock.render(this.model.filter(), this.model.card);
        this.view.settingsBlock.render(this.model._products);
        this.view.renderCard(this.model.card);
    }
    // finish
    hanlerAddToCard(id: string) {
        this.model.addToCard(id, (card: ProductType[], productId: string) => {
            this.view.renderCard(card);
            this.view.renderProductFooter(productId);
        });
    }
    // finish
    hanlerRemoveFromCard(id: string) {
        this.model.removeFromCard(id, (card: ProductType[], productId: string) => {
            this.view.renderCard(card);
            this.view.renderProductFooter(productId);
        });
    }
    handleColorFilter(method: "ADD" | "DELETE", value: string) {
        this.model.toggleColor(method, value, (products, card) => {
            this.view.productsBlock.render(products, card);
        });
    }
    handleYearFilter(method: "ADD" | "DELETE", value: string) {
        this.model.toggleYear(method, value, (products, card) => {
            this.view.productsBlock.render(products, card);
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
