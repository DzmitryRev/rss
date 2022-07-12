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
        // init card local storage
        this.model.refreshCard();
        // init render
        this.render();
    }
    // render All
    // finish
    render() {
        this.view.renderProducts(this.model.products, this.model.card);
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
}


// TODO: 
    // 1. Стилизовать CardCount
    // 2. Добавить логику открытия бокового меню
    // 3. Сортировка
    // 4. Фильтрация
    // 5. Поиск
    // 6. Корзина???
    