import React, { useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeletePlaceClick() {
    setIsDeletePlacePopupOpen(true);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups(e) {
    //console.log(e.target.closest('.popup'));
    //e.target.closest('.popup').classList.remove('popup_opened');
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className='page'>
      <PopupWithForm
        title='Edit Profile'
        name='edit'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText='Save'
      >
        <label className='popup__label'>
          <input
            type='text'
            id='profile-title'
            name='profileName'
            className='popup__field popup__field_el_title'
            minLength='2'
            maxLength='45'
            placeholder='Name'
            required
          />
          <span className='popup__field-error' id='profile-title-error'></span>
        </label>

        <label className='popup__label'>
          <input
            type='text'
            id='profile-subtitle'
            name='profileJob'
            className='popup__field popup__field_el_subtitle'
            minLength='2'
            maxLength='200'
            placeholder='About'
            required
          />
          <span
            className='popup__field-error'
            id='profile-subtitle-error'
          ></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        title='New Place'
        name='add'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText='Save'
      >
        <label className='popup__label'>
          <input
            type='text'
            name='placeName'
            id='place-title'
            className='popup__field popup__field_el_place-title'
            placeholder='Title'
            minLength='1'
            maxLength='30'
            required
          />
          <span className='popup__field-error' id='place-title-error'></span>
        </label>
        <label className='popup__label'>
          <input
            type='url'
            name='placeImageURL'
            id='place-image-url'
            className='popup__field popup__field_el_place-image-url'
            placeholder='Image URL'
            required
          />
          <span
            className='popup__field-error'
            id='place-image-url-error'
          ></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        title='Update Profile Picture'
        name='change'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText='Save'
      >
        <label className='popup__label'>
          <input
            type='url'
            name='profilePictureURL'
            id='profile-picture-url'
            className='popup__field popup__field_el_profile-picture-url'
            placeholder='Image URL'
            required
          />
          <span
            className='popup__field-error'
            id='profile-picture-url-error'
          ></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        title='Are you sure?'
        name='confirm'
        isOpen={isDeletePlacePopupOpen}
        onClose={closeAllPopups}
        buttonText='Yes'
      ></PopupWithForm>
      <ImagePopup
        cardData={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
      <Header />
      <Main
        selectedCard={selectedCard}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onDeletePlaceClick={handleDeletePlaceClick}
      />
      <Footer />
    </div>
  );
}

export default App;
