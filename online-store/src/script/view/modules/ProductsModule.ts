import { ProductType } from "../../../data/products";
import { getProductTemplate } from "../../Template";
import { ViewModule } from "./ViewModule";

export class ProductsModule extends ViewModule {
    constructor(root: HTMLElement | null) {
        super(root);
    }
    render(products: ProductType[]): void {
        if (this.root) this.root.innerHTML = "";
        products.forEach((product) => {
            const template = getProductTemplate(product);
            this.root?.insertAdjacentHTML("beforeend", template);
        });
    }
}
