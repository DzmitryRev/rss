import { products, ProductType } from "../../data/products";

export interface IModel {
    _products: ProductType[];
    filter(): ProductType[];
    card: ProductType[];
    findProduct(id: string): void;
    refreshCard(): void;
    addToCard(productId: string, callback: (card: ProductType[], productId: string) => void): void;
    removeFromCard(
        productId: string,
        callback: (card: ProductType[], productId: string) => void
    ): void;
}

// sort = ["price", "quantity", "year", "memory"]
// if(!sort.length) return
// filters [
// price: {from: 0, to: 300}, // later
// year: {from: 2019, to: 2022}, // later
// color: [...all colors]
// memory: [... all memories]
//
// ]

//

interface IFilters {
    color: string[];
    memory: number[];
    manufacturer: string[];
}
enum Colors {
    white = "белый",
}

export class Model implements IModel {
    _products: ProductType[];
    card: ProductType[];

    constructor() {
        this._products = products;
        this.card = [];
    }

    // finish
    findProduct(id: string): ProductType | undefined {
        return this._products.find((item) => item.id === id);
    }
    filter(): ProductType[] {
        const filters: {
            color: string[];
            memory: number[];
            manufacturer: string[];
            price: { from: string; to: string };
        } = {
            color: [],
            memory: [],
            manufacturer: [],
            price: { from: "0", to: "2000" },
        };
        const filtredProducts = this._products.filter((item) => {
            return (
                (!filters.color.length || filters.color.includes(item.color)) &&
                (!filters.memory.length || filters.memory.includes(item.memory)) &&
                (!filters.manufacturer.length ||
                    filters.manufacturer.includes(item.manufacturer)) &&
                Number(item.price) >= Number(filters.price.from) &&
                Number(item.price) <= Number(filters.price.to)
            );
        });
        return filtredProducts;
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
