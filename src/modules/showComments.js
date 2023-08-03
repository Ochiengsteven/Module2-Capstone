import { getComment } from './fetchApi.js';
import countComments from './countComments.js';

const updateComment = async (id) => {
  // get comments data from API
  const displayComments = await getComment(id);
  const comments = document.querySelector('.comments');
  if (!displayComments.error) {
    displayComments.forEach((data) => {
      comments.insertAdjacentHTML(
        'beforeend',
        `
        <p class="comment-text">${data.creation_date} ${data.username}: ${data.comment}</p>
        `,
      );
    });
  }
};

const addComment = async (id) => {
  // Add last comment data from API
  const displayComments = await getComment(id);
  const comments = document.querySelector('.comments');
  comments.insertAdjacentHTML(
    'beforeend',
    `
          <p class="comment-text">${
  displayComments[displayComments.length - 1].creation_date
} ${displayComments[displayComments.length - 1].username}: ${
  displayComments[displayComments.length - 1].comment
}</p>
          `,
  );
  countComments();
};

export { updateComment, addComment };
