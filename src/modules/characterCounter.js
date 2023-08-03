import { getCharacterImagesAndIds } from './fetchApi.js'; // Replace './your/api/module.js' with the actual path to your API module

export default async function countCharactersAndUpdateDOM() {
  const characterData = await getCharacterImagesAndIds();
  const numberOfCharacters = characterData.length;
  console.log(numberOfCharacters);
  const characterCountElement = document.querySelector('.items');
  characterCountElement.textContent = `Characters (${numberOfCharacters})`;
}