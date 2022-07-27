import { NewsType } from "../../../types/index";
import "./news.css";

type Element<T> = T | null;

class News  {
    draw(data: NewsType[]): void {
        const news: NewsType[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: Element<HTMLTemplateElement> = document.querySelector("#newsItemTemp");

        news.forEach((item: NewsType, idx) => {
            const newsClone = <Element<HTMLTemplateElement>>newsItemTemp?.content.cloneNode(true);
            const newsItem = <Element<HTMLDivElement>>newsClone?.querySelector(".news__item");
            const newsMetaPhoto = <Element<HTMLDivElement>>newsClone?.querySelector(".news__meta-photo");
            const newsMetaAuthor = <Element<HTMLLIElement>>newsClone?.querySelector(".news__meta-author");
            const newsMetaDate = <Element<HTMLLIElement>>newsClone?.querySelector(".news__meta-date");
            const newDescriptionTitle = <Element<HTMLHeadingElement>>(
                newsClone?.querySelector(".news__description-title")
            );
            const newDescriptionSource = <Element<HTMLHeadingElement>>(
                newsClone?.querySelector(".news__description-source")
            );
            const newDescriptionContent = <Element<HTMLParagraphElement>>(
                newsClone?.querySelector(".news__description-content")
            );
            const newReadMore = <Element<HTMLParagraphElement>>(
                newsClone?.querySelector(".news__read-more a")
            );

            if (idx % 2) newsItem?.classList.add("alt");
            if(newsMetaPhoto) {
                newsMetaPhoto.style.backgroundImage = `url(${
                item.urlToImage || "img/news_placeholder.jpg"
            })`;}
            if(newsMetaAuthor) {
                newsMetaAuthor.textContent = item.author || item.source.name;
            }
            if(newsMetaDate) {
                newsMetaDate.textContent = item.publishedAt.slice(0, 10).split("-").reverse().join("-");
            }
            if(newDescriptionTitle) {
                newDescriptionTitle.textContent = item.title;
            }
            if(newDescriptionSource) { 
                newDescriptionSource.textContent = item.source.name;
            }
           if(newDescriptionContent){
                newDescriptionContent.textContent = item.description;
            }
            if(newReadMore) {
                newReadMore.setAttribute("href", item.url);
            }
            fragment.append(newsClone as string | Node);
        });

        const newsDiv = <Element<HTMLDivElement>>document?.querySelector(".news");
        if(newsDiv) {
            newsDiv.innerHTML = "";
            newsDiv.appendChild(fragment);
        }
    }
}

export default News;
