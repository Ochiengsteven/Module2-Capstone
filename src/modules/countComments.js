export default function countComments() {
  const comments = document.querySelector('.commentsTitle');

  setTimeout(() => {
    comments.innerHTML = '';
    const countAll = document.querySelectorAll('.comment-text').length;
    comments.insertAdjacentHTML('beforeend', `Comments (${countAll})`);
  }, 2000);
}
