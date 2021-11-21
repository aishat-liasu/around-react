import React, { useState } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState('');

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClose() {
    setIsEditAvatarPopupOpen(false);
  }

  function handleEditProfileClose() {
    setIsEditProfilePopupOpen(false);
  }

  function handleAddPlaceClose() {
    setIsAddPlacePopupOpen(false);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
    setIsImagePopupOpen(true);
  }

  function handleImagePopupClose() {
    setIsImagePopupOpen(false);
  }

  function handleDeletePlaceClick() {
    setIsDeletePlacePopupOpen(true);
  }

  function handleDeletePlaceClose() {
    setIsDeletePlacePopupOpen(false);
  }

  return (
    <div className='page'>
      <Header />
      <Main
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
        isEditProfilePopupOpen={isEditProfilePopupOpen}
        isImagePopupOpen={isImagePopupOpen}
        isDeletePlacePopupOpen={isDeletePlacePopupOpen}
        selectedCard={selectedCard}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onDeletePlaceClick={handleDeletePlaceClick}
        onEditAvatarClose={handleEditAvatarClose}
        onEditProfileClose={handleEditProfileClose}
        onAddPlaceClose={handleAddPlaceClose}
        onImagePopupClose={handleImagePopupClose}
        onDeletePlaceClose={handleDeletePlaceClose}
      />
      <Footer />
    </div>
  );
}

export default App;
