import { products, ProductType } from "../data/products";

export interface IStoreModel {
    products: ProductType[];
    card: ProductType[];
    getCardFromLocalStorage(): void;
    addToCard(product: ProductType): void;
}

export class StoreModel implements IStoreModel {
    products: ProductType[];
    card: ProductType[];
    constructor() {
        this.products = products;
        this.card = [];
        this.getCardFromLocalStorage();
    }
    getCardFromLocalStorage(): void {
        this.card =
            <ProductType[]>JSON.parse(<string>localStorage.getItem("revchenko-store-card")) || [];
    }
    addToCard(product: ProductType): void {
        const newCard: ProductType[] = [...this.card];
        if (newCard.filter((item) => item.id === product.id).length === 0) {
            newCard.push(product);
            localStorage.setItem("revchenko-store-card", JSON.stringify(newCard));
            this.getCardFromLocalStorage();
        } else {
            console.log("Такой товар уже добавлен");
        }
    }
}
