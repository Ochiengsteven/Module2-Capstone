/**
 * @jest-environment jsdom
 */
import countCharactersAndUpdateDOM from '../characterCounter.js';

// Manually create a mock version of getCharacterImagesAndIds
jest.mock('../fetchApi.js', () => ({
  getCharacterImagesAndIds: jest.fn(() => Promise.resolve([
    { id: 1, image: 'character1.jpg' },
    { id: 2, image: 'character2.jpg' },
    { id: 3, image: 'character3.jpg' },
  ])),
}));

describe('countCharactersAndUpdateDOM', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div class="items"></div>';
  });

  test('should update DOM with the correct character count', async () => {
    await countCharactersAndUpdateDOM();

    const characterCountElement = document.querySelector('.items');
    expect(characterCountElement.textContent).toBe('Characters (3)');
  });

  test('should update DOM with zero characters when API returns an empty array', async () => {
    // Manually override the mock implementation to return an empty array
    // eslint-disable-next-line global-require
    require('../fetchApi.js').getCharacterImagesAndIds.mockResolvedValue([]);

    await countCharactersAndUpdateDOM();

    const characterCountElement = document.querySelector('.items');
    expect(characterCountElement.textContent).toBe('Characters (0)');
  });
});
