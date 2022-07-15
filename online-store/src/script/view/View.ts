import { ProductType } from "../../data/products";
import { getProductTemplate } from "../Template";
import { SettingsModule } from "./modules/SettingsModule";

export interface IView {
    productsRootElement: HTMLDivElement;
    cardCountRootElement: HTMLDivElement | null;
    settingsRootElement: HTMLDivElement | null;
    settingsBlock: SettingsModule;
    // root
    createElement(tag: string, className?: string): HTMLElement;
    // events
    addToCardEvent(handler: (id: string) => void): void;
    removeFromCardEvent(handler: (id: string) => void): void;
    filterEvent(handler: (field: string, value: string) => void): void;
    // colorFilterEvent(handler: (method: "ADD" | "DELETE", value: string) => void): void;
    // yearFilterEvent(handler: (method: "ADD" | "DELETE", value: string) => void): void;
    // manufacturerFilterEvent(handler: (method: "ADD" | "DELETE", value: string) => void): void;
    // memoryFilterEvent(handler: (method: "ADD" | "DELETE", value: string) => void): void;
    // renders
    // renderProducts(products: ProductType[], card: ProductType[]): void;
    renderCard(card: ProductType[]): void;
    renderProductButton(products: ProductType[], card: ProductType[]): void;

    renderProducts(products: ProductType[]): void;
}

export class View {
    productsRootElement: HTMLDivElement;
    cardCountRootElement: HTMLDivElement | null;
    settingsRootElement: HTMLDivElement | null;
    settingsBlock: SettingsModule;
    constructor() {
        this.productsRootElement = <HTMLDivElement>document.querySelector("#products-root-elem");
        this.cardCountRootElement = document.querySelector("#card-count-root-elem");
        this.settingsRootElement = document.querySelector("#settings-root-element");
        this.settingsBlock = new SettingsModule(this.settingsRootElement);
    }

    // tools
    createElement(tag: string, className?: string): HTMLElement {
        const el: HTMLElement = document.createElement(tag);
        if (className) {
            el.classList.add(className);
        }
        return el;
    }

    // renders
    renderProducts(products: ProductType[]) {
        this.productsRootElement.innerHTML = "";
        products.forEach((product) => {
            const template = getProductTemplate(product);
            this.productsRootElement.insertAdjacentHTML("beforeend", template);
        });
    }
    renderSettings() {
        console.log("aaa");
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
    // finish
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
}
