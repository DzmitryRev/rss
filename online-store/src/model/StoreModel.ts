import { products, ProductType } from "../data/products.js";

// interface IStoreModel {}

export class StoreModel {
    products: ProductType[];
    constructor() {
        this.products = products;
    }
}
