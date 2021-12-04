import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';

import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  function logError(err) {
    console.log(err);
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch(logError);
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((result) => {
        setCards(result);
      })
      .catch(logError);
  }, []);

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

  function handleUpdateUser(userInfo) {
    api
      .updateUserInfo(userInfo)
      .then((result) => {
        setCurrentUser(result);
      })
      .catch(logError);
    setIsEditProfilePopupOpen(false);
  }

  function handleUpdateAvatar(userAvatarInfo) {
    api
      .updateUserAvatar(userAvatarInfo)
      .then((result) => {
        setCurrentUser(result);
      })
      .catch(logError);
    setIsEditAvatarPopupOpen(false);
  }

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    api.changeCardLikeStatus(card._id, isLiked).then((newCard) => {
      setCards(cards.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId).then((result) => {
      setCards(cards.filter((card) => card._id !== cardId));
    });
  }

  function handleAddPlaceSubmit(placeInfo) {
    api.uploadPlace(placeInfo).then((result) => {
      setCards([result, ...cards]);
    });
    setIsAddPlacePopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
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
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDeletePlaceClick={handleDeletePlaceClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
