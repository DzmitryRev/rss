export type ProductType = {
    id: string;
    title: string;
    manufacturer: string;
    year: string;
    price: string;
    memory: number;
    quantity: number;
    color: string;
    image: string;
};

export const products: ProductType[] = [
    {
        id: "1",
        title: "Iphone 13",
        manufacturer: "Apple",
        year: "2021",
        price: "599",
        memory: 128,
        quantity: 1,
        color: "Белый",
        image: "https://mobillife.by/images/virtuemart/product/30059037b1.jpg",
    },
    {
        id: "2",
        title: "Iphone 13",
        manufacturer: "Apple",
        year: "2021",
        price: "599",
        memory: 256,
        quantity: 13,
        color: "Голубой",
        image: "https://mobillife.by/images/virtuemart/product/30059040b.jpg",
    },
    {
        id: "3",
        title: "Iphone 12",
        manufacturer: "Apple",
        year: "2020",
        price: "499",
        memory: 64,
        quantity: 11,
        color: "Белый",
        image: "https://mobillife.by/images/virtuemart/product/30052886b.jpg",
    },
    {
        id: "4",
        title: "Iphone 12",
        manufacturer: "Apple",
        year: "2020",
        price: "499",
        memory: 256,
        quantity: 18,
        color: "Зеленый",
        image: "https://mobillife.by/images/virtuemart/product/30052889b.jpg",
    },
    {
        id: "5",
        title: "Iphone 13 pro",
        manufacturer: "Apple",
        year: "2021",
        price: "699",
        memory: 256,
        quantity: 9,
        color: "Зеленый",
        image: "https://mobillife.by/images/virtuemart/product/22147.750x05772.jpg",
    },
    {
        id: "6",
        title: "Pixel 6 pro",
        manufacturer: "Google",
        year: "2022",
        price: "799",
        memory: 128,
        quantity: 15,
        color: "Белый",
        image: "https://mobillife.by/images/virtuemart/product/218333.jpg",
    },
    {
        id: "7",
        title: "POCO X4 pro",
        manufacturer: "Xiaomi",
        year: "2020",
        price: "350",
        memory: 64,
        quantity: 4,
        color: "Голубой",
        image:
            "https://mobillife.by/images/virtuemart/product/poco_x4_pro_5g_6gb_128gb_siniy_(mejdunarodnaya_versiya)_1.jpg",
    },
    {
        id: "8",
        title: "9",
        manufacturer: "OnePlus",
        year: "2021",
        price: "370",
        memory: 64,
        quantity: 19,
        color: "Голубой",
        image:
            "https://mobillife.by/images/virtuemart/product/oneplus_9_8gb_128gb_arctic_sky_1.jpg",
    },
    {
        id: "9",
        title: "10 pro",
        manufacturer: "OnePlus",
        year: "2022",
        price: "570",
        memory: 128,
        quantity: 2,
        color: "Зеленый",
        image:
            "https://mobillife.by/images/virtuemart/product/oneplus_10_pro_8gb_256gb_(izumrudnyiy_les)_174.jpg",
    },
    {
        id: "10",
        title: "Galaxy A13",
        manufacturer: "Samsung",
        year: "2022",
        price: "270",
        memory: 64,
        quantity: 13,
        color: "Черный",
        image:
            "https://mobillife.by/images/virtuemart/product/samsung_galaxy_a13_4gb_64gb_chernyiy.jpg",
    },
    {
        id: "11",
        title: "Galaxy S22 Ultra",
        manufacturer: "Samsung",
        year: "2022",
        price: "1099",
        memory: 256,
        quantity: 7,
        color: "Голубой",
        image:
            "https://mobillife.by/images/virtuemart/product/samsung_galaxy_s22_ultra_5g_%D0%B3%D0%BE%D0%BB%D1%83%D0%B1%D0%BE%D0%B913.jpg",
    },
];

// TODO: add 14 products

// color:
// зеленый - 3
// белый - 3
// голубой - 4
// черный - 1
// year:
// 2020 - 3
// 2021 - 4
// 2022 - 4
// manuf:
// apple - 5 // TODO: add 3
// xiaomi - 1 // TODO: add 4
// samsung - 2 // TODO: add 5
// google - 1 // TODO: add 2
// onePlus - 2
// memory:
// 64 - 4
// 128 - 3
// 256 - 4

// quantity:
// any count from 1 to
