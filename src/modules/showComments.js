import { getComment } from './fetchApi.js';

const updateComment = async (id) => {
  // get comments data from API
  const displayComments = await getComment(id);
  const comments = document.querySelector('.comments');
  if (!(displayComments.error)) {
    displayComments.forEach((data) => {
      comments.insertAdjacentHTML('beforeend', `
        <p class="comment-text">${data.creation_date} ${data.username}: ${data.comment}</p>
        `);
    });
  }
};

const addComment = async (id) => {
  // Add last comment data from API
  const displayComments = await getComment(id);
  const comments = document.querySelector('.comments');
  if (!(displayComments.error)) {
    comments.insertAdjacentHTML('beforeend', `
          <p class="comment-text">${displayComments.pop().creation_date} ${displayComments.pop().username}: ${displayComments.pop().comment}</p>
          `);
  }
};

export { updateComment, addComment };