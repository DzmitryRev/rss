import { ProductType } from "../../../data/products";
import { ViewModule } from "./ViewModule";

export class ProductsModule extends ViewModule {
    constructor(root: HTMLElement | null) {
        super(root);
    }
    render(products: ProductType[], card?: ProductType[]): void {
        if (!card) return;
        if (this.root) this.root.innerHTML = "";
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
                                >Убрать из корзины</button>
                    </div>
                </div>
            `;
            this.root?.insertAdjacentHTML("beforeend", template);
        });
    }
}
