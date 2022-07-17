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
            <p>Кол-во на складе: <span class="product__quantity">${product.quantity}</span></p>
        </div>
        <div class="product__footer">
            <div class="no-available">Нет на складе</div>
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

export function getFilterTemplate(value: string, field: string, checked: boolean): string {
    return `
    <div>
        <input type="checkbox" data-field="${field}" class="filters-checkbox"  ${
        checked ? "checked" : ""
    } />
        <span>${value}</span>
    </div>
`;
}

export function getFilterBlockTemplate(
    values: string[],
    title: string,
    filter: string[]
): HTMLDivElement {
    const container = document.createElement("div");
    const heading = document.createElement("h3");
    heading.innerText = title;
    container.insertAdjacentElement("beforeend", heading);
    values.forEach((value) => {
        const isChecked = filter.includes(value);
        const template = getFilterTemplate(value, title.toLowerCase(), isChecked);
        container.insertAdjacentHTML("beforeend", template);
    });
    return container;
}
