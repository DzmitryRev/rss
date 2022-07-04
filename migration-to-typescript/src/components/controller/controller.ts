import AppLoader from "./appLoader";

// Type for data from sources fetching

export type SourcesType = {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
};

export type SourcesDataType = {
    status: string;
    sources: SourcesType[];
};

// Type for data from news fetching

export type NewsType = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: { id: string; name: string };
    title: string;
    url: string;
    urlToImage: string;
};

export type NewsDataType = {
    status: string;
    articles: NewsType[];
    totalResults: number;
};

export interface IAppController {
    getSources(callback: (data?: any) => void): void;
    getNews(e: Event, callback: (data?: any) => void): void;
}

class AppController extends AppLoader implements IAppController {
    getSources(callback: (data?: SourcesDataType) => void): void {
        super.getResp<SourcesDataType>(
            {
                endpoint: "sources",
            },
            callback
        );
    }

    getNews(e: Event, callback: (data?: NewsDataType) => void): void {
        let target = <Element | null>e.target;
        const newsContainer = <Element | null>e.currentTarget;
        while (target !== newsContainer) {
            if (target?.classList.contains("source__item")) {
                const sourceId: string | null = target.getAttribute("data-source-id");
                if (newsContainer?.getAttribute("data-source") !== sourceId) {
                    newsContainer?.setAttribute("data-source", sourceId as string);
                    super.getResp<NewsDataType>(
                        {
                            endpoint: "everything",
                            options: {
                                sources: sourceId as string | undefined,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = <Element | null>target?.parentNode;
        }
    }
}

export default AppController;
