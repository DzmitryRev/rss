import { ProductType } from "../../../data/products";
import { IViewModule, ViewModule } from "./ViewModule";

// Your extend module interface
interface ISettingsModule extends IViewModule {
    createFilterBlock(values: string[], headin: string, root: HTMLElement): void;
}
export class SettingsModule extends ViewModule implements ISettingsModule {
    constructor(root: HTMLElement | null) {
        super(root);
    }
    render(products: ProductType[]): void {
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
        this.createFilterBlock(availableColors, "Color");
        this.createFilterBlock(availableMemories, "Memory");
        this.createFilterBlock(availableManufacturers, "Manufacturer");
        this.createFilterBlock(availableYears, "Year");
    }
    createFilterBlock(values: string[], headin: string): void {
        const container = <HTMLDivElement>this.createElement("div");
        const heading = <HTMLHeadingElement>this.createElement("h3");
        heading.innerText = headin;
        container.insertAdjacentElement("beforeend", heading);
        values.forEach((color) => {
            const checkboxContainer = <HTMLDivElement>this.createElement("div");
            const chekbox = <HTMLInputElement>this.createElement("input");
            chekbox.setAttribute("param", headin);
            chekbox.dataset.field = headin.toLowerCase();
            chekbox.classList.add("check");
            chekbox.type = "checkbox";
            const span = <HTMLSpanElement>this.createElement("span");
            span.innerText = (color as unknown) as string;
            checkboxContainer.insertAdjacentElement("beforeend", chekbox);
            checkboxContainer.insertAdjacentElement("beforeend", span);
            container.insertAdjacentElement("beforeend", checkboxContainer);
            this.root?.insertAdjacentElement("beforeend", container);
        });
    }
}
