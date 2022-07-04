import Loader from "./loader";

class AppLoader extends Loader {
    constructor() {
        super("https://newsapi.org/v2/", {
            apiKey: "6adb1c17f9f74e3dbca69070d986187e",
        });
    }
}

export default AppLoader;
