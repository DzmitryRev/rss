import './styles/index.css';

import renderDOM from './core/render/renderDOM';

import App from './scripts/App';

const root = document.getElementById('app');

renderDOM(root, new App().render());
