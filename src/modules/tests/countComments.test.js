/**
 * @jest-environment jsdom
 */
import countComments from '../countComments.js';

describe('count comments for a character', () => {
  test('number of comments should be 2', async () => {
    document.body.innerHTML = `
        <div class="comments">
          <div class="comment-text"></div>
          <div class="comment-text"></div>
        </div>`;
    expect(countComments()).toBe(2);
  });
  test('number of comments should be 0', async () => {
    document.body.innerHTML = `
        <div class="comments">
        </div>`;
    expect(countComments()).toBe(0);
  });
  test('number of comments should be 5', async () => {
    document.body.innerHTML = `
        <div class="comments">
          <div class="comment-text"></div>
          <div class="comment-text"></div>    
          <div class="comment-text"></div>
          <div class="comment-text"></div>
          <div class="comment-text"></div>
        </div>`;
    expect(countComments()).toBe(5);
  });
});
