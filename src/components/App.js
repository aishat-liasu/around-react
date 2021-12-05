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
  const [buttonText, setButtonText] = useState('Save');
  const [cardToBeDeletedId, setCardToBeDeletedId] = useState('');

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

  function handleDeletePlaceClick(cardId) {
    setIsDeletePlacePopupOpen(true);
    setCardToBeDeletedId(cardId);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
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
        setIsEditProfilePopupOpen(false);
      })
      .catch(logError)
      .finally(() => {
        setButtonText('Save');
      });
  }

  function handleUpdateAvatar(userAvatarInfo) {
    api
      .updateUserAvatar(userAvatarInfo)
      .then((result) => {
        setCurrentUser(result);
        setIsEditAvatarPopupOpen(false);
      })
      .catch(logError)
      .finally(() => {
        setButtonText('Save');
      });
  }

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    api
      .changeCardLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards(cards.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch(logError);
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then((result) => {
        setCards(cards.filter((card) => card._id !== cardId));
      })
      .catch(logError);
  }

  function handleAddPlaceSubmit(placeInfo) {
    api
      .uploadPlace(placeInfo)
      .then((result) => {
        setCards([result, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(logError)
      .finally(() => {
        setButtonText('Save');
      });
  }

  function handleDeleteConfirmation(e) {
    e.preventDefault();
    handleCardDelete(cardToBeDeletedId);
    setCardToBeDeletedId('');
    setIsDeletePlacePopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={buttonText}
          setButtonText={setButtonText}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={buttonText}
          setButtonText={setButtonText}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          buttonText={buttonText}
          setButtonText={setButtonText}
        />
        <PopupWithForm
          title='Are you sure?'
          name='confirm'
          isOpen={isDeletePlacePopupOpen}
          onClose={closeAllPopups}
          buttonText='Yes'
          onSubmit={handleDeleteConfirmation}
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
