import { Element, SourcesType } from "../../../types/index";
import "./sources.css";


class Sources {
    draw(data: SourcesType[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = <Element<HTMLTemplateElement>>document.querySelector(
            "#sourceItemTemp"
        );

        data.forEach((item: SourcesType) => {
            const sourceClone = <Element<HTMLTemplateElement>>sourceItemTemp?.content.cloneNode(true);
            const sourceItemName = <Element<HTMLSpanElement>>(
                sourceClone?.querySelector(".source__item-name")
            );
            const sourceItem = <Element<HTMLDivElement>>sourceClone?.querySelector(".source__item");

            if(sourceItemName) sourceItemName.textContent = item.name;
            if(sourceItem) sourceItem.setAttribute("data-source-id", item.id);

            fragment.append(sourceClone as string | Node);
        });

        const sources = <Element<HTMLDivElement>>document?.querySelector(".sources");
        if(sources) sources.append(fragment);
    }
}

export default Sources;
