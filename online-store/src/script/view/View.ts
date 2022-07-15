import { ProductType } from "../../data/products";
import { FiltersType } from "../model/Model";
import { getFilterBlockTemplate, getProductTemplate } from "../Template";

export interface IView {
    productsRootElement: HTMLElement;
    cardCountRootElement: HTMLDivElement | null;
    settingsRootElement: HTMLElement;
    // events
    addToCardEvent(handler: (id: string) => void): void;
    removeFromCardEvent(handler: (id: string) => void): void;
    filterEvent(handler: (field: string, value: string) => void): void;
    // render
    renderCard(card: ProductType[]): void;
    renderProductButton(products: ProductType[], card: ProductType[]): void;
    renderSettings(products: ProductType[], filters: FiltersType): void;
    renderProducts(products: ProductType[]): void;
}

export class View {
    productsRootElement: HTMLElement;
    cardCountRootElement: HTMLDivElement | null;
    settingsRootElement: HTMLElement;
    constructor() {
        this.productsRootElement = <HTMLElement>document.querySelector("#products-root-elem");
        this.cardCountRootElement = document.querySelector("#card-count-root-elem");
        this.settingsRootElement = <HTMLElement>document.querySelector("#settings-root-element");
    }

    // renders
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
    renderSettings(products: ProductType[], filters: FiltersType): void {
        this.settingsRootElement.innerHTML = "";
        const availableColors: string[] = [];
        const availableMemories: string[] = [];
        const availableManufacturers: string[] = [];
        const availableYears: string[] = [];
        products.forEach((item) => {
            if (!availableColors.includes(item.color)) {
                availableColors.push(item.color);
            }
            if (!availableMemories.includes((item.memory as unknown) as string)) {
                availableMemories.push((item.memory as unknown) as string);
            }
            if (!availableManufacturers.includes(item.manufacturer)) {
                availableManufacturers.push(item.manufacturer);
            }
            if (!availableYears.includes(item.year)) {
                availableYears.push(item.year);
            }
        });
        this.settingsRootElement.insertAdjacentElement(
            "beforeend",
            getFilterBlockTemplate(availableColors, "Color", filters.color)
        );
        this.settingsRootElement.insertAdjacentElement(
            "beforeend",
            getFilterBlockTemplate(availableManufacturers, "Manufacturer", filters.manufacturer)
        );
        this.settingsRootElement.insertAdjacentElement(
            "beforeend",
            getFilterBlockTemplate(
                availableMemories.sort((a, b) => parseInt(a) - parseInt(b)),
                "Memory",
                filters.memory
            )
        );
        this.settingsRootElement.insertAdjacentElement(
            "beforeend",
            getFilterBlockTemplate(
                availableYears.sort((a, b) => parseInt(a) - parseInt(b)),
                "Year",
                filters.year
            )
        );
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
            const priceSpan = buttonAddToCard.parentElement?.querySelector(".product__price");

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
        });
    }

    // events
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
            console.log(target);
            if (target?.classList.contains("filters-checkbox") && target?.dataset.field) {
                const a = target.parentElement?.querySelector("span")?.innerText;
                if (a) {
                    handler(target?.dataset.field, a);
                }
            }
        });
    }
}
