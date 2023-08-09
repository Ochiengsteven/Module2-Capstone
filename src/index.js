// import { fetchCharacterData, getCharacterImagesAndIds } from './modules/fetchApi.js';
import renderLayout from './modules/renderLayout.js';
import countCharactersAndUpdateDOM from './modules/characterCounter.js';
import './style.css';

renderLayout();

countCharactersAndUpdateDOM();

document.addEventListener('DOMContentLoaded', async () => {
  await countCharactersAndUpdateDOM();
});