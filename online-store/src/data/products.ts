export type ProductType = {
    id: number;
    title: string;
    manufacturer: string;
    year: string;
    price: string;
    color: string;
};

export const products: ProductType[] = [
    {
        id: 1,
        title: "Iphone 12",
        manufacturer: "Apple",
        year: "2021",
        price: "499",
        color: "purple",
    },
];
