import { getCharacterImagesAndIds } from './fetchApi.js';
import like from '../assets/like.png';
import logo from '../assets/logo1.png';

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
    // Create the like image
    const likeImg = new Image();
    likeImg.src = like;

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
    const likesCount = document.createElement('p');
    likesCount.textContent = '5 likes';
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
  };

  appendCharacterCards();
}