import { ProductType } from "../../data/types";
import { SortType, SortValueType } from "../model/types";

export class Template {
    createProduct(product: ProductType): string {
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
                    <p>year: <span class="product__year">${product.year}</span></p>
                    <p>color: <span class="product__color">${product.color}</span></p>
                    <p>memory: <span class="product__color">${product.memory} Гб</span></p>
                    <p>quantity: <span class="product__quantity">${product.quantity}</span></p>
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
    createFilterField(value: string, field: string, checked: boolean): string {
        return `
        <div>
            <input type="checkbox" data-field="${field}" class="filters-checkbox" ${
            checked ? "checked" : ""
        } />
            <span>${value}</span>
        </div>
    `;
    }
    createFiltersContainer(values: string[], title: string, filter: string[]): HTMLDivElement {
        const container = document.createElement("div");
        const heading = document.createElement("h3");
        heading.innerText = title;
        container.insertAdjacentElement("beforeend", heading);
        values.forEach((value) => {
            const isChecked = filter.includes(value);
            const template = this.createFilterField(value, title.toLowerCase(), isChecked);
            container.insertAdjacentHTML("beforeend", template);
        });
        return container;
    }
    createSearch(): HTMLDivElement {
        const heading = document.createElement("h3");
        heading.innerText = "search";
        const input = document.createElement("input");
        input.classList.add("input-text");
        input.id = "search";
        input.autocomplete = "off";
        const container = document.createElement("div");
        container.insertAdjacentElement("beforeend", heading);
        container.insertAdjacentElement("beforeend", input);
        return container;
    }
    createSort(sort: SortValueType, currentSort: SortType): HTMLDivElement {
        const container = document.createElement("div");
        const elem = document.createElement("span");
        elem.innerText = sort;
        elem.dataset.sort = sort;
        const arrow = document.createElement("div");
        if (sort === currentSort.value && sort !== "default") {
            arrow.classList.add("arrow");
            if (currentSort.fromSmaller) {
                arrow.classList.add("up");
            } else {
                arrow.classList.add("down");
            }
        } else {
            arrow.classList.add("display-none");
        }
        container.insertAdjacentElement("beforeend", elem);
        container.insertAdjacentElement("beforeend", arrow);
        return container;
    }
}
