import { products, ProductType } from "../data/products";

export interface IStoreModel {
    products: ProductType[];
    card: ProductType[];
    onChange(): void;
    getCardFromLocalStorage(): void;
    addToCard(product: ProductType, callback: () => void): void;
}

export class StoreModel implements IStoreModel {
    products: ProductType[];
    card: ProductType[];
    onChange: () => void;
    constructor() {
        this.products = products;
        this.card = [];
        this.getCardFromLocalStorage();
        this.onChange = function () {
            console.log("aaa");
        };
    }
    getCardFromLocalStorage(): void {
        this.card =
            <ProductType[]>JSON.parse(<string>localStorage.getItem("revchenko-store-card")) || [];
    }
    addToCard(product: ProductType, callback: () => void): void {
        const newCard: ProductType[] = [...this.card];
        if (newCard.filter((item) => item.id === product.id).length === 0) {
            newCard.push(product);
            localStorage.setItem("revchenko-store-card", JSON.stringify(newCard));
            this.getCardFromLocalStorage();
            callback();
        } else {
            console.log("Такой товар уже добавлен");
        }
    }
    removeFromCard(product: ProductType, callback: () => void) {
        console.log("remove from card");
    }
}
