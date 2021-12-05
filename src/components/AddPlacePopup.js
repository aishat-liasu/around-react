import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({
  isOpen,
  onClose,
  onAddPlaceSubmit,
  buttonText,
  setButtonText,
}) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    setButtonText('Saving');
    onAddPlaceSubmit({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title='New Place'
      name='add'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <span className='popup__field-error' id='place-image-url-error'></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
