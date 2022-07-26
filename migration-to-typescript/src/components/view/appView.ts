import { NewsDataType, SourcesDataType } from "../controller/controller";
import News, { INews } from "./news/news";
import Sources, { ISources } from "./sources/sources";

export class AppView {
    news: INews;
    sources: ISources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsDataType) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourcesDataType) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
