import AppLoader from "./appLoader";

interface IAppController {
    getSources(callback: (data?: any) => void): void;
    getNews(e: Event, callback: (data?: any) => void): void;
}

class AppController extends AppLoader implements IAppController {
    getSources(callback: (data?: any) => void): void {
        super.getResp(
            {
                endpoint: "sources",
            },
            callback
        );
    }

    getNews(e: Event, callback: (data?: any) => void): void {
        let target = <Element | null>e.target;
        const newsContainer = <Element | null>e.currentTarget;
        while (target !== newsContainer) {
            if (target?.classList.contains("source__item")) {
                const sourceId: string | null = target.getAttribute("data-source-id");
                if (newsContainer?.getAttribute("data-source") !== sourceId) {
                    newsContainer?.setAttribute("data-source", sourceId as string);
                    super.getResp(
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
