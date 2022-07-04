import { SourcesType } from "../../controller/controller";
import "./sources.css";

export interface ISources {
    draw(data: SourcesType[]): void;
}

class Sources implements ISources {
    draw(data: SourcesType[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector(
            "#sourceItemTemp"
        );

        data.forEach((item: SourcesType) => {
            const sourceClone = <HTMLTemplateElement | null>sourceItemTemp?.content.cloneNode(true);
            const sourceItemName = <HTMLSpanElement>(
                sourceClone?.querySelector(".source__item-name")
            );
            const sourceItem = <HTMLDivElement>sourceClone?.querySelector(".source__item");

            sourceItemName.textContent = item.name;
            sourceItem.setAttribute("data-source-id", item.id);

            fragment.append(sourceClone as string | Node);
        });

        const sources = <HTMLDivElement>document?.querySelector(".sources");
        sources.append(fragment);
    }
}

export default Sources;
