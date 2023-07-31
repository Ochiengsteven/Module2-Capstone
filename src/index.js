import './style.css';
import good from './assets/GOOD.gif';

const title = document.createElement('h1');
title.textContent = 'Hello World!';

const page = document.querySelector('body');
page.appendChild(title);

const img = new Image();
img.src = good;

page.appendChild(img);