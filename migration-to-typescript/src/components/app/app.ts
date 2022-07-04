import AppController, {
    IAppController,
    NewsDataType,
    SourcesDataType,
} from "../controller/controller";
import { AppView, IAppView } from "../view/appView";

interface IApp {
    controller: IAppController;
    view: IAppView;
    start(): void;
}

class App implements IApp {
    controller: IAppController;
    view: IAppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sources: Element | null = document.querySelector(".sources");

        sources?.addEventListener("click", (e) =>
            this.controller.getNews(e, (data: NewsDataType) => this.view.drawNews(data))
        );
        this.controller.getSources((data: SourcesDataType) => this.view.drawSources(data));
    }
}

export default App;
