import { ProductType } from "../../data/types";
import { Template } from "./Template";

const template = new Template();

describe("Template tests", () => {
    test("Create product", () => {
        const product: ProductType = {
            id: "1",
            title: "Apple Iphone 13",
            model: "Iphone 13",
            manufacturer: "Apple",
            year: "2021",
            price: "599",
            memory: "128",
            quantity: 0,
            color: "Белый",
            image: "https://mobillife.by/images/virtuemart/product/30052886b.jpg",
        };
        expect(template.createProduct(product)).toStrictEqual(`
            <div class="product">
                <div class="product__image-container">
                    <img
                        class="product__image"
                        src="https://mobillife.by/images/virtuemart/product/30052886b.jpg"
                        alt="Apple Iphone 13"
                    />
                </div>
                <div class="product__description">
                    <span class="product__title">Apple Iphone 13</span>
                    <p>year: <span class="product__year">2021</span></p>
                    <p>color: <span class="product__color">Белый</span></p>
                    <p>memory: <span class="product__color">128 Гб</span></p>
                    <p>quantity: <span class="product__quantity">0</span></p>
                </div>
                <div class="product__footer">
                    <div class="no-available">Нет на складе</div>
                    <span class="product__price">
                    599$</span>
                    <button class="button button-add-to-card"
                            data-id='1'
                            >В корзину</button>
                    <button class="button button-remove-from-card"
                            data-id='1'
                            >Убрать из корзины</button>
                </div>
            </div>
        `);
    });
    test("Create filter field", () => {
        expect(template.createFilterField("value", "field", true)).toStrictEqual(`
        <div>
            <input type="checkbox" data-field="field" class="filters-checkbox" checked />
            <span>value</span>
        </div>
    `);
    });
});
