import { products, ProductType } from "../../data/products";

export interface IModel {
    products: ProductType[];
    card: ProductType[];
    refreshCard(): void;
    addToCard(
        productId: string,
        callback: (products: ProductType[], card: ProductType[]) => void
    ): void;
    removeFromCard(
        productId: string,
        callback: (products: ProductType[], card: ProductType[]) => void
    ): void;
}

export class Model implements IModel {
    products: ProductType[];
    card: ProductType[];

    constructor() {
        this.products = products;
        this.card = [];
    }

    private findProduct(id: string): ProductType | undefined {
        return this.products.find((item) => item.id === id);
    }

    refreshCard(): void {
        this.card =
            <ProductType[]>JSON.parse(<string>localStorage.getItem("revchenko-store-card")) || [];
    }

    addToCard(
        productId: string,
        callback: (products: ProductType[], card: ProductType[]) => void
    ): void {
        const product: ProductType | undefined = this.findProduct(productId);
        const newCard: ProductType[] = [...this.card];
        if (newCard.filter((item) => item.id === productId).length > 0 || !product) return;
        newCard.push(product);
        localStorage.setItem("revchenko-store-card", JSON.stringify(newCard));
        this.refreshCard();
        callback(this.products, this.card);
    }

    removeFromCard(productId: string, callback: (products: ProductType[], card: ProductType[]) => void) {
        const newCard: ProductType[] = this.card.filter((item) => item.id !== productId);
        localStorage.setItem("revchenko-store-card", JSON.stringify(newCard));
        this.refreshCard();
        callback(this.products, this.card);
    }
}
