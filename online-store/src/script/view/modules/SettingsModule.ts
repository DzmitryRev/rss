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
        this.createFilterBlock(availableColors, "Цвет");
        this.createFilterBlock(availableMemories, "Память");
        this.createFilterBlock(availableManufacturers, "Производитель");
        this.createFilterBlock(availableYears, "Год выпуска");
    }
    createFilterBlock(values: string[], headin: string): void {
        const container = <HTMLDivElement>this.createElement("div");
        const heading = <HTMLHeadingElement>this.createElement("h3");
        heading.innerText = headin;
        container.insertAdjacentElement("beforeend", heading);
        values.forEach((color) => {
            const chekbox = <HTMLInputElement>this.createElement("input");
            chekbox.classList.add("check");
            chekbox.type = "checkbox";
            const span = <HTMLSpanElement>this.createElement("span");
            span.innerText = (color as unknown) as string;
            container.insertAdjacentElement("beforeend", chekbox);
            container.insertAdjacentElement("beforeend", span);
            this.root?.insertAdjacentElement("beforeend", container);
        });
    }
}
