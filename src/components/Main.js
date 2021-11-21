import React, { useState, useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

import api from '../utils/api';
import PopupwithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import Card from './Card';

const Main = (props) => {
  const [userName, setUserName] = useState('Jacques Cousteau');
  const [userDescription, setUserDescription] = useState('Explorer');
  const [userAvatar, setUserAvatar] = useState('');
  //const [userId, setUserId] = useState('');
  const userId = useRef('');

  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then((result) => {
      setUserName(result[0].name);
      setUserDescription(result[0].about);
      setUserAvatar(result[0].avatar);
      userId.current = result[0]._id;
      setCards(result[1]);
    }) .catch((err) => {
        console.log(err); // log the error to the console
      };

    return () => {

    };
  }, []);

  return (
    <main className='main'>
      <PopupwithForm
        title='Edit Profile'
        name='edit'
        isOpen={props.isEditProfilePopupOpen}
        onClose={props.onEditProfileClose}
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
      </PopupwithForm>

      <PopupWithForm
        title='New Place'
        name='add'
        isOpen={props.isAddPlacePopupOpen}
        onClose={props.onAddPlaceClose}
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
        isOpen={props.isEditAvatarPopupOpen}
        onClose={props.onEditAvatarClose}
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
        isOpen={props.isDeletePlacePopupOpen}
        onClose={props.onDeletePlaceClose}
      ></PopupWithForm>
      <PopupWithImage
        cardData={props.selectedCard}
        isOpen={props.isImagePopupOpen}
        onClose={props.onImagePopupClose}
      />

      <section className='profile'>
        <div className='profile__content'>
          <div
            className='profile__avatar'
            style={{ backgroundImage: `url(${userAvatar})` }}
          >
            <div
              className='profile__overlay'
              onClick={props.onAvatarClick}
            ></div>
          </div>

          <div className='profile__info'>
            <div className='profile__title-edit'>
              <h1 className='profile__title'>{userName}</h1>
              <button
                type='submit'
                className='profile__edit-button'
                onClick={props.onEditProfileClick}
              ></button>
            </div>
            <p className='profile__subtitle'>{userDescription}</p>
          </div>
        </div>

        <button
          type='submit'
          className='profile__add-button'
          aria-label='add'
          onClick={props.onAddPlaceClick}
        ></button>
      </section>
      <section className='places'>
        {cards.map((item) => {
          return (
            <Card
              userId={userId.current}
              cardData={item}
              key={item._id}
              onCardClick={props.onCardClick}
              onDeleteButtonClick={props.onDeletePlaceClick}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
