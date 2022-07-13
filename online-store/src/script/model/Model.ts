import { products, ProductType } from "../../data/products";

export interface IModel {
    products: ProductType[];
    card: ProductType[];
    findProduct(id: string): void;
    refreshCard(): void;
    addToCard(productId: string, callback: (card: ProductType[], productId: string) => void): void;
    removeFromCard(
        productId: string,
        callback: (card: ProductType[], productId: string) => void
    ): void;
}

export class Model implements IModel {
    products: ProductType[];
    card: ProductType[];

    constructor() {
        this.products = products;
        this.card = [];
    }
    // finish
    findProduct(id: string): ProductType | undefined {
        return this.products.find((item) => item.id === id);
    }
    // finish
    refreshCard(): void {
        this.card =
            <ProductType[]>JSON.parse(<string>localStorage.getItem("revchenko-store-card")) || [];
    }
    // finish
    addToCard(productId: string, callback: (card: ProductType[], productId: string) => void): void {
        if(this.card.length >= 20) {
            alert("Не больше 20 товаров!")
            return
        }
        const product: ProductType | undefined = this.findProduct(productId);
        const newCard: ProductType[] = [...this.card];
        if (newCard.filter((item) => item.id === productId).length > 0 || !product) return;
        newCard.push(product);
        localStorage.setItem("revchenko-store-card", JSON.stringify(newCard));
        this.refreshCard();
        callback(this.card, productId);
    }
    // finish
    removeFromCard(productId: string, callback: (card: ProductType[], productId: string) => void) {
        const newCard: ProductType[] = this.card.filter((item) => item.id !== productId);
        localStorage.setItem("revchenko-store-card", JSON.stringify(newCard));
        this.refreshCard();
        callback(this.card, productId);
    }
}
