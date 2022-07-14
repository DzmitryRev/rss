import { ProductType } from "../../../data/products";
import { ViewModule } from "./ViewModule";

export class ProductsModule extends ViewModule {
    constructor(root: HTMLElement | null) {
        super(root);
    }
    render(products: ProductType[]): void {
        if (this.root) this.root.innerHTML = "";
        products.forEach((product) => {
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
                        <span class="product__price">
                        ${product.price}$</span>
                        <button id="test2" 
                                class="button button-add-to-card"
                                product-id='${product.id}'
                                >В корзину</button>
                        <button id="test2" 
                                class="button button-remove-from-card"
                                product-id='${product.id}'
                                >Убрать из корзины</button>
                    </div>
                </div>
            `;
            this.root?.insertAdjacentHTML("beforeend", template);
        });
    }
}
