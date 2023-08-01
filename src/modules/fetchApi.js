const projectId = '4u0VrRiLUtdCxXpkdeya';
// eslint-disable-next-line no-unused-vars
const baseUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/${projectId}`;

export async function fetchCharacterData() {
  const url = 'https://rickandmortyapi.com/api/character';
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

export async function getCharacterImagesAndIds() {
  const characterData = await fetchCharacterData();
  const characters = characterData.slice(0, 6); // Get the first 6 characters
  const characterInfo = characters.map((character) => ({
    id: character.id,
    image: character.image,
    name: character.name,
    gender: character.gender,
    species: character.species,
    status: character.status,
  }));
  return characterInfo;
}
