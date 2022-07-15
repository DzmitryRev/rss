import { ProductType } from "../data/products";

export function getProductTemplate(product: ProductType): string {
    return `
    <div class="product">
        <div class="product__image-container">
            <img
                class="product__image"
                src="${product.image}"
                alt="${product.title}"
            />
        </div>
        <div class="product__description">
            <span class="product__title">${product.title}</span>
            <p>Год: <span class="product__year">${product.year}</span></p>
            <p>Цвет: <span class="product__color">${product.color}</span></p>
        </div>
        <div class="product__footer">
            <span class="product__price">
            ${product.price}$</span>
            <button class="button button-add-to-card"
                    data-id='${product.id}'
                    >В корзину</button>
            <button class="button button-remove-from-card"
                    data-id='${product.id}'
                    >Убрать из корзины</button>
        </div>
    </div>
`;
}
