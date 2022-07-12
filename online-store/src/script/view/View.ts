import { ProductType } from "../../data/products";

export interface IView {
    container: HTMLElement | null;
    createElement(tag: string, className?: string): HTMLElement;
    displayProducts(products: ProductType[], card: ProductType[]): void;
    displayCard(card: ProductType[]): void;
    addToCardEvent(handler: (id: string) => void): void;
    removeFromCardEvent(handler: (id: string) => void): void;
    render(products: ProductType[], card: ProductType[]): void;
    renderProductFooter(productId: string): void;
}

export class View {
    container: HTMLElement | null;
    cardCount: HTMLElement | null;
    constructor() {
        this.container = document.querySelector(".content__products-container");
        this.cardCount = document.querySelector("#card-count");
    }

    createElement(tag: string, className?: string): HTMLElement {
        const el: HTMLElement = document.createElement(tag);
        if (className) {
            el.classList.add(className);
        }
        return el;
    }

    render(products: ProductType[], card: ProductType[]): void {
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
            const isInCard = card.find((item) => item.id === product.id);
            const template = `
                <div class="product">
                    <div class="product__image-container">
                        <img
                            class="product__image"
                            src="${product.image}"
                            alt="${product.title}"
                        />
                    </div>
                    <div class="product__description">
                        <span class="product__manufacturer">${product.manufacturer}</span>
                        <span class="product__title">${product.title}</span>
                        <p>Год: <span class="product__year">${product.year}</span></p>
                        <p>Цвет: <span class="product__color">${product.color}</span></p>
                    </div>
                    <div class="product__footer">
                        <span class="product__price ${isInCard ? "display-none" : ""}">
                        ${product.price}$</span>
                        <button id="test2" 
                                class="button button-add-to-card ${isInCard ? "display-none" : ""}"
                                product-id='${product.id}'
                                >В корзину</button>
                        <button id="test2" 
                                class="button button-remove-from-card ${
                                    isInCard ? "" : "display-none"
                                }"
                                product-id='${product.id}'
                                >В корзину</button>
                    </div>
                </div>
            `;
            this.container?.insertAdjacentHTML("beforeend", template);
        });
    }

    renderProductFooter(productId: string) {
        console.log("Eee");
        const buttonAddToCard = <HTMLButtonElement>(
            document.querySelector(`.button-add-to-card[product-id='${productId}']`)
        );
        console.log(buttonAddToCard);
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
