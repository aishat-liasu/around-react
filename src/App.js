import React from 'react';

function App() {
  return (
    <div class='page'>
      <section class='popup popup_type_edit' id='popup_type_edit'>
        <form class='popup__form' id='popup__form_type_edit' novalidate>
          <button
            type='reset'
            class='popup__close-button'
            aria-label='close'
          ></button>
          <h2 class='popup__heading'>Edit Profile</h2>

          <label class='popup__label'>
            <input
              type='text'
              id='profile-title'
              name='profileName'
              class='popup__field popup__field_el_title'
              minlength='2'
              maxlength='45'
              placeholder='Name'
              required
            />
            <span class='popup__field-error' id='profile-title-error'></span>
          </label>

          <label class='popup__label'>
            <input
              type='text'
              id='profile-subtitle'
              name='profileJob'
              class='popup__field popup__field_el_subtitle'
              minlength='2'
              maxlength='200'
              placeholder='About'
              required
            />
            <span class='popup__field-error' id='profile-subtitle-error'></span>
          </label>
          <button type='submit' class='popup__submit-button'>
            Save
          </button>
        </form>
      </section>
      <section class='popup popup_type_add' id='popup_type_add'>
        <form class='popup__form' id='popup__form_type_add' novalidate>
          <button
            type='reset'
            class='popup__close-button'
            aria-label='close'
          ></button>
          <h2 class='popup__heading'>New Place</h2>
          <label class='popup__label'>
            <input
              type='text'
              name='placeName'
              id='place-title'
              class='popup__field popup__field_el_place-title'
              placeholder='Title'
              minlength='1'
              maxlength='30'
              required
            />
            <span class='popup__field-error' id='place-title-error'></span>
          </label>
          <label class='popup__label'>
            <input
              type='url'
              name='placeImageURL'
              id='place-image-url'
              class='popup__field popup__field_el_place-image-url'
              placeholder='Image URL'
              required
            />
            <span class='popup__field-error' id='place-image-url-error'></span>
          </label>
          <button type='submit' class='popup__submit-button'>
            Create
          </button>
        </form>
      </section>
      <section class='popup popup_type_image' id='popup_type_image'>
        <div class='popup__container'>
          <button
            type='reset'
            class='popup__close-button'
            aria-label='close'
          ></button>
          <img
            src="<%=require('./images/latemar.png')%>"
            alt='popup'
            class='popup__image'
          />
          <p class='popup__image-location'></p>
        </div>
      </section>

      <section class='popup popup_type_confirm' id='popup_type_confirm'>
        <form class='popup__form' id='popup__form_type_confirm' novalidate>
          <button
            type='reset'
            class='popup__close-button'
            aria-label='close'
          ></button>
          <h2 class='popup__heading'>Are you sure?</h2>
          <button type='submit' class='popup__submit-button'>
            Yes
          </button>
        </form>
      </section>

      <section class='popup popup_type_change' id='popup_type_change'>
        <form class='popup__form' id='popup__form_type_change' novalidate>
          <button
            type='reset'
            class='popup__close-button'
            aria-label='close'
          ></button>
          <h2 class='popup__heading'>Change profile picture</h2>
          <label class='popup__label'>
            <input
              type='url'
              name='profilePictureURL'
              id='profile-picture-url'
              class='popup__field popup__field_el_profile-picture-url'
              placeholder='Image URL'
              required
            />
            <span
              class='popup__field-error'
              id='profile-picture-url-error'
            ></span>
          </label>
          <button type='submit' class='popup__submit-button'>
            Save
          </button>
        </form>
      </section>

      <header class='header'>
        <div class='logo'></div>
      </header>
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
              <img
                src='./images/latemar.png'
                alt='place'
                class='place__image'
              />
              <h2 class='place__title'>Title</h2>
              <div class='place__love-section'>
                <button class='place__love-button'></button>
                <p class='place__love-count'>1</p>
              </div>
            </div>
          </template>
        </section>
      </main>
      <footer class='footer'>
        <p class='footer__copyright'>&copy; 2021 Around the U.S</p>
      </footer>
    </div>
  );
}

export default App;
