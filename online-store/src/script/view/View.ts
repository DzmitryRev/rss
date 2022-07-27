import { ProductType } from "../../data/products";
import { CheckboxFiltersType, SortType, SortValueType } from "../model/Model";
import { Template } from "../template/Template";

export interface IView {
    productsRootElement: HTMLElement;
    cardCountRootElement: HTMLElement;
    settingsRootElement: HTMLElement;
    settingsSearchElement: HTMLElement;
    settingsCheckboxElement: HTMLElement;
    settingsRangeElement: HTMLElement;
    settingsSortElement: HTMLElement;
    template: Template;
    // events
    addToCardEvent(handler: (id: string) => void): void;
    removeFromCardEvent(handler: (id: string) => void): void;
    filterEvent(handler: (field: string, value: string) => void): void;
    resetFilterEvent(handler: () => void): void;
    searchEvent(handler: (value: string) => void): void;
    sortEvent(handler: (value: SortValueType) => void): void;
    // render
    renderCard(card: ProductType[]): void;
    renderProductButton(products: ProductType[], card: ProductType[]): void;
    renderCheckboxFilters(products: ProductType[], filters: CheckboxFiltersType): void;
    renderProducts(products: ProductType[]): void;
    renderSearch(): void;
    renderSort(currentSort: SortType): void;
}

export class View {
    productsRootElement: HTMLElement;
    cardCountRootElement: HTMLElement;
    settingsRootElement: HTMLElement;
    settingsSearchElement: HTMLElement;
    settingsCheckboxElement: HTMLElement;
    settingsRangeElement: HTMLElement;
    settingsSortElement: HTMLElement;
    template: Template;
    // ranges: API[];
    constructor(root: HTMLElement) {
        // init App Template
        this.template = new Template();
        root.innerHTML = this.template.createApp();
        // Define require elems
        this.productsRootElement = <HTMLElement>document.querySelector("#products-root-elem");
        this.cardCountRootElement = <HTMLElement>document.querySelector("#card-count-root-elem");
        this.settingsRootElement = <HTMLElement>document.querySelector("#settings-root-element");
        this.settingsRangeElement = <HTMLElement>(
            document.querySelector("#settings-range-container")
        );
        this.settingsSearchElement = <HTMLElement>(
            document.querySelector("#settings-search-container")
        );
        this.settingsCheckboxElement = <HTMLElement>(
            document.querySelector("#settings-checkbox-container")
        );
        this.settingsSortElement = <HTMLElement>(
            (<HTMLDivElement>document.querySelector("#settings-sort-container"))
        );

        // add global events
        const openFiltersBtn = document.querySelector("#open-filter-button");
        openFiltersBtn?.addEventListener("click", (e) => {
            e.stopPropagation();
            this.settingsRootElement.classList.add("open");
            document.body.style.overflow = "hidden";
        });
        document.addEventListener("click", (e) => {
            if (this.settingsRootElement.classList.contains("open")) {
                const node = <Node>e.target;
                if (!this.settingsRootElement.contains(node) && node.nodeName !== "INPUT") {
                    this.settingsRootElement.classList.remove("open");
                    document.body.style.overflow = "auto";
                }
            }
        });
    }

    // Renders
    renderProducts(products: ProductType[]): void {
        if (!products.length) {
            this.productsRootElement.innerHTML = "No products found";
            return;
        }
        this.productsRootElement.innerHTML = "";
        products.forEach((product) => {
            const template = this.template.createProduct(product);
            this.productsRootElement.insertAdjacentHTML("beforeend", template);
        });
    }
    renderSearch(): void {
        this.settingsSearchElement.innerHTML = "";
        const searchContainer = this.template.createSearch();
        this.settingsSearchElement.insertAdjacentElement("beforeend", searchContainer);
        searchContainer.querySelector("input")?.focus();
    }
    renderSort(currentSort: SortType): void {
        this.settingsSortElement.innerHTML = "";
        const sorts: SortValueType[] = ["default", "price", "memory", "quantity"];
        sorts.forEach((sort) => {
            const elem = this.template.createSort(sort, currentSort);
            this.settingsSortElement?.insertAdjacentElement("beforeend", elem);
        });
    }
    renderCheckboxFilters(products: ProductType[], filters: CheckboxFiltersType): void {
        this.settingsCheckboxElement.innerHTML = "";
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
            this.settingsCheckboxElement.insertAdjacentElement(
                "beforeend",
                this.template.createFilterBlock(availableFiltersField, String(key), filters[key])
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
            if (this.settingsRootElement.classList.contains("open")) return;
            const target = <HTMLElement>e.target;
            if (target?.classList.contains("button-add-to-card")) {
                const id = target.dataset.id;
                if (id) handler(id);
            }
        });
    }
    removeFromCardEvent(handler: (id: string) => void): void {
        this.productsRootElement?.addEventListener("click", (e) => {
            if (this.settingsRootElement.classList.contains("open")) return;
            const target = <HTMLElement>e.target;
            if (target?.classList.contains("button-remove-from-card")) {
                const id = target.dataset.id;
                if (id) handler(id);
            }
        });
    }
    filterEvent(handler: (field: string, value: string) => void): void {
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
    resetFilterEvent(handler: () => void): void {
        document.addEventListener("click", (e) => {
            const target = <HTMLElement>e.target;
            if (target?.id === "reset") {
                handler();
            }
        });
    }
    searchEvent(handler: (value: string) => void): void {
        document.addEventListener("input", (e) => {
            const target = <HTMLInputElement>e.target;
            if (target?.id === "search") {
                handler(target.value);
            }
        });
    }
    sortEvent(handler: (value: "price" | "quantity" | "memory" | "default") => void): void {
        document.addEventListener("click", (e) => {
            const target = <HTMLSpanElement>e.target;
            if (target?.dataset.sort) {
                handler(<"price" | "quantity" | "memory" | "default">target?.dataset.sort);
            }
        });
    }
}
