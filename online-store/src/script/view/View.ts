import { ProductType } from "../../data/products";
import { CheckboxFiltersType } from "../model/Model";
import { getFilterBlockTemplate, getProductTemplate } from "../Template";

export interface IView {
    productsRootElement: HTMLElement;
    cardCountRootElement: HTMLElement;
    settingsRootElement: HTMLElement;
    // events
    addToCardEvent(handler: (id: string) => void): void;
    removeFromCardEvent(handler: (id: string) => void): void;
    filterEvent(handler: (field: string, value: string) => void): void;
    resetFilterEvent(handler: () => void): void;
    searchEvent(handler: (value: string) => void): void;
    // render
    renderCard(card: ProductType[]): void;
    renderProductButton(products: ProductType[], card: ProductType[]): void;
    renderSettings(products: ProductType[], filters: CheckboxFiltersType): void;
    renderProducts(products: ProductType[]): void;
}

export class View {
    productsRootElement: HTMLElement;
    cardCountRootElement: HTMLElement;
    settingsRootElement: HTMLElement;
    constructor() {
        this.productsRootElement = <HTMLElement>document.querySelector("#products-root-elem");
        this.cardCountRootElement = <HTMLElement>document.querySelector("#card-count-root-elem");
        this.settingsRootElement = <HTMLElement>document.querySelector("#settings-root-element");

        const openFiltersBtn = document.querySelector("#open-filter-button");

        // checking require elements on html
        if (!openFiltersBtn) {
            throw new Error("Please add element with id='open-filter-button'");
        }
        if (!this.productsRootElement) {
            throw new Error("Please add element with id='products-root-elem'");
        }
        if (!this.settingsRootElement) {
            throw new Error("Please add element with id='settings-root-element'");
        }
        if (!this.cardCountRootElement) {
            throw new Error("Please add element with id='card-count-root-elem'");
        }

        // global events
        openFiltersBtn.addEventListener("click", () => {
            this.settingsRootElement.classList.add("open");
        });
        document.addEventListener("click", (e) => {
            if (this.settingsRootElement.classList.contains("open")) {
                const node = <Node>e.target;
                if (
                    !this.settingsRootElement.contains(node) &&
                    node !== openFiltersBtn &&
                    node.nodeName !== "INPUT"
                ) {
                    this.settingsRootElement.classList.remove("open");
                }
            }
        });
    }

    // Renders
    renderProducts(products: ProductType[]) {
        if (!products.length) {
            this.productsRootElement.innerHTML = "No products found";
            return;
        }
        this.productsRootElement.innerHTML = "";
        products.forEach((product) => {
            const template = getProductTemplate(product);
            this.productsRootElement.insertAdjacentHTML("beforeend", template);
        });
    }
    renderSettings(products: ProductType[], filters: CheckboxFiltersType): void {
        this.settingsRootElement.innerHTML = "";
        const availableFilters: CheckboxFiltersType = <CheckboxFiltersType>(
            Object.create(filters, Object.getOwnPropertyDescriptors(filters))
        );
        for (const i in availableFilters) {
            const key = i as keyof typeof availableFilters;
            let availableFiltersField = availableFilters[key];
            availableFiltersField = [];
            products.forEach((product) => {
                if (key in product) {
                    if (!availableFiltersField.includes(product[key])) {
                        availableFiltersField.push(product[key]);
                    }
                }
            });
            this.settingsRootElement.insertAdjacentElement(
                "beforeend",
                getFilterBlockTemplate(availableFiltersField, String(key), filters[key])
            );
        }
    }
    renderCard(card: ProductType[]): void {
        if (card.length === 0) {
            this.cardCountRootElement?.classList.add("display-none");
        } else {
            this.cardCountRootElement?.classList.remove("display-none");
            if (this.cardCountRootElement) {
                this.cardCountRootElement.innerText = (card.length as unknown) as string;
            }
        }
    }
    renderProductButton(products: ProductType[], card: ProductType[]): void {
        products.forEach((product) => {
            const buttonAddToCard = <HTMLButtonElement>(
                document.querySelector(`.button-add-to-card[data-id='${product.id}']`)
            );
            const buttonRemoveFromCard = <HTMLButtonElement>(
                document.querySelector(`.button-remove-from-card[data-id='${product.id}']`)
            );
            const noAvailable = buttonAddToCard.parentElement?.querySelector(".no-available");
            const priceSpan = buttonAddToCard.parentElement?.querySelector(".product__price");
            if (product.quantity === 0) {
                noAvailable?.classList.remove("display-none");
                buttonAddToCard.classList.add("display-none");
                priceSpan?.classList.add("display-none");
                buttonRemoveFromCard.classList.add("display-none");
                return;
            } else {
                noAvailable?.classList.add("display-none");
                if (!card.find((productInCard) => productInCard.id === product.id)) {
                    buttonAddToCard.classList.remove("display-none");
                    priceSpan?.classList.remove("display-none");
                    buttonRemoveFromCard.classList.add("display-none");
                    return;
                } else {
                    buttonRemoveFromCard.classList.remove("display-none");
                    buttonAddToCard.classList.add("display-none");
                    priceSpan?.classList.add("display-none");
                }
            }
        });
    }

    // Events
    addToCardEvent(handler: (id: string) => void): void {
        this.productsRootElement?.addEventListener("click", (e) => {
            const target = <HTMLElement>e.target;
            if (target?.classList.contains("button-add-to-card")) {
                const id = target.dataset.id;
                if (id) handler(id);
            }
        });
    }
    removeFromCardEvent(handler: (id: string) => void): void {
        this.productsRootElement?.addEventListener("click", (e) => {
            const target = <HTMLElement>e.target;
            if (target?.classList.contains("button-remove-from-card")) {
                const id = target.dataset.id;
                if (id) handler(id);
            }
        });
    }
    filterEvent(handler: (field: string, value: string) => void) {
        this.settingsRootElement?.addEventListener("click", (e) => {
            const target = <HTMLInputElement>e.target;
            if (target?.classList.contains("filters-checkbox") && target?.dataset.field) {
                const a = target.parentElement?.querySelector("span")?.innerText;
                if (a) {
                    handler(target?.dataset.field, a);
                }
            }
        });
    }
    resetFilterEvent(handler: () => void) {
        document.addEventListener("click", (e) => {
            const target = <HTMLElement>e.target;
            if (target?.id === "reset") {
                handler();
            }
        });
    }
    searchEvent(handler: (value: string) => void) {
        document.addEventListener("input", (e) => {
            const target = <HTMLInputElement>e.target;
            if (target?.id === "search") {
                handler(target.value);
            }
        });
    }
}
