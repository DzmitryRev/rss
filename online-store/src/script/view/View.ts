import { ProductType } from "../../data/products";
import { ProductsModule } from "./modules/ProductsModule";
import { SettingsModule } from "./modules/SettingsModule";

export interface IView {
    productsRootElement: HTMLDivElement | null;
    cardCountRootElement: HTMLDivElement | null;
    settingsRootElement: HTMLDivElement | null;
    settingsBlock: SettingsModule;
    productsBlock: ProductsModule;
    // root
    createElement(tag: string, className?: string): HTMLElement;
    // events
    addToCardEvent(handler: (id: string) => void): void;
    removeFromCardEvent(handler: (id: string) => void): void;
    filterEvent(param: string, handler: (method: "ADD" | "DELETE", value: string) => void);
    colorFilterEvent(handler: (method: "ADD" | "DELETE", value: string) => void): void;
    yearFilterEvent(handler: (method: "ADD" | "DELETE", value: string) => void): void;
    manufacturerFilterEvent(handler: (method: "ADD" | "DELETE", value: string) => void): void;
    memoryFilterEvent(handler: (method: "ADD" | "DELETE", value: string) => void): void;
    // renders
    // renderProducts(products: ProductType[], card: ProductType[]): void;
    renderCard(card: ProductType[]): void;
    renderProductFooter(products: ProductType[], card: ProductType[]): void;
}

export class View {
    productsRootElement: HTMLDivElement | null;
    cardCountRootElement: HTMLDivElement | null;
    settingsRootElement: HTMLDivElement | null;
    settingsBlock: SettingsModule;
    productsBlock: ProductsModule;
    constructor() {
        this.productsRootElement = document.querySelector("#products-root-elem");
        this.cardCountRootElement = document.querySelector("#card-count-root-elem");
        this.settingsRootElement = document.querySelector("#settings-root-element");
        this.settingsBlock = new SettingsModule(this.settingsRootElement);
        this.productsBlock = new ProductsModule(this.productsRootElement);
    }
    // finish
    createElement(tag: string, className?: string): HTMLElement {
        const el: HTMLElement = document.createElement(tag);
        if (className) {
            el.classList.add(className);
        }
        return el;
    }
    // TODO: add logic for displaing products in card
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

    // finish
    renderProductFooter(products: ProductType[], card: ProductType[]): void {
        products.forEach((product) => {
            const buttonAddToCard = <HTMLButtonElement>(
                document.querySelector(`.button-add-to-card[product-id='${product.id}']`)
            );
            const buttonRemoveFromCard = <HTMLButtonElement>(
                document.querySelector(`.button-remove-from-card[product-id='${product.id}']`)
            );
            const priceSpan = buttonAddToCard.parentElement?.querySelector(".product__price");

            if (!card.find((productInCard) => productInCard.id === product.id)) {
                buttonAddToCard.classList.remove("display-none");
                priceSpan?.classList.remove("display-none");
                //
                buttonRemoveFromCard.classList.add("display-none");
                return;
            } else {
                buttonRemoveFromCard.classList.remove("display-none");
                //
                buttonAddToCard.classList.add("display-none");
                priceSpan?.classList.add("display-none");
            }
        });
    }
    // finish
    addToCardEvent(handler: (id: string) => void): void {
        this.productsRootElement?.addEventListener("click", (e) => {
            const target = <HTMLElement>e.target;
            if (target?.classList.contains("button-add-to-card")) {
                const id = target.getAttribute("product-id");
                if (id) handler(id);
            }
        });
    }
    // finish
    removeFromCardEvent(handler: (id: string) => void): void {
        this.productsRootElement?.addEventListener("click", (e) => {
            const target = <HTMLElement>e.target;

            if (target?.classList.contains("button-remove-from-card")) {
                console.log(target);
                const id = target.getAttribute("product-id");
                if (id) handler(id);
            }
        });
    }
    filterEvent(param: string, handler: (method: "ADD" | "DELETE", value: string) => void) {
        this.settingsRootElement?.addEventListener("click", (e) => {
            const target = <HTMLInputElement>e.target;
            if (target?.classList.contains("check") && target?.getAttribute("param") === param) {
                const a = target.parentElement?.querySelector("span")?.innerText;
                console.log(target.parentElement, "aaaaaaaaaaaaaaaaaaaaaaaaaaa");
                const meth = target.checked ? "ADD" : "DELETE";
                if (a) {
                    handler(meth, a);
                }
            }
        });
    }
    colorFilterEvent(handler: (method: "ADD" | "DELETE", value: string) => void) {
        this.filterEvent("Color", handler);
    }
    yearFilterEvent(handler: (method: "ADD" | "DELETE", value: string) => void) {
        this.filterEvent("Year", handler);
    }
    // manufacturerFilterEvent(handler: (method: "ADD" | "DELETE", value: string) => void) {
    //     this.filterEvent("Производитель", handler);
    // }
    // memoryFilterEvent(handler: (method: "ADD" | "DELETE", value: string) => void) {
    //     this.filterEvent("Память", handler);
    // }
}
