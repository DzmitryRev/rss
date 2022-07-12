import { ProductType } from "../../data/products";

export interface IView {
    container: HTMLElement | null;
    createElement(tag: string, className?: string): HTMLElement;
    buttonAddToCard: HTMLButtonElement[] | null;
    displayProducts(products: ProductType[], card: ProductType[]): void;
    displayCard(card: ProductType[]): void;
    addToCardEvent(handler: (id: string) => void): void;
    removeFromCardEvent(handler: (id: string) => void): void;
    render(products: ProductType[], card: ProductType[]): void;
}

export class View {
    container: HTMLElement | null;
    buttonAddToCard: HTMLButtonElement[] | null;
    cardCount: HTMLElement | null;
    constructor() {
        this.container = document.querySelector(".content__products-container");
        this.cardCount = document.querySelector("#card-count");
        this.buttonAddToCard = null;
    }

    createElement(tag: string, className?: string): HTMLElement {
        const el: HTMLElement = document.createElement(tag);
        if (className) {
            el.classList.add(className);
        }
        return el;
    }

    render(products: ProductType[], card: ProductType[]): void {
        console.log("render");
        this.displayProducts(products, card);
        this.displayCard(card);
    }

    displayCard(card: ProductType[]): void {
        console.log("render card");
        if (this.cardCount) {
            this.cardCount.innerText = (card.length as unknown) as string;
        }
    }

    displayProducts(products: ProductType[], card: ProductType[]): void {
        console.log("render products");
        if (this.container) this.container.innerHTML = "";
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
            if (card.find((item) => item.id === product.id)) {
                button.classList.add("button-remove-from-card");
                button.innerText = "Удалить из корзины";
            } else {
                button.classList.add("button-add-to-card");
                button.innerText = "В корзину";
            }

            button.setAttribute("product-id", (product.id as unknown) as string);
            this.buttonAddToCard?.push(button);

            productFooter.insertAdjacentElement("beforeend", productPrice);
            productFooter.insertAdjacentElement("beforeend", button);

            productContainer.insertAdjacentElement("beforeend", productImageContainer);
            productContainer.insertAdjacentElement("beforeend", productDescription);
            productContainer.insertAdjacentElement("beforeend", productFooter);

            this.container?.insertAdjacentElement("beforeend", productContainer);
        });
    }

    // renderProductFooter(productId) {
    //     // document
    // }

    addToCardEvent(handler: (id: string) => void): void {
        this.container?.addEventListener("click", (e) => {
            const target = <HTMLElement>e.target;
            if (target?.classList.contains("button-add-to-card")) {
                const id = target.getAttribute("id");
                if (id) handler(id);
            }
        });
    }
    removeFromCardEvent(handler: (id: string) => void): void {
        this.container?.addEventListener("click", (e) => {
            const target = <HTMLElement>e.target;
            if (target?.classList.contains("button-remove-from-card")) {
                const id = target.getAttribute("product-id");
                if (id) handler(id);
            }
        });
    }
}
