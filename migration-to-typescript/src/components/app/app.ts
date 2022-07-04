import AppController, { IAppController } from "../controller/controller";
import { AppView } from "../view/appView";

interface IApp {
    controller: IAppController;
    view: any;
    start(): void;
}

class App implements IApp {
    controller: IAppController;
    view: any;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sources: Element | null = document.querySelector(".sources");

        sources?.addEventListener("click", (e) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data))
        );
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
