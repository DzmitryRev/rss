import { Element, NewsDataType, SourcesDataType } from "../../types/index";
import AppController from "../controller/controller";
import { AppView } from "../view/appView";

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sources = <Element<HTMLElement>>document.querySelector(".sources");
        sources?.addEventListener("click", (e) =>
            this.controller.getNews(e, (data: NewsDataType) => this.view.drawNews(data))
        );
        this.controller.getSources((data: SourcesDataType) => this.view.drawSources(data));
    }
}

export default App;
