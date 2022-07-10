import { products, ProductType } from "../../data/products";

export interface IModel {
    products: ProductType[];
    card: ProductType[];
    getCardFromLocalStorage(): void;
    addToCard(productId: string, callback: () => void): void;
}

export class Model implements IModel {
    products: ProductType[];
    card: ProductType[];

    constructor() {
        this.products = products;
        this.card = [];
        this.getCardFromLocalStorage();
    }

    findProduct(id: string): ProductType | undefined {
        return this.products.find((item) => item.id === id);
    }

    getCardFromLocalStorage(): void {
        this.card =
            <ProductType[]>JSON.parse(<string>localStorage.getItem("revchenko-store-card")) || [];
    }

    addToCard(productId: string, callback: () => void): void {
        const product: ProductType | undefined = this.findProduct(productId);
        const newCard: ProductType[] = [...this.card];
        if (newCard.filter((item) => item.id === productId).length > 0 || !product) return;

        newCard.push(product);
        localStorage.setItem("revchenko-store-card", JSON.stringify(newCard));
        this.getCardFromLocalStorage();
        callback();
    }

    removeFromCard(product: ProductType, callback: () => void) {
        console.log("remove from card");
    }
}
