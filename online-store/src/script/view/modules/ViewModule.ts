import { ProductType } from "../../../data/products";

export interface IViewModule {
    createElement(tag: string, className?: string): HTMLElement;
    root: HTMLElement | null;
    render(products: ProductType[]): void;
}

export class ViewModule implements IViewModule {
    root: HTMLElement | null;
    constructor(root: HTMLElement | null) {
        this.root = root;
    }
    createElement(tag: string, className?: string): HTMLElement {
        const el: HTMLElement = document.createElement(tag);
        if (className) {
            el.classList.add(className);
        }
        return el;
    }
    render(products: ProductType[]): void {
        console.log("hi");
        // implement your method
    }
}
