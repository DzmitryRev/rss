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

export type FiltersType = {
    checkbox: CheckboxFiltersType;
    sort: SortType;
};
export interface IModel {
    _products: ProductType[];
    searchValue: string;
    findProduct(id: string): void;
    // storage listeners
    getCardStorage(): ProductType[];
    getFiltersStorage(): FiltersType;
    setCardStorage(card: ProductType[]): void;
    setFiltersStorage: (filters: FiltersType) => void;
    // connectors for data
    getProducts(callback: (products: ProductType[], currentCard: ProductType[]) => void): void;
    getCard(callback: (products: ProductType[], currentCard: ProductType[]) => void): void;
    getFilters(callback: (products: ProductType[], filters: CheckboxFiltersType) => void): void;
    getSort(callback: (sort: SortType) => void): void;
    // manage card
    addToCard(id: string, callback: () => void): void;
    removeFromCard(id: string, callback: () => void): void;
    // manage filters
    changeCheckboxFilter(field: string, value: string, callback: () => void): void;
    resetFilters(callback: () => void): void;
    // manage sort
    changeSort(value: SortValueType, callback: (sortBy: SortType) => void): void;
    // manage search
    inputSearch(value: string, callback: () => void): void;
}

export class Model implements IModel {
    _products: ProductType[];
    searchValue: string;
    // ranges: { price: [string, string] };
    sortBy: SortType;

    getCardStorage: () => ProductType[];
    setCardStorage: (card: ProductType[]) => void;

    getFiltersStorage: () => FiltersType;
    setFiltersStorage: (filters: FiltersType) => void;

    constructor(products: ProductType[]) {
        this._products = products;
        this.searchValue = "";
        const localStorage = window.localStorage;
        this.sortBy = {
            Up: true,
            value: "default",
        };

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
            checkbox: {
                color: [],
                year: [],
                memory: [],
                manufacturer: [],
            },
            sort: {
                Up: true,
                value: "default",
            },
        };

        this.getFiltersStorage = () => {
            return (
                <FiltersType>JSON.parse(<string>localStorage.getItem("revchenko-store-filters")) ||
                defaultFilters
            );
        };
        this.setFiltersStorage = (filters: FiltersType) => {
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
    // Manage filters and sort
    changeCheckboxFilter(field: string, value: string, callback: () => void): void {
        const { checkbox } = this.getFiltersStorage();
        const key = field as keyof typeof checkbox;
        if (checkbox[key].includes(value)) {
            const newArrayOfFilters = checkbox[key].filter((item) => item !== value);
            checkbox[key] = newArrayOfFilters;
        } else {
            checkbox[key].push(value);
        }
        this.setFiltersStorage({ ...this.getFiltersStorage(), checkbox });
        callback();
    }
    resetFilters(callback: () => void): void {
        const defaultFilters: FiltersType = {
            ...this.getFiltersStorage(),
            checkbox: {
                color: [],
                year: [],
                memory: [],
                manufacturer: [],
            },
        };
        this.setFiltersStorage(defaultFilters);
        callback();
    }
    // Manage sort
    changeSort(value: SortValueType, callback: (sortBy: SortType) => void): void {
        const filters = this.getFiltersStorage();

        if (filters.sort.value === "default") {
            filters.sort.Up = true;
            filters.sort.value = value;
            this.setFiltersStorage(filters);
            callback(filters.sort);
            return;
        }
        if (filters.sort.value === value) {
            filters.sort.Up = !filters.sort.Up;
            this.setFiltersStorage(filters);
            callback(filters.sort);
            return;
        }
        filters.sort.Up = true;
        filters.sort.value = value;
        this.setFiltersStorage(filters);
        callback(filters.sort);
    }
    // Manage search
    inputSearch(value: string, callback: () => void) {
        this.searchValue = value;
        callback();
    }
    // Connectors
    getProducts(callback: (products: ProductType[], currentCard: ProductType[]) => void): void {
        const { checkbox, sort } = this.getFiltersStorage();
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
            for (const i in checkbox) {
                const key = i as keyof typeof checkbox;
                if (!checkbox[key].length) {
                    result = true;
                } else if (!checkbox[key].includes(product[key])) {
                    return false;
                }
            }
            return result;
        });
        // Step 3 - sort
        switch (sort.value) {
            case "price": {
                sort.Up
                    ? filtredPropucts.sort((a, b) => +a.price - +b.price)
                    : filtredPropucts.sort((a, b) => +b.price - +a.price);
                break;
            }
            case "memory": {
                sort.Up
                    ? filtredPropucts.sort((a, b) => +a.memory - +b.memory)
                    : filtredPropucts.sort((a, b) => +b.memory - +a.memory);
                break;
            }
            case "quantity": {
                sort.Up
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
        const { checkbox } = this.getFiltersStorage();
        callback(this._products, checkbox);
    }
    getSort(callback: (sort: SortType) => void): void {
        const { sort } = this.getFiltersStorage();
        callback(sort);
    }
}
