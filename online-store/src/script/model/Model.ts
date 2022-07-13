import { products, ProductType } from "../../data/products";
import { CheckboxFilter } from "../utils/CheckboxFilter";

export interface IModel {
    _products: ProductType[];
    card: ProductType[];
    filter(): ProductType[];
    findProduct(id: string): void;
    refreshCard(): void;
    addToCard(productId: string, callback: (card: ProductType[], productId: string) => void): void;
    removeFromCard(
        productId: string,
        callback: (card: ProductType[], productId: string) => void
    ): void;
    toggleColor(
        method: "ADD" | "DELETE",
        value: string,
        callback: (products: ProductType[], card: ProductType[]) => void
    ): void;
}

export class Model implements IModel {
    _products: ProductType[];
    card: ProductType[];
    colorFilter: CheckboxFilter;
    constructor() {
        this._products = products;
        this.card = [];
        this.colorFilter = new CheckboxFilter();
    }

    // finish
    findProduct(id: string): ProductType | undefined {
        return this._products.find((item) => item.id === id);
    }

    filter(): ProductType[] {
        const filtredProducts = this._products.filter((item) => {
            return !this.colorFilter.values.length || this.colorFilter.values.includes(item.color);
        });
        return filtredProducts;
    }

    toggleColor(
        method: "ADD" | "DELETE",
        value: string,
        callback: (products: ProductType[], card: ProductType[]) => void
    ) {
        this.colorFilter.toggleValue(method, value);
        callback(this.filter(), this.card);
    }

    // finish
    refreshCard(): void {
        this.card =
            <ProductType[]>JSON.parse(<string>localStorage.getItem("revchenko-store-card")) || [];
    }
    // finish
    addToCard(productId: string, callback: (card: ProductType[], productId: string) => void): void {
        if (this.card.length >= 20) {
            alert("Не больше 20 товаров!");
            return;
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
