import { products } from "../../data/products";
import { Model } from "../model/Model";
import { View } from "../view/View";
import { Controller } from "./Controller";

jest.mock("../model/Model.ts");
jest.mock("../view/View.ts");

describe("Handlers", () => {
    test("Handle add to card", () => {
        const instanse = new Controller(new Model(products), new View());
        const method = jest.spyOn(instanse.model, "addToCard");
        instanse.handleAddToCard("1");
        expect(method).toBeCalled();
        expect(method).toBeCalledWith("1", expect.anything());
    });
    test("Handle remove from card", () => {
        const instanse = new Controller(new Model(products), new View());
        const method = jest.spyOn(instanse.model, "removeFromCard");
        instanse.handleRemoveFromCard("1");
        expect(method).toBeCalled();
        expect(method).toBeCalledWith("1", expect.anything());
    });
    test("Handle change checkbox filter", () => {
        const instanse = new Controller(new Model(products), new View());
        const method = jest.spyOn(instanse.model, "changeCheckboxFilter");
        instanse.handleChangeFilter("color", "Белый");
        expect(method).toBeCalled();
        expect(method).toBeCalledWith("color", "Белый", expect.anything());
    });
    test("Handle reset filter", () => {
        const instanse = new Controller(new Model(products), new View());
        const method = jest.spyOn(instanse.model, "resetFilters");
        instanse.handleResetFilter();
        expect(method).toBeCalled();
    });
    test("Handle sort", () => {
        const instanse = new Controller(new Model(products), new View());
        const method = jest.spyOn(instanse.model, "changeSort");
        instanse.handleSort("color");
        expect(method).toBeCalled();
        expect(method).toBeCalledWith("color", expect.anything());
    });
    test("Handle search", () => {
        const instanse = new Controller(new Model(products), new View());
        const method = jest.spyOn(instanse.model, "inputSearch");
        instanse.handleSearch("hello");
        expect(method).toBeCalled();
        expect(method).toBeCalledWith("hello", expect.anything());
    });
});

describe("Init app", () => {
    test("Start app", () => {
        const instanse = new Controller(new Model(products), new View());
        const addToCardEvent = jest.spyOn(instanse.view, "addToCardEvent");
        const removeFromCardEvent = jest.spyOn(instanse.view, "removeFromCardEvent");
        const filterEvent = jest.spyOn(instanse.view, "filterEvent");
        const resetFilterEvent = jest.spyOn(instanse.view, "resetFilterEvent");
        const searchEvent = jest.spyOn(instanse.view, "searchEvent");
        const sortEvent = jest.spyOn(instanse.view, "sortEvent");
        const render = jest.spyOn(instanse, "render");
        const start = jest.spyOn(instanse, "start");
        instanse.start();
        expect(start).toBeCalled();
        expect(addToCardEvent).toBeCalledWith(expect.anything());
        expect(removeFromCardEvent).toBeCalledWith(expect.anything());
        expect(filterEvent).toBeCalledWith(expect.anything());
        expect(resetFilterEvent).toBeCalledWith(expect.anything());
        expect(searchEvent).toBeCalledWith(expect.anything());
        expect(sortEvent).toBeCalledWith(expect.anything());
        expect(render).toBeCalled();
    });
});

describe("_Get data", () => {
    test("Get card", () => {
        const instanse = new Controller(new Model(products), new View());
        const method = jest.spyOn(instanse.model, "getCard");
        instanse._getCard();
        expect(method).toBeCalled();
    });
    test("Get sort", () => {
        const instanse = new Controller(new Model(products), new View());
        const method = jest.spyOn(instanse.model, "getSort");
        instanse._getSort();
        expect(method).toBeCalled();
    });
    test("Get products", () => {
        const instanse = new Controller(new Model(products), new View());
        const method = jest.spyOn(instanse.model, "getProducts");
        instanse._getProducts();
        expect(method).toBeCalled();
    });
    test("Get filters", () => {
        const instanse = new Controller(new Model(products), new View());
        const method = jest.spyOn(instanse.model, "getFilters");
        instanse._getFilters();
        expect(method).toBeCalled();
    });
});
