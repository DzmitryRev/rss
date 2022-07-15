import { ProductType } from "../../data/products";

export type FiltersType = { color: string[]; year: string[]; manufacturer: string[]; memory: string[] };

export interface IModel {
    _products: ProductType[];
    findProduct(id: string): void;

    // storage listeners
    getCardStorage(): ProductType[];
    getFiltersStorage(): FiltersType;
    setCardStorage(card: ProductType[]): void;
    setFiltersStorage: (filters: FiltersType) => void;

    // connectors for data
    getProducts(callback: (products: ProductType[], currentCard: ProductType[]) => void): void;
    getCard(callback: (products: ProductType[], currentCard: ProductType[]) => void): void;
    getFilters(callback: (products: ProductType[], filters: FiltersType) => void): void;

    // manage card
    addToCard(id: string, callback: () => void): void;
    removeFromCard(id: string, callback: () => void): void;

    // manage filters
    changeFilter(field: string, value: string, callback: () => void): void;
}

export class Model implements IModel {
    _products: ProductType[];

    getCardStorage: () => ProductType[];
    setCardStorage: (card: ProductType[]) => void;

    getFiltersStorage: () => FiltersType;
    setFiltersStorage: (filters: FiltersType) => void;

    constructor(products: ProductType[]) {
        this._products = products;

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

        const defaultFilters: FiltersType = {
            color: [],
            year: [],
            memory: [],
            manufacturer: [],
        };

        this.getFiltersStorage = () => {
            return (
                <FiltersType>JSON.parse(<string>localStorage.getItem("revchenko-store-filters")) ||
                defaultFilters
            );
        };
        this.setFiltersStorage = (filters: { color: string[]; year: string[] }) => {
            localStorage.setItem("revchenko-store-filters", JSON.stringify(filters));
        };
    }

    findProduct(id: string): ProductType | undefined {
        return this._products.find((item) => item.id === id);
    }

    // Card logic

    addToCard(id: string, callback: () => void): void {
        const card = this.getCardStorage();
        const product = this.findProduct(id);
        if (!product || card.find((productInCard) => productInCard.id === id)) return;
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

    // Filter logic

    changeFilter(field: string, value: string, callback: () => void) {
        const filters = this.getFiltersStorage();
        const key = field as keyof typeof filters;
        if (filters[key].includes(value)) {
            const newArrayOfFilters = filters[key].filter((item) => item !== value);
            filters[key] = newArrayOfFilters;
        } else {
            filters[key].push(value);
        }
        this.setFiltersStorage(filters);
        callback();
    }

    getFilters(callback: (products: ProductType[], filters: FiltersType) => void) {
        const filters = this.getFiltersStorage();
        callback(this._products, filters);
    }

    // Products logic

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
}
