import { ProductType } from "../../data/products";

export interface IView {
    container: HTMLElement | null;
    createElement(tag: string, className?: string): HTMLElement;
    displayProducts(products: ProductType[]): void;
}

export class View {
    container: HTMLElement | null;
    constructor() {
        this.container = document.querySelector(".content__products-container");
    }
    createElement(tag: string, className?: string): HTMLElement {
        const el: HTMLElement = document.createElement(tag);
        if (className) {
            el.classList.add(className);
        }
        return el;
    }
    displayProducts(products: ProductType[]): void {
        products.forEach((product) => {
            const productContainer = <HTMLDivElement>this.createElement("div", "product");
            const productImageContainer = <HTMLDivElement>(
                this.createElement("div", "product__image-container")
            );
            const productImage = <HTMLImageElement>this.createElement("img", "product__image");
            productImage.src = product.image;
            productImageContainer.insertAdjacentElement("beforeend", productImage);
            const productDescription = <HTMLDivElement>(
                this.createElement("div", "product__description")
            );
            const productManufacturer = <HTMLSpanElement>(
                this.createElement("span", "product__manufacturer")
            );
            productManufacturer.innerText = product.manufacturer + " ";
            const productTitle = <HTMLSpanElement>this.createElement("span", "product__title");
            productTitle.innerText = product.title;
            const productYearContainer = <HTMLParagraphElement>this.createElement("p");
            const productYear = <HTMLSpanElement>this.createElement("span", "product__year");
            productYear.innerText = "Год: " + product.year;
            productYearContainer.insertAdjacentElement("beforeend", productYear);

            const productColorContainer = <HTMLParagraphElement>this.createElement("p");
            const productColor = <HTMLSpanElement>this.createElement("span", "product__color");
            productColor.innerText = "Цвет: " + product.color;
            productColorContainer.insertAdjacentElement("beforeend", productColor);

            productDescription.insertAdjacentElement("beforeend", productManufacturer);
            productDescription.insertAdjacentElement("beforeend", productTitle);
            productDescription.insertAdjacentElement("beforeend", productYearContainer);
            productDescription.insertAdjacentElement("beforeend", productColorContainer);

            const productFooter = <HTMLDivElement>this.createElement("div", "product__footer");
            const productPrice = <HTMLSpanElement>this.createElement("span", "product__price");
            productPrice.innerText = product.price  + "$";
            const button = <HTMLButtonElement>this.createElement("button", "button");
            button.innerText = "В корзину";
            productFooter.insertAdjacentElement("beforeend", productPrice);
            productFooter.insertAdjacentElement("beforeend", button);

            productContainer.insertAdjacentElement("beforeend", productImageContainer);
            productContainer.insertAdjacentElement("beforeend", productDescription);
            productContainer.insertAdjacentElement("beforeend", productFooter);

            this.container?.insertAdjacentElement("beforeend", productContainer);
        });
    }
}
