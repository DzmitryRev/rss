import { products, ProductType } from "../../data/products";
interface IFilters {
    color: string[];
    memory: string[];
    manufacturer: string[];
}

export interface IModel {
    _products: ProductType[];
    card: ProductType[];
    filters: IFilters;
    filter(): ProductType[];
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

enum Colors {
    white = "белый",
}

export class Model implements IModel {
    _products: ProductType[];
    card: ProductType[];
    filters: IFilters;

    constructor() {
        this._products = products;
        this.card = [];
        this.filters = {
            color: [],
            memory: [],
            manufacturer: [],
            // price: { from: "0", to: "2000" },
        };
    }

    // finish
    findProduct(id: string): ProductType | undefined {
        return this._products.find((item) => item.id === id);
    }
    filter(): ProductType[] {
        const filtredProducts = this._products.filter((item) => {
            return (
                (!this.filters.color.length || this.filters.color.includes(item.color)) &&
                (!this.filters.memory.length ||
                    this.filters.memory.includes((item.memory as unknown) as string)) &&
                (!this.filters.manufacturer.length ||
                    this.filters.manufacturer.includes(item.manufacturer))
                //     &&
                // Number(item.price) >= Number(filters.price.from) &&
                // Number(item.price) <= Number(filters.price.to)
            );
        });
        return filtredProducts;
    }
    changeFilter(method: "ADD" | "DELETE", key: string, value: string) {
        const a = Object.keys(this.filters);
        switch (method) {
            case "ADD": {
                a.forEach((item) => {
                    if (item === key) {
                        this.filters[item as keyof typeof this.filters].push(value);
                    }
                });
                break;
            }
            case "DELETE": {
                a.forEach((item) => {
                    if (item === key) {
                        this.filters[item as keyof typeof this.filters].filter((item) => {
                            item !== value;
                        });
                    }
                });
                break;
            }
            default: {
                break;
            }
        }
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
