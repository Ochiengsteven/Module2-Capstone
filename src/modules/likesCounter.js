import { getCharacterImagesAndIds } from './fetchApi.js';

getCharacterImagesAndIds();

const projectId = '4u0VrRiLUtdCxXpkdeya';

export const fetchLike = async () => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${projectId}/likes`);
  const data = await response.json();
  return data;
};

export const postLike = async (id) => {
  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${projectId}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: id,
    }),
  });
};