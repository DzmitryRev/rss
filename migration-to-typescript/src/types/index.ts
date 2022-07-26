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
