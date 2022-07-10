import { ProductType } from "../../data/products";

export interface IView {
    container: HTMLElement | null;
    createElement(tag: string, className?: string): HTMLElement;
    buttonAddToCard: HTMLButtonElement[] | null;
    displayProducts(products: ProductType[], container: HTMLElement | null): void;
    addToCardEvent(handler: (id: string) => void): void;
    render(products: ProductType[]): void;
}

export class View {
    container: HTMLElement | null;
    buttonAddToCard: HTMLButtonElement[] | null;
    constructor() {
        this.container = document.querySelector(".content__products-container");
        this.buttonAddToCard = null;
    }

    createElement(tag: string, className?: string): HTMLElement {
        const el: HTMLElement = document.createElement(tag);
        if (className) {
            el.classList.add(className);
        }
        return el;
    }

    render(products: ProductType[]) {
        this.displayProducts(products, this.container);
    }

    displayProducts(products: ProductType[], container: HTMLElement | null): void {
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
            productPrice.innerText = product.price + "$";
            const button = <HTMLButtonElement>this.createElement("button", "button");
            button.innerText = "В корзину";
            button.setAttribute("id", (product.id as unknown) as string);
            this.buttonAddToCard?.push(button);

            productFooter.insertAdjacentElement("beforeend", productPrice);
            productFooter.insertAdjacentElement("beforeend", button);

            productContainer.insertAdjacentElement("beforeend", productImageContainer);
            productContainer.insertAdjacentElement("beforeend", productDescription);
            productContainer.insertAdjacentElement("beforeend", productFooter);

            container?.insertAdjacentElement("beforeend", productContainer);
        });
    }

    addToCardEvent(handler: (id: string) => void) {
        this.container?.addEventListener("click", (e) => {
            const target = <HTMLElement>e.target;
            if (target?.className === "button") {
                const id = target.getAttribute("id");
                if (id) handler(id);
            }
        });
    }
}
