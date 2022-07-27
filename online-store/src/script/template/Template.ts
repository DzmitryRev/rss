import { ProductType } from "../../data/types";
import { SortType, SortValueType } from "../model/types";

export class Template {
    createApp() {
        const template = `
            <header class="header">
                <div class="container">
                    <div class="header__flex">
                        <div class="header__logo">
                            <h1 id="tet">Revchenko store</h1>
                        </div>
                        <div class="header__card">
                            <svg height="30" width="30">
                                <use
                                    class="header__card-icon"
                                    xlink:href="./assets/card-icon.svg#Layer_1"
                                ></use>
                            </svg>
                            <div id="card-count-root-elem" class="header__card-count"></div>
                        </div>
                    </div>
                </div>
            </header>
            <main class="content">
                <div class="container">
                    <div class="content__filter-button-container">
                        <button id="open-filter-button" class="content__filter-button button">
                            Фильтры
                        </button>
                    </div>
                    <div class="content__container">
                        
                        <div id="settings-root-element" class="content__settings-container">
                            <div id="settings-search-container"></div>
                            <div id="settings-checkbox-container"></div>
                            <div id="settings-range-container"></div>
                            <div id="settings-sort-container"></div>
                            <button id="reset" class="button">reset filters</button>
                            
                        </div>
                        <div id="products-root-elem" class="content__products-container"></div>
                    </div>
                </div>
            </main>
        `;
        return template;
    }
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
    createFilter(value: string, field: string, checked: boolean): string {
        return `
        <div>
            <input type="checkbox" data-field="${field}" class="filters-checkbox"  ${
            checked ? "checked" : ""
        } />
            <span>${value}</span>
        </div>
    `;
    }
    createFilterBlock(values: string[], title: string, filter: string[]): HTMLDivElement {
        const container = document.createElement("div");
        const heading = document.createElement("h3");
        heading.innerText = title;
        container.insertAdjacentElement("beforeend", heading);
        values.forEach((value) => {
            const isChecked = filter.includes(value);
            const template = this.createFilter(value, title.toLowerCase(), isChecked);
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
