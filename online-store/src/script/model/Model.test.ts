import { ProductType } from "../../data/types";
import { Model } from "./Model";
import { CheckboxFiltersType, FiltersType, SortType } from "./types";

// Main goal - test working with localStorage and calling callbacks

const products: ProductType[] = [
    {
        id: "1",
        title: "Apple Iphone 13",
        model: "Iphone 13",
        manufacturer: "Apple",
        year: "2021",
        price: "599",
        memory: "128",
        quantity: 0,
        color: "Белый",
        image: "https://mobillife.by/images/virtuemart/product/30052886b.jpg",
    },
    {
        id: "2",
        title: "Apple Iphone 13",
        model: "Iphone 13",
        manufacturer: "Apple",
        year: "2021",
        price: "599",
        memory: "256",
        quantity: 13,
        color: "Голубой",
        image: "https://mobillife.by/images/virtuemart/product/30059040b.jpg",
    },
    {
        id: "3",
        title: "Apple Iphone 12",
        model: "Iphone 12",
        manufacturer: "Apple",
        year: "2020",
        price: "499",
        memory: "64",
        quantity: 11,
        color: "Белый",
        image: "https://mobillife.by/images/virtuemart/product/30052886b.jpg",
    },
];

function storageMock() {
    let storage = {};

    return {
        setItem: function (key: string, value: string) {
            storage[key] = value || "";
        },
        getItem: function (key: string) {
            return key in storage ? storage[key as keyof typeof storage] : null;
        },
        removeItem: function (key: string) {
            delete storage[key as keyof typeof storage];
        },
        clear: function () {
            storage = {};
        },
        get length() {
            return Object.keys(storage).length;
        },
        key: function (i: number) {
            const keys = Object.keys(storage);
            return keys[i] || null;
        },
    };
}
const model = new Model(products);

window.localStorage = storageMock();

describe("Get from local storage tests", () => {
    beforeEach(() => {
        model._products = products;
        window.localStorage.clear();
    });
    test("Get card with products from storage", () => {
        window.localStorage.setItem("revchenko-store-card", JSON.stringify(products));
        expect(model.getCardStorage()).toEqual(products);
    });
    test("Get empty card from storage", () => {
        window.localStorage.clear();
        expect(model.getCardStorage()).toEqual([]);
    });
    test("Get filters from storage", () => {
        const filters: FiltersType = {
            checkbox: {
                color: [],
                year: [],
                memory: [],
                manufacturer: [],
            },
            sort: {
                fromSmaller: true,
                value: "default",
            },
        };
        window.localStorage.setItem("revchenko-store-filters", JSON.stringify(filters));
        expect(model.getFiltersStorage()).toEqual(filters);
    });
    test("Get empty filters from storage", () => {
        const filters: FiltersType = {
            checkbox: {
                color: [],
                year: [],
                memory: [],
                manufacturer: [],
            },
            sort: {
                fromSmaller: true,
                value: "default",
            },
        };
        expect(model.getFiltersStorage()).toEqual(filters);
    });
});
describe("Set local storage tests", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });
    test("Set products card in local storage", () => {
        model.setCardStorage(products);
        expect(JSON.parse(<string>window.localStorage.getItem("revchenko-store-card"))).toEqual(
            products
        );
    });
    test("Set filters in local storage", () => {
        const filters: FiltersType = {
            checkbox: {
                color: [],
                year: [],
                memory: [],
                manufacturer: [],
            },
            sort: {
                fromSmaller: true,
                value: "default",
            },
        };
        model.setFiltersStorage(filters);
        expect(JSON.parse(<string>window.localStorage.getItem("revchenko-store-filters"))).toEqual(
            filters
        );
    });
});

test("Find product", () => {
    model._products = products;
    const product = {
        id: "1",
        title: "Apple Iphone 13",
        model: "Iphone 13",
        manufacturer: "Apple",
        year: "2021",
        price: "599",
        memory: "128",
        quantity: 0,
        color: "Белый",
        image: "https://mobillife.by/images/virtuemart/product/30052886b.jpg",
    };
    expect(model.findProduct("1")).toEqual(product);
    expect(model.findProduct("4")).toBeUndefined();
});

