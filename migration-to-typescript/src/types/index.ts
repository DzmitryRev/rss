export interface NewsType {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: { id: string; name: string };
    title: string;
    url: string;
    urlToImage: string;
};

export interface NewsDataType {
    status: string;
    articles: NewsType[];
    totalResults: number;
};


export interface SourcesType  {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
};

export interface SourcesDataType {
    status: string;
    sources: SourcesType[];
};
