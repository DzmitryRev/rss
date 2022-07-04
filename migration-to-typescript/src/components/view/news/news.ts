import { NewsType } from "../../controller/controller";
import "./news.css";

class News {
    draw(data: NewsType[]) {
        const news: NewsType[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector("#newsItemTemp");

        news.forEach((item: NewsType, idx) => {
            const newsClone = <HTMLTemplateElement | null>newsItemTemp?.content.cloneNode(true);
            const newsItem = <HTMLDivElement>newsClone?.querySelector(".news__item");
            const newsMetaPhoto = <HTMLDivElement>newsClone?.querySelector(".news__meta-photo");
            const newsMetaAuthor = <HTMLLIElement>newsClone?.querySelector(".news__meta-author");
            const newsMetaDate = <HTMLLIElement>newsClone?.querySelector(".news__meta-date");
            const newDescriptionTitle = <HTMLHeadingElement>(
                newsClone?.querySelector(".news__description-title")
            );
            const newDescriptionSource = <HTMLHeadingElement>(
                newsClone?.querySelector(".news__description-source")
            );
            const newDescriptionContent = <HTMLParagraphElement>(
                newsClone?.querySelector(".news__description-content")
            );
            const newReadMore = <HTMLParagraphElement>(
                newsClone?.querySelector(".news__read-more a")
            );

            if (idx % 2) newsItem.classList.add("alt");

            newsMetaPhoto.style.backgroundImage = `url(${
                item.urlToImage || "img/news_placeholder.jpg"
            })`;
            newsMetaAuthor.textContent = item.author || item.source.name;
            newsMetaDate.textContent = item.publishedAt.slice(0, 10).split("-").reverse().join("-");

            newDescriptionTitle.textContent = item.title;
            newDescriptionSource.textContent = item.source.name;
            newDescriptionContent.textContent = item.description;
            newReadMore.setAttribute("href", item.url);

            fragment.append(newsClone as string | Node);
        });

        const newsDiv = <HTMLDivElement>document?.querySelector(".news");

        newsDiv.innerHTML = "";
        newsDiv.appendChild(fragment);
    }
}

export default News;
