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
    renderProductFooter(productId: string): void;
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
            const buttonAddToCard = <HTMLButtonElement>this.createElement("button", "button");
            buttonAddToCard.innerText = "В корзину";
            const buttonRemoveFromCard = <HTMLButtonElement>this.createElement("button", "button");
            buttonRemoveFromCard.innerText = "Удалить из корзины";
            buttonRemoveFromCard.classList.add("button-remove-from-card");
            buttonAddToCard.classList.add("button-add-to-card");

            console.log(card.find((item) => item.id === product.id));
            if (card.find((item) => item.id === product.id)) {
                buttonAddToCard.classList.add("display-none");
                productPrice.classList.add("display-none");
            } else {
                buttonRemoveFromCard.classList.add("display-none");
                productPrice.classList.remove("display-none");
            }
            buttonAddToCard.setAttribute("product-id", (product.id as unknown) as string);
            buttonRemoveFromCard.setAttribute("product-id", (product.id as unknown) as string);
            // this.buttonAddToCard?.push(button);

            productFooter.insertAdjacentElement("beforeend", productPrice);
            productFooter.insertAdjacentElement("beforeend", buttonAddToCard);
            productFooter.insertAdjacentElement("beforeend", buttonRemoveFromCard);

            productContainer.insertAdjacentElement("beforeend", productImageContainer);
            productContainer.insertAdjacentElement("beforeend", productDescription);
            productContainer.insertAdjacentElement("beforeend", productFooter);

            this.container?.insertAdjacentElement("beforeend", productContainer);
        });
    }

    renderProductFooter(productId: string) {
        const buttonAddToCard = <HTMLButtonElement>(
            document.querySelector(`.button-add-to-card[product-id='${productId}']`)
        );
        const buttonRemoveFromCard = <HTMLButtonElement>(
            document.querySelector(`.button-remove-from-card[product-id='${productId}']`)
        );
        const priceSpan = buttonAddToCard.parentElement?.querySelector(".product__price");
        if (buttonAddToCard.classList.contains("display-none")) {
            buttonAddToCard.classList.remove("display-none");
            buttonRemoveFromCard.classList.add("display-none");
            priceSpan?.classList.remove("display-none");
        } else {
            buttonAddToCard.classList.add("display-none");
            buttonRemoveFromCard.classList.remove("display-none");
            priceSpan?.classList.add("display-none");
        }
    }

    addToCardEvent(handler: (id: string) => void): void {
        this.container?.addEventListener("click", (e) => {
            const target = <HTMLElement>e.target;
            if (target?.classList.contains("button-add-to-card")) {
                const id = target.getAttribute("product-id");
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
