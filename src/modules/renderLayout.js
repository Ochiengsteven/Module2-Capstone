/* eslint-disable no-undef */
import { getCharacterImagesAndIds } from './fetchApi.js';
import logo from '../assets/logo1.png';
import { fetchLike, postLike } from './likesCounter.js';

getCharacterImagesAndIds();
export default function renderLayout() {
  // Create header with logo
  const logoImg = new Image();
  logoImg.src = logo;
  logoImg.alt = 'Rick and Morty logo';
  const logoDiv = document.querySelector('.logo');
  logoDiv.appendChild(logoImg);

  // Create the basic layout of each character card
  const createCharacterCard = (character) => {
    // character.likes = 0;

    // Retrieve the likes count from localStorage if it exists
    const storedLikes = localStorage.getItem(`likes_${character.id}`);
    character.likes = storedLikes ? parseInt(storedLikes, 10) : 0;
    // Create the like image
    const likeImg = document.createElement('h2');
    likeImg.classList.add('likes');
    likeImg.innerHTML = '<i class="fa fa-heart-o"></i>';

    const likesCount = document.createElement('p');
    likesCount.textContent = `${character.likes} likes`;

    likeImg.addEventListener('click', async () => {
      try {
        // Remove the event listener to prevent further clicks
        likeImg.classList.toggle('liked');
        // Call the postLike function to add a like for the character
        await postLike(character.id);

        // Update the likes count on the card
        character.likes += 1; // Increase the likes count in the character object
        // Fetch the latest like count from the API
        const updatedLikes = await fetchLike();
        const characterLikes = updatedLikes.find((item) => item.item_id === character.id);
        likesCount.textContent = `${characterLikes.likes} likes`; // Update the likes count element
        localStorage.setItem(`likes_${character.id}`, characterLikes.likes);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error adding like:', error);
      }
    });

    const card = document.createElement('div');
    card.classList.add('card');

    // Create the card image
    const cardImage = document.createElement('img');
    cardImage.classList.add('card-image');
    cardImage.src = character.image;
    card.appendChild(cardImage);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    card.appendChild(cardContent);

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');
    const name = document.createElement('h2');
    name.textContent = character.name;
    cardTitle.appendChild(name);
    cardTitle.appendChild(likeImg); // Append the like image to the card title
    cardContent.appendChild(cardTitle);

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('card-description');
    const countDiv = document.createElement('div');
    countDiv.classList.add('count-div');
    countDiv.appendChild(likesCount);
    cardDescription.appendChild(countDiv);
    const commentButton = document.createElement('button');
    commentButton.classList.add('comment-button');
    commentButton.textContent = 'Comments';
    cardDescription.appendChild(commentButton);
    const reservationButton = document.createElement('button');
    reservationButton.classList.add('reservation-button');
    reservationButton.textContent = 'Reservations';
    cardDescription.appendChild(reservationButton);
    cardContent.appendChild(cardDescription);

    return card;
  };

  const appendCharacterCards = async () => {
    const characters = await getCharacterImagesAndIds();
    const characterContainer = document.querySelector('.character-container');
    // create the loop to render the cards
    characters.forEach((character) => {
      const characterCard = createCharacterCard(character); // add the earlier created card layout.
      characterContainer.appendChild(characterCard); // append the card to the container.
    });

    // opening comment popup page
    const commentBtn = document.querySelectorAll('.comment-button');

    commentBtn.forEach((e) => {
      e.addEventListener('click', async () => {
        // finding index
        const id = [].indexOf.call(
          e.parentNode.parentNode.parentNode.parentNode.childNodes,
          e.parentNode.parentNode.parentNode,
        );

        const modal = document.getElementById('comment-modal');
        const overlay = document.createElement('comment-overlay');
        overlay.classList.add('popup-overlay');
        modal.parentNode.insertBefore(overlay, modal);

        modal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.classList.add('popup-active');
        modal.innerHTML = '';
        const popupContainer = document.createElement('div');
        popupContainer.classList.add('popup-container');
        popupContainer.innerHTML = `
  <div class="comment-container">
      <img src="${characters[id].image}" id="picture" alt="">
      <button class="closeBtn"><i class="fa fa-close"></i></button>
  <h2>${characters[id].name}</h2>
  <ul class="character-info">
      <li>ID: ${characters[id].id}</li>
      <li>Species: ${characters[id].species}</li>
      <li>Gender: ${characters[id].gender}</li>
      <li>Status: ${characters[id].status}</li>
  </ul>
  <section>
  <div class="comments">
  <h3>Comments</h3>
  </div>
  <h3>Add a comment</h3>
  <form action="" id="myForm">
      <div><input type="text" id="name" placeholder="Your name"></div>
      <div><textarea type="text" id="comments" placeholder="Your insights" rows="4" maxlength="500"></textarea></div>
      <button type="submit" class="submitComment">Comment</button>
  </form>
  </section>
</div>
  `;
        modal.append(popupContainer);

        // closing comment popup
        const closeBtn = document.querySelector('.closeBtn');
        closeBtn.addEventListener('click', () => {
          modal.style.display = 'none';
          overlay.style.display = 'none';
          document.body.classList.remove('popup-active');
        });
        const formBtn = document.querySelector('.submitComment');
        updateComment(id);
        formBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          const nameInput = document.getElementById('name').value;
          const commentInput = document.getElementById('comments').value;
          if (nameInput && commentInput) {
            await postComment(id, nameInput, commentInput);
            document.getElementById('myForm').reset();
          } else {
            formBtn.insertAdjacentHTML(
              'afterend',
              '<p class="error-msg">Please enter a valid title and author<p>',
            );
            setTimeout(() => {
              const errorMsg = document.querySelector('.error-msg');
              errorMsg.remove();
            }, 3000);
          }
          addComment(id);
        });
      });
    });
  };

  appendCharacterCards();
}
