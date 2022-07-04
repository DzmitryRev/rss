type OptionsType = {
    apiKey: string;
};

type GetRespOptionsType = {
    sources?: string;
};

type GetRespSettingsType = {
    endpoint: string;
    options?: GetRespOptionsType;
};

type CallbackType = (data?: any) => void;

interface ILoader {
    baseLink: string;
    options: OptionsType;
    getResp(settings: GetRespSettingsType, callback: CallbackType): void;
    errorHandler(res: Response): Response;
    makeUrl(options: GetRespOptionsType, endpoint: string): string;
    load(
        method: string,
        endpoint: string,
        callback: CallbackType,
        options: GetRespOptionsType
    ): void;
}

class Loader implements ILoader {
    baseLink: string;
    options: OptionsType;

    constructor(baseLink: string, options: OptionsType) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: GetRespSettingsType,
        callback: CallbackType = () => {
            console.error("No callback for GET response");
        }
    ): void {
        this.load<T>("GET", endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: GetRespOptionsType, endpoint: string): string {
        const urlOptions: OptionsType & GetRespOptionsType = { ...this.options, ...options };

        let url = `${this.baseLink}${endpoint}?`;

        const entriesArray: [string, string][] = Object.entries(urlOptions).map(
            (item: [string, string]): [string, string] => {
                return item;
            }
        );

        entriesArray.forEach((item: [string, string]) => {
            url += `${item[0]}=${item[1]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(
        method: string,
        endpoint: string,
        callback: CallbackType,
        options: GetRespOptionsType
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler.bind(this))
            .then((res: Response) => res.json())
            .then((data: T) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
