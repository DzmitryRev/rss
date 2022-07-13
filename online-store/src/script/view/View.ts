import { ProductType } from "../../data/products";

export interface IView {
    productsRootElement: HTMLDivElement | null;
    cardCountRootElement: HTMLDivElement | null;
    settingsRootElement: HTMLDivElement | null;
    // root
    createElement(tag: string, className?: string): HTMLElement;
    // events
    addToCardEvent(handler: (id: string) => void): void;
    removeFromCardEvent(handler: (id: string) => void): void;
    // checkboxEvent(handler: (method: "ADD" | "DELETE", key: string, value: string) => void): void;
    addColorEvent(handler: (value: string) => void): void;
    colorFilterEvent(handler: (method: "ADD" | "DELETE", value: string) => void): void;
    // renders
    renderProducts(products: ProductType[], card: ProductType[]): void;
    renderSettings(products: ProductType[]): void;
    renderCard(card: ProductType[]): void;
    renderProductFooter(productId: string): void;
}

export class View {
    productsRootElement: HTMLDivElement | null;
    cardCountRootElement: HTMLDivElement | null;
    settingsRootElement: HTMLDivElement | null;
    constructor() {
        this.productsRootElement = document.querySelector("#products-root-elem");
        this.cardCountRootElement = document.querySelector("#card-count-root-elem");
        this.settingsRootElement = document.querySelector("#settings-root-element");
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
    renderSettings(products: ProductType[]) {
        const testColors: string[] = [];
        const testMemor: string[] = [];
        const testManuf: string[] = [];
        products.forEach((item) => {
            if (!testColors.includes(item.color)) {
                console.log(item);
                testColors.push(item.color);
            }
            if (!testMemor.includes((item.memory as unknown) as string)) {
                testMemor.push(item.memory as unknown as string);
            }
            if (!testManuf.includes(item.manufacturer)) {
                testManuf.push(item.manufacturer);
            }
        });
        testColors.forEach((color) => {
            const chekbox = <HTMLInputElement>this.createElement("input");
            chekbox.classList.add("check");
            chekbox.type = "checkbox";
            const span = <HTMLSpanElement>this.createElement("span");
            span.innerText = color;
            const container = <HTMLDivElement>this.createElement("div");
            container.insertAdjacentElement("beforeend", chekbox);
            container.insertAdjacentElement("beforeend", span);
            this.settingsRootElement?.insertAdjacentElement("beforeend", container);
        });
        testManuf.forEach((color) => {
            const chekbox = <HTMLInputElement>this.createElement("input");
            chekbox.classList.add("check");
            chekbox.type = "checkbox";
            const span = <HTMLSpanElement>this.createElement("span");
            span.innerText = color;
            const container = <HTMLDivElement>this.createElement("div");
            container.insertAdjacentElement("beforeend", chekbox);
            container.insertAdjacentElement("beforeend", span);
            this.settingsRootElement?.insertAdjacentElement("beforeend", container);
        });
        testMemor.forEach((color) => {
            const chekbox = <HTMLInputElement>this.createElement("input");
            chekbox.classList.add("check");
            chekbox.type = "checkbox";
            const span = <HTMLSpanElement>this.createElement("span");
            span.innerText = (color as unknown) as string;
            const container = <HTMLDivElement>this.createElement("div");
            container.insertAdjacentElement("beforeend", chekbox);
            container.insertAdjacentElement("beforeend", span);
            this.settingsRootElement?.insertAdjacentElement("beforeend", container);
        });
    }
    // finish
    renderProducts(products: ProductType[], card: ProductType[]): void {
        if (this.productsRootElement) this.productsRootElement.innerHTML = "";
        products.forEach((product) => {
            const isInCard = card.find((item) => item.id === product.id);
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
                        <span class="product__price ${isInCard ? "display-none" : ""}">
                        ${product.price}$</span>
                        <button id="test2" 
                                class="button button-add-to-card ${isInCard ? "display-none" : ""}"
                                product-id='${product.id}'
                                >В корзину</button>
                        <button id="test2" 
                                class="button button-remove-from-card ${
                                    isInCard ? "" : "display-none"
                                }"
                                product-id='${product.id}'
                                >Убрать из корзины</button>
                    </div>
                </div>
            `;
            this.productsRootElement?.insertAdjacentHTML("beforeend", template);
        });
    }
    // finish
    renderProductFooter(productId: string): void {
        const buttonAddToCard = <HTMLButtonElement>(
            document.querySelector(`.button-add-to-card[product-id='${productId}']`)
        );
        const buttonRemoveFromCard = <HTMLButtonElement>(
            document.querySelector(`.button-remove-from-card[product-id='${productId}']`)
        );
        const priceSpan = buttonAddToCard.parentElement?.querySelector(".product__price");
        if (buttonAddToCard.classList.contains("display-none")) {
            buttonAddToCard.classList.remove("display-none");
            buttonRemoveFromCard.classList.add("display-none");
            priceSpan?.classList.remove("display-none");
        } else {
            buttonAddToCard.classList.add("display-none");
            buttonRemoveFromCard.classList.remove("display-none");
            priceSpan?.classList.add("display-none");
        }
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
                const id = target.getAttribute("product-id");
                if (id) handler(id);
            }
        });
    }
    addColorEvent(handler: (value: string) => void) {
        this.settingsRootElement?.addEventListener("click", (e) => {
            const target = <HTMLInputElement>e.target;
            if (target?.classList.contains("check")) {
                const a = target.parentElement?.querySelector("span")?.innerText;
                const meth = target.checked ? "ADD" : "DELETE";
                if (a && meth === "ADD") {
                    handler(a);
                }
            }
        });
    }
    colorFilterEvent(handler: (method: "ADD" | "DELETE", value: string) => void) {
        this.settingsRootElement?.addEventListener("click", (e) => {
            const target = <HTMLInputElement>e.target;
            if (target?.classList.contains("check")) {
                const a = target.parentElement?.querySelector("span")?.innerText;
                const meth = target.checked ? "ADD" : "DELETE";
                if (a) {
                    handler(meth, a);
                }
            }
        });
    }
}
