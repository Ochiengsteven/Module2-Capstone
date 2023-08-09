const projectId = '4u0VrRiLUtdCxXpkdeya';
// eslint-disable-next-line no-unused-vars
const baseUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${projectId}`;

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

export async function postComment(id, username, comment) {
  await fetch(`${baseUrl}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: id,
      username,
      comment,
    }),
  });
}

export async function getComment(id) {
  const response = await fetch(`${baseUrl}/comments?item_id=${id}`);
  const data = await response.json();
  return data;
}