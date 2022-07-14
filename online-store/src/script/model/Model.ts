import { products, ProductType } from "../../data/products";
import { CheckboxFilter } from "../utils/CheckboxFilter";

export interface IModel {
    _products: ProductType[];
    // card: ProductType[];
    // filter(): ProductType[];
    findProduct(id: string): void;
    // refreshCard(): void;
    // addToCard(productId: string, callback: (card: ProductType[], productId: string) => void): void;
    // removeFromCard(
    //     productId: string,
    //     callback: (card: ProductType[], productId: string) => void
    // ): void;
    // toggleColor(
    //     method: "ADD" | "DELETE",
    //     value: string,
    //     callback: (products: ProductType[], card: ProductType[]) => void
    // ): void;
    // toggleYear(
    //     method: "ADD" | "DELETE",
    //     value: string,
    //     callback: (products: ProductType[], card: ProductType[]) => void
    // ): void;
    // yearFilter: CheckboxFilter;

    // Refactor
    getCard(callback: (products: ProductType[], currentCard: ProductType[]) => void): void;
    addToCard(id: string, callback: () => void): void;
    removeFromCard(id: string, callback: () => void): void;

    getCardStorage(): ProductType[];
    setCardStorage(card: ProductType[]): void;
    getProducts(callback: (products: ProductType[], currentCard: ProductType[]) => void): void;
    addFilter(field: string, value: string, callback: () => void): void;
    removeFilter(field: string, value: string, callback: () => void): void;
}

export class Model implements IModel {
    _products: ProductType[];
    // card: ProductType[];
    // colorFilter: CheckboxFilter;
    // yearFilter: CheckboxFilter;
    // Refactor

    getCardStorage: () => ProductType[];
    setCardStorage: (card: ProductType[]) => void;

    getFiltersStorage: () => {
        color: string[];
        year: string[];
    };
    setFiltersStorage: (filters: { color: string[]; year: string[] }) => void;

    filters: {
        color: string[];
        year: string[];
    };
    //

    constructor() {
        this._products = products;
        // this.card = [];
        // this.colorFilter = new CheckboxFilter();
        // this.yearFilter = new CheckboxFilter();

        // Refactor
        const localStorage = window.localStorage;

        this.getCardStorage = () => {
            return (
                <ProductType[]>JSON.parse(<string>localStorage.getItem("revchenko-store-card")) ||
                []
            );
        };

        this.setCardStorage = (card: ProductType[]) => {
            localStorage.setItem("revchenko-store-card", JSON.stringify(card));
        };

        this.filters = {
            color: [],
            year: [],
        };

        this.getFiltersStorage = () => {
            return (
                <
                    {
                        color: string[];
                        year: string[];
                    }
                >JSON.parse(<string>localStorage.getItem("revchenko-store-filters")) || {
                    color: [],
                    year: [],
                }
            );
        };
        this.setFiltersStorage = (filters: { color: string[]; year: string[] }) => {
            localStorage.setItem("revchenko-store-filters", JSON.stringify(filters));
        };

        //
    }

    // Refactor
    addToCard(id: string, callback: () => void): void {
        const card = this.getCardStorage();
        const product = this.findProduct(id);
        if (!product || card.find((productInCard) => productInCard.id === id)) return;
        // if (!card.length) {
        //     const newCard: ProductType[] = [product];
        //     this.setCardStorage(newCard);
        //     callback();
        //     return;
        // }
        const newCard: ProductType[] = [...card, product];
        this.setCardStorage(newCard);
        callback();
    }
    removeFromCard(id: string, callback: () => void): void {
        const card = this.getCardStorage();
        const product = this.findProduct(id);
        if (!product || !card.length) return;
        const newCard: ProductType[] = card.filter((item) => item.id !== id);
        this.setCardStorage(newCard);
        callback();
    }
    getCard(callback: (products: ProductType[], currentCard: ProductType[]) => void): void {
        const card = this.getCardStorage();
        callback(this._products, card);
    }
    //

    // finish
    findProduct(id: string): ProductType | undefined {
        return this._products.find((item) => item.id === id);
    }

    // filter(): ProductType[] {
    //     const filtredProducts = this._products.filter((item) => {
    //         return (
    //             (!this.colorFilter.values.length || this.colorFilter.values.includes(item.color)) &&
    //             (!this.yearFilter.values.length || this.yearFilter.values.includes(item.year))
    //         );
    //     });
    //     return filtredProducts;
    // }

    addFilter(field: string, value: string, callback: () => void) {
        const filters = this.getFiltersStorage();
        filters[field as keyof typeof filters].push(value);
        this.setFiltersStorage(filters);
        callback();
    }
    removeFilter(field: string, value: string, callback: () => void) {
        const filters = this.getFiltersStorage();
        filters[field as keyof typeof filters].filter((item) => item !== value);
        this.setFiltersStorage(filters);
        callback();
    }

    getProducts(callback: (products: ProductType[], currentCard: ProductType[]) => void): void {
        const filters = this.getFiltersStorage();
        const filtredPropucts = this._products.filter((product) => {
            for (const i in filters) {
                const key = i as keyof typeof filters;
                if (!filters[key].length) return true;
                if (filters[key].includes(product[key])) {
                    return true;
                }
                return false;
            }
        });
        const currentCard = this.getCardStorage();
        callback(filtredPropucts, currentCard);
    }

    // toggleColor(
    //     method: "ADD" | "DELETE",
    //     value: string,
    //     callback: (products: ProductType[], card: ProductType[]) => void
    // ) {
    //     this.colorFilter.toggleValue(method, value);
    //     console.log(this.colorFilter.values);
    //     callback(this.filter(), this.card);
    // }
    // toggleYear(
    //     method: "ADD" | "DELETE",
    //     value: string,
    //     callback: (products: ProductType[], card: ProductType[]) => void
    // ) {
    //     this.yearFilter.toggleValue(method, value);
    //     callback(this.filter(), this.card);
    // }

    // // finish
    // refreshCard(): void {
    //     this.card =
    //         <ProductType[]>JSON.parse(<string>localStorage.getItem("revchenko-store-card")) || [];
    // }
    // // finish
    // addToCard(productId: string, callback: (card: ProductType[], productId: string) => void): void {
    //     if (this.card.length >= 20) {
    //         alert("Не больше 20 товаров!");
    //         return;
    //     }
    //     const product: ProductType | undefined = this.findProduct(productId);
    //     const newCard: ProductType[] = [...this.card];
    //     if (newCard.filter((item) => item.id === productId).length > 0 || !product) return;
    //     newCard.push(product);
    //     localStorage.setItem("revchenko-store-card", JSON.stringify(newCard));
    //     this.refreshCard();
    //     callback(this.card, productId);
    // }
    // // finish
    // removeFromCard(productId: string, callback: (card: ProductType[], productId: string) => void) {
    //     const newCard: ProductType[] = this.card.filter((item) => item.id !== productId);
    //     localStorage.setItem("revchenko-store-card", JSON.stringify(newCard));
    //     this.refreshCard();
    //     callback(this.card, productId);
    // }
}
