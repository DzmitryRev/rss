// styles
import "./scss/index.scss";
// images
import "./assets/card-icon.svg";

let a: number;

a = 15;
a = 20;

console.log(a);

const test = document.querySelector("#test");
const el = document.querySelector("#el");

test?.addEventListener("click", () => {
    el?.classList.toggle("open");
});
