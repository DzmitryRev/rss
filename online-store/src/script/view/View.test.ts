import { SortValueType } from "../model/types";
import { View } from "./View";

const products = [
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

test("Render products", () => {
    const view = new View();
    const templateMethod = jest.spyOn(view.template, "createProduct");
    jest.spyOn(view, "renderProducts").mockImplementation((products) => {
        products.forEach((item) => {
            view.template.createProduct(item);
        });
    });
    view.renderProducts(products);
    expect(templateMethod).toBeCalled();
    expect(templateMethod).toBeCalledTimes(3);
});
test("Render search", () => {
    const view = new View();
    const templateMethod = jest.spyOn(view.template, "createSearch");
    jest.spyOn(view, "renderSearch").mockImplementation(() => {
        view.template.createSearch();
    });
    view.renderSearch();
    expect(templateMethod).toBeCalled();
    expect(templateMethod).toBeCalledTimes(1);
});
test("Render checkbox filter", () => {
    const view = new View();
    const templateMethod = jest.spyOn(view.template, "createFiltersContainer");
    jest.spyOn(view, "renderCheckboxFilters").mockImplementation((products, filters) => {
        view.template.createFiltersContainer([], "color", []);
    });
    view.renderCheckboxFilters(products, {
        color: [],
        year: [],
        memory: [],
        manufacturer: [],
    });
    expect(templateMethod).toBeCalled();
    expect(templateMethod).toBeCalledTimes(1);
});
test("Render card", () => {
    const view = new View();
    const addClass = jest.fn(() => {
        return;
    });
    const removeClass = jest.fn(() => {
        return;
    });
    const templateMethod = jest.spyOn(view, "renderCard").mockImplementation((card) => {
        if (card.length === 0) {
            addClass();
        } else {
            removeClass();
        }
    });
    view.renderCard(products);
    expect(addClass.mock.calls.length).toBe(0);
    expect(removeClass.mock.calls.length).toBe(1);
    jest.clearAllMocks();
    view.renderCard([]);
    expect(addClass.mock.calls.length).toBe(1);
    expect(removeClass.mock.calls.length).toBe(0);
});

describe("Events", () => {
    test("Add to card event", () => {
        const view = new View();
        const handler = jest.fn((id: string) => {
            return;
        });
        jest.spyOn(view, "addToCardEvent").mockImplementation((cb) => {
            cb("1");
        });
        view.addToCardEvent(handler);
        expect(handler).toBeCalled();
    });
    test("Remove from card event", () => {
        const view = new View();
        const handler = jest.fn((id: string) => {
            return;
        });
        jest.spyOn(view, "removeFromCardEvent").mockImplementation((cb) => {
            cb("1");
        });
        view.removeFromCardEvent(handler);
        expect(handler).toBeCalled();
    });
    test("Filter event", () => {
        const view = new View();
        const handler = jest.fn((field: string, value: string) => {
            return;
        });
        jest.spyOn(view, "filterEvent").mockImplementation((cb) => {
            cb("field", "value");
        });
        view.filterEvent(handler);
        expect(handler).toBeCalled();
    });
    test("Reset filters event", () => {
        const view = new View();
        const handler = jest.fn(() => {
            return;
        });
        jest.spyOn(view, "resetFilterEvent").mockImplementation((cb) => {
            cb();
        });
        view.resetFilterEvent(handler);
        expect(handler).toBeCalled();
    });
    test("Search event", () => {
        const view = new View();
        const handler = jest.fn((value: string) => {
            return;
        });
        jest.spyOn(view, "searchEvent").mockImplementation((cb) => {
            cb("value");
        });
        view.searchEvent(handler);
        expect(handler).toBeCalled();
    });
    test("Search event", () => {
        const view = new View();
        const handler = jest.fn((value: SortValueType) => {
            return;
        });
        jest.spyOn(view, "sortEvent").mockImplementation((cb) => {
            cb("price");
        });
        view.sortEvent(handler);
        expect(handler).toBeCalled();
    });
});
