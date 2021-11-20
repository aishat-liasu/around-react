import React from 'react';

const Main = () => {
  return (
    <main class='main'>
      <section class='profile'>
        <div class='profile__content'>
          <div class='profile__avatar'>
            <div class='profile__overlay'></div>
          </div>

          <div class='profile__info'>
            <div class='profile__title-edit'>
              <h1 class='profile__title'>Jacques Cousteau</h1>
              <button type='submit' class='profile__edit-button'></button>
            </div>
            <p class='profile__subtitle'>Explorer</p>
          </div>
        </div>

        <button
          type='submit'
          class='profile__add-button'
          aria-label='add'
        ></button>
      </section>
      <section class='places'>
        <template id='place-template'>
          <div class='place'>
            <button class='place__delete-button'></button>
            <img src='./images/latemar.png' alt='place' class='place__image' />
            <h2 class='place__title'>Title</h2>
            <div class='place__love-section'>
              <button class='place__love-button'></button>
              <p class='place__love-count'>1</p>
            </div>
          </div>
        </template>
      </section>
    </main>
  );
};

export default Main;
