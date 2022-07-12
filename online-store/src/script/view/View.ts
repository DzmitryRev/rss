import { ProductType } from "../../data/products";

export interface IView {
    productsRootElement: HTMLDivElement | null;
    cardCountRootElement: HTMLDivElement | null;
    createElement(tag: string, className?: string): HTMLElement;
    displayProducts(products: ProductType[], card: ProductType[]): void;
    displayCard(card: ProductType[]): void;
    addToCardEvent(handler: (id: string) => void): void;
    removeFromCardEvent(handler: (id: string) => void): void;
    render(products: ProductType[], card: ProductType[]): void;
    renderProductFooter(productId: string): void;
}

export class View {
    productsRootElement: HTMLDivElement | null;
    cardCountRootElement: HTMLDivElement | null;
    constructor() {
        this.productsRootElement = document.querySelector("#products-root-elem");
        this.cardCountRootElement = document.querySelector("#card-count-root-elem");
    }

    createElement(tag: string, className?: string): HTMLElement {
        const el: HTMLElement = document.createElement(tag);
        if (className) {
            el.classList.add(className);
        }
        return el;
    }

    displayCard(card: ProductType[]): void {
        if (this.cardCountRootElement) {
            this.cardCountRootElement.innerText = (card.length as unknown) as string;
        }
    }

    displayProducts(products: ProductType[], card: ProductType[]): void {
        if (this.productsRootElement) this.productsRootElement.innerHTML = "";
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
            this.productsRootElement?.insertAdjacentHTML("beforeend", template);
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
        this.productsRootElement?.addEventListener("click", (e) => {
            const target = <HTMLElement>e.target;
            if (target?.classList.contains("button-add-to-card")) {
                const id = target.getAttribute("product-id");
                if (id) handler(id);
            }
        });
    }
    removeFromCardEvent(handler: (id: string) => void): void {
        this.productsRootElement?.addEventListener("click", (e) => {
            const target = <HTMLElement>e.target;
            if (target?.classList.contains("button-remove-from-card")) {
                const id = target.getAttribute("product-id");
                if (id) handler(id);
            }
        });
    }
}
