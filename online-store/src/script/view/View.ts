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
            const productEl = `
            <div class="product">
                <div class="product__image-container">
                    <img
                        class="product__image"
                        src="${product.image}"
                        alt=""
                    />
                </div>
                <div class="product__description">
                    <span class="product__manufacturer">${product.manufacturer}</span>
                    <span class="product__title">${product.title}</span>
                    <p>
                        Год: <span class="product__year">${product.year}</span>
                    </p>
                    <p>
                        Цвет: <span class="product__color">${product.color}</span>
                    </p>
                </div>
                <div class="product__footer">
                    <span class="product__price">${product.price}</span>
                    <button id="test2" class="button">
                        В корзину
                    </button>
                </div>
            </div>
            `;
            this.container?.insertAdjacentHTML("beforeend", productEl);
        });
    }
}