describe("Add/Remove product to card", () => {
    beforeEach(() => {
        model._products = products;
        window.localStorage.clear();
    });
    test("Successful add product", () => {
        const cb = jest.fn(() => {
            console.log("Callback");
        });
        model.addToCard("2", cb);
        expect(cb.mock.calls.length).toBe(1);
        expect(JSON.parse(<string>window.localStorage.getItem("revchenko-store-card"))).toEqual([
            {
                id: "2",
                title: "Apple Iphone 13",
                model: "Iphone 13",
                manufacturer: "Apple",
                year: "2021",
                price: "599",
                memory: "256",
                quantity: 13,
                color: "Голубой",
                image: "https://mobillife.by/images/virtuemart/product/30059040b.jpg",
            },
        ]);
    });
    test("Add product 0 quantity", () => {
        const cb = jest.fn(() => {
            console.log("Callback");
        });
        model.addToCard("1", cb);
        expect(cb.mock.calls.length).toBe(0);
    });
    test("Remove product", () => {
        const cb = jest.fn(() => {
            console.log("Callback");
        });
        model.addToCard("2", () => {
            console.log("cb ");
        });
        model.removeFromCard("2", cb);
        expect(cb.mock.calls.length).toBe(1);
        expect(JSON.parse(<string>window.localStorage.getItem("revchenko-store-card"))).toEqual([]);
    });
});

describe("Input search", () => {
    beforeEach(() => {
        model._products = products;
        window.localStorage.clear();
    });
    test("Input", () => {
        const cb = jest.fn(() => {
            console.log("Callback");
        });
        model.inputSearch("h", cb);
        expect(cb.mock.calls.length).toBe(1);
        expect(model.searchValue).toBe("h");
    });
});

describe("Send data to view", () => {
    beforeEach(() => {
        model._products = products;
        window.localStorage.clear();
    });
    test("Get card", () => {
        const cb = jest.fn((products: ProductType[], card: ProductType[]) => {
            console.log("Callback");
        });
        model.getCard(cb);
        expect(cb.mock.calls[0][0]).toEqual(products);
        expect(cb.mock.calls[0][1]).toEqual([]);
    });
    test("Get filters 1", () => {
        const cb = jest.fn((products: ProductType[], filters: CheckboxFiltersType) => {
            console.log("Callback");
        });
        model.getFilters(cb);
        expect(cb.mock.calls[0][0]).toEqual(products);
        expect(cb.mock.calls[0][1]).toEqual({
            color: [],
            year: [],
            memory: [],
            manufacturer: [],
        });
    });
    test("Get filters 2", () => {
        const cb = jest.fn((products: ProductType[], filters: CheckboxFiltersType) => {
            console.log("Callback");
        });
        model.setFiltersStorage({
            checkbox: {
                color: [],
                year: [],
                memory: ["128"],
                manufacturer: [],
            },
            sort: {
                fromSmaller: true,
                value: "default",
            },
        });
        model.getFilters(cb);
        expect(cb.mock.calls[0][1]).toEqual({
            color: [],
            year: [],
            memory: ["128"],
            manufacturer: [],
        });
    });
    test("Get sort", () => {
        const cb = jest.fn((sort: SortType) => {
            console.log("Callback");
        });
        model.getSort(cb);
        expect(cb.mock.calls[0][0]).toEqual({
            fromSmaller: true,
            value: "default",
        });
        model.setFiltersStorage({
            checkbox: {
                color: [],
                year: [],
                memory: ["128"],
                manufacturer: [],
            },
            sort: {
                fromSmaller: false,
                value: "price",
            },
        });
        model.getSort(cb);
        expect(cb.mock.calls[1][0]).toEqual({
            fromSmaller: false,
            value: "price",
        });
    });
    test("Get products", () => {
        const cb = jest.fn((products: ProductType[], currentCard: ProductType[]) => {
            console.log("Callback");
        });
        model.getProducts(cb);
        expect(cb.mock.calls[0][0]).toEqual(products);
        expect(cb.mock.calls[0][1]).toEqual([]);
        model.setCardStorage(products);
        model.getProducts(cb);
        expect(cb.mock.calls[1][0]).toEqual(products);
        expect(cb.mock.calls[1][1]).toEqual(products);
    });
});

test("Reset filters", () => {
    const cb = jest.fn(() => {
        console.log("Callback");
    });
    model.resetFilters(cb);
    expect(cb.mock.calls.length).toBe(1);
});
test("Reset filters", () => {
    const cb = jest.fn(() => {
        console.log("Callback");
    });
    model.changeCheckboxFilter("color", "Белый", cb);
    expect(cb.mock.calls.length).toBe(1);
});

