import { ProductType } from "../data/products";

export type CheckboxFiltersType = {
    color: string[];
    year: string[];
    manufacturer: string[];
    memory: string[];
};
export type SortValueType = "price" | "quantity" | "memory" | "default";
export type SortType = {
    Up: boolean;
    value: SortValueType;
};

export interface IModel {
    _products: ProductType[];
    searchValue: string;
    // ranges: { price: [string, string] };
    sortBy: SortType;
    findProduct(id: string): void;

    // storage listeners
    getCardStorage(): ProductType[];
    getFiltersStorage(): CheckboxFiltersType;
    setCardStorage(card: ProductType[]): void;
    setFiltersStorage: (filters: CheckboxFiltersType) => void;

    // connectors for data
    getProducts(callback: (products: ProductType[], currentCard: ProductType[]) => void): void;
    getCard(callback: (products: ProductType[], currentCard: ProductType[]) => void): void;
    getFilters(callback: (products: ProductType[], filters: CheckboxFiltersType) => void): void;

    // manage card
    addToCard(id: string, callback: () => void): void;
    removeFromCard(id: string, callback: () => void): void;

    // manage filters
    changeFilter(field: string, value: string, callback: () => void): void;
    resetFilters(callback: () => void): void;

    // manage search
    inputSearch(value: string, callback: () => void): void;

    changeSort(value: SortValueType, callback: (sortBy: SortType) => void): void;
    // manage range filters
    // changeRange(
    //     field: string,
    //     value: string[],
    //     callback: (ranges: { price: [string, string] }) => void
    // ): void;
}

export class Model implements IModel {
    _products: ProductType[];
    searchValue: string;
    // ranges: { price: [string, string] };
    sortBy: SortType;

    getCardStorage: () => ProductType[];
    setCardStorage: (card: ProductType[]) => void;

    getFiltersStorage: () => CheckboxFiltersType;
    setFiltersStorage: (filters: CheckboxFiltersType) => void;

    constructor(products: ProductType[]) {
        this._products = products;
        this.searchValue = "";
        const localStorage = window.localStorage;
        this.sortBy = {
            Up: true,
            value: "default",
        };
        // this.ranges = {
        //     price: ["0", "300"],
        // };

        this.getCardStorage = () => {
            return (
                <ProductType[]>JSON.parse(<string>localStorage.getItem("revchenko-store-card")) ||
                []
            );
        };

        this.setCardStorage = (card: ProductType[]) => {
            localStorage.setItem("revchenko-store-card", JSON.stringify(card));
        };

        const defaultFilters: CheckboxFiltersType = {
            color: [],
            year: [],
            memory: [],
            manufacturer: [],
        };

        this.getFiltersStorage = () => {
            return (
                <CheckboxFiltersType>(
                    JSON.parse(<string>localStorage.getItem("revchenko-store-filters"))
                ) || defaultFilters
            );
        };
        this.setFiltersStorage = (filters: CheckboxFiltersType) => {
            localStorage.setItem("revchenko-store-filters", JSON.stringify(filters));
        };
    }
    // Tools
    findProduct(id: string): ProductType | undefined {
        return this._products.find((item) => item.id === id);
    }
    // Manage card
    addToCard(id: string, callback: () => void): void {
        const card = this.getCardStorage();
        const product = this.findProduct(id);
        if (
            !product ||
            card.find((productInCard) => productInCard.id === id) ||
            product.quantity === 0
        )
            return;
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
    // Manage filters
    changeFilter(field: string, value: string, callback: () => void): void {
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
    changeSort(value: SortValueType, callback: (sortBy: SortType) => void): void {
        if (this.sortBy.value === "default") {
            this.sortBy.Up = true;
            this.sortBy.value = value;
            console.log(this.sortBy);
            callback(this.sortBy);
            return;
        }
        if (this.sortBy.value === value) {
            this.sortBy.Up = !this.sortBy.Up;
            console.log(this.sortBy);
            callback(this.sortBy);
            return;
        }
        this.sortBy.Up = true;
        this.sortBy.value = value;
        console.log(this.sortBy);
        callback(this.sortBy);
    }
    resetFilters(callback: () => void): void {
        const defaultFilters: CheckboxFiltersType = {
            color: [],
            year: [],
            memory: [],
            manufacturer: [],
        };
        this.setFiltersStorage(defaultFilters);
        callback();
    }
    // Manage search
    inputSearch(value: string, callback: () => void) {
        this.searchValue = value;
        callback();
    }
    // Manage ranges
    // changeRange(
    //     field: string,
    //     value: string[],
    //     callback: (ranges: { price: [string, string] }) => void
    // ) {
    //     console.log("aaa");
    //     this.ranges[field] = value;
    //     callback(this.ranges);
    // }
    // Connectors
    getProducts(callback: (products: ProductType[], currentCard: ProductType[]) => void): void {
        const filters = this.getFiltersStorage();
        // Step 1 - filter by search value
        const searchedProducts = this._products.filter((product) => {
            if (product.title.toLowerCase().includes(this.searchValue.toLowerCase())) {
                return true;
            }
            return false;
        });
        // Step 2 - filter by checkboxes
        const filtredPropucts = searchedProducts.filter((product) => {
            let result = true;
            for (const i in filters) {
                const key = i as keyof typeof filters;
                if (!filters[key].length) {
                    result = true;
                } else if (!filters[key].includes(product[key])) {
                    return false;
                }
            }
            return result;
        });
        // Step 3 - sort
        switch (this.sortBy.value) {
            case "price": {
                this.sortBy.Up
                    ? filtredPropucts.sort((a, b) => +a.price - +b.price)
                    : filtredPropucts.sort((a, b) => +b.price - +a.price);
                break;
            }
            case "memory": {
                this.sortBy.Up
                    ? filtredPropucts.sort((a, b) => +a.memory - +b.memory)
                    : filtredPropucts.sort((a, b) => +b.memory - +a.memory);
                break;
            }
            case "quantity": {
                this.sortBy.Up
                    ? filtredPropucts.sort((a, b) => +a.quantity - +b.quantity)
                    : filtredPropucts.sort((a, b) => +b.quantity - +a.quantity);
                break;
            }
            case "default": {
                break;
            }
            default:
                break;
        }
        const currentCard = this.getCardStorage();
        callback(filtredPropucts, currentCard);
    }
    getCard(callback: (products: ProductType[], currentCard: ProductType[]) => void): void {
        const card = this.getCardStorage();
        callback(this._products, card);
    }
    getFilters(callback: (products: ProductType[], filters: CheckboxFiltersType) => void): void {
        const filters = this.getFiltersStorage();
        callback(this._products, filters);
    }
}
