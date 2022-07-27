import { Element, NewsDataType, SourcesDataType } from "../../types/index";
import AppLoader from "./appLoader";

class AppController extends AppLoader {
    getSources(callback: (data: SourcesDataType) => void): void {
        super.getResp<SourcesDataType>(
            {
                endpoint: "sources",
            },
            callback
        );
    }

    getNews(e: Event, callback: (data: NewsDataType) => void): void {
        let target = <Element<HTMLElement>>e.target;
        const newsContainer = <Element<HTMLElement>>e.currentTarget;
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
            target = <Element<HTMLElement>>target?.parentNode;
        }
    }
}

export default AppController;
